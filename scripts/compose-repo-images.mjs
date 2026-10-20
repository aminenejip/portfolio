/**
 * scripts/compose-repo-images.mjs — one-off: build honest card images from
 * REAL repo assets (zero-dependency: own PNG decoder for filter types 0-4).
 *
 *  - Orchom: assets/images/orchom_logo.png centered on the cover gradient
 *  - Output: upload-to-github/orchom-screenshot.png (1200×675, 16:9)
 *
 * RUN:  node scripts/compose-repo-images.mjs
 */
import zlib from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------- PNG decode (subset: 8-bit, color types 2/6) ---------------- */
function decodePNG(buf) {
  let off = 8;
  const idat = [];
  let W = 0, H = 0, color = 0, depth = 0, palette = null, trns = null;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      W = data.readUInt32BE(0);
      H = data.readUInt32BE(4);
      depth = data[8];
      color = data[9];
    } else if (type === "PLTE") palette = data;
    else if (type === "tRNS") trns = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  if (depth !== 8) throw new Error(`bit depth ${depth} unsupported (need 8)`);
  const raw = zlib.inflateSync(Buffer.concat(idat));

  const channels = color === 6 ? 4 : color === 2 ? 3 : color === 3 ? 1 : color === 0 ? 1 : color === 4 ? 2 : 0;
  if (!channels) throw new Error(`color type ${color} unsupported`);
  const bpp = channels;
  const stride = W * bpp;

  /* unfilter */
  const out = Buffer.alloc(stride * H);
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < H; y++) {
    const filter = raw[y * (stride + 1)];
    const rowIn = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const rowOut = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? rowOut[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = rowIn[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) v += paeth(a, b, c);
      rowOut[x] = v & 0xff;
    }
  }

  /* to RGBA */
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    if (color === 6) rgba.set(out.subarray(i * 4, i * 4 + 4), i * 4);
    else if (color === 2) {
      for (let k = 0; k < 3; k++) rgba[i * 4 + k] = out[i * 3 + k];
      rgba[i * 4 + 3] = 255;
    } else if (color === 0) {
      const g = out[i];
      rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = g;
      rgba[i * 4 + 3] = 255;
    } else if (color === 3) {
      const idx = out[i];
      rgba[i * 4] = palette[idx * 3];
      rgba[i * 4 + 1] = palette[idx * 3 + 1];
      rgba[i * 4 + 2] = palette[idx * 3 + 2];
      rgba[i * 4 + 3] = trns && idx < trns.length ? trns[idx] : 255;
    }
  }
  return { W, H, rgba };
}

/* ---------------- PNG encode (same as generate-covers) ---------------- */
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (bytes) => {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function chunk(type, data) {
  const len = new Uint8Array(4);
  new DataView(len.buffer).setUint32(0, data.length);
  const typeAscii = Buffer.from(type, "ascii");
  const crcInput = Buffer.concat([typeAscii, data]);
  const crc = new Uint8Array(4);
  new DataView(crc.buffer).setUint32(0, crc32(crcInput));
  return Buffer.concat([len, typeAscii, data, crc]);
}
function encodePNG(px, W, H) {
  const stride = W * 4;
  const flat = Buffer.alloc((stride + 1) * H);
  for (let y = 0; y < H; y++) {
    /* one filter byte (type 0) per scanline, then the row */
    flat[y * (stride + 1)] = 0;
    px.copy(flat, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, W);
  dv.setUint32(4, H);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(flat, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

/* ---------------- main ---------------- */
const [logo] = process.argv.slice(2);
const src = logo ?? join(ROOT, "upload-to-github", "orchom-logo.png");
const dec = decodePNG(readFileSync(src));
console.log(`src: ${dec.W}x${dec.H}, color decoded to RGBA`);

const W = 1200, H = 675;
const A = hex("#a78bfa"); // lilac (Orchom's card palette)
const B = hex("#6d28d9");
const px = Buffer.alloc(W * H * 4);

/* gradient + highlight (same recipe as generate-covers) */
const hlX = W * 0.8, hlY = H * 0.18;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    let r = A[0] + (B[0] - A[0]) * t;
    let g = A[1] + (B[1] - A[1]) * t;
    let b = A[2] + (B[2] - A[2]) * t;
    const d2 = ((x - hlX) / 460) ** 2 + ((y - hlY) / 320) ** 2;
    const k = Math.exp(-d2) * 0.45;
    r += (255 - r) * k; g += (255 - g) * k; b += (255 - b) * k;
    const i = (y * W + x) * 4;
    px[i] = r | 0; px[i + 1] = g | 0; px[i + 2] = b | 0; px[i + 3] = 255;
  }

/* subtle dot grid */
for (let gy = 0; gy < H; gy += 42)
  for (let gx = 0; gx < W; gx += 42)
    for (let dy = 0; dy < 3; dy++)
      for (let dx = 0; dx < 3; dx++) {
        const i = ((gy + dy) * W + gx + dx) * 4;
        px[i] = Math.min(255, px[i] + 14);
        px[i + 1] = Math.min(255, px[i + 1] + 14);
        px[i + 2] = Math.min(255, px[i + 2] + 14);
      }

/* paste logo, scaled (nearest neighbour) to fit ≤78% of height */
const scaleH = Math.min(Math.floor(H * 0.78), dec.H * 3);
const s = Math.min(scaleH / dec.H, (W * 0.78) / dec.W);
const dw = Math.round(dec.W * s);
const dh = Math.round(dec.H * s);
const ox = Math.round((W - dw) / 2);
const oy = Math.round((H - dh) / 2);
for (let dy = 0; dy < dh; dy++)
  for (let dx = 0; dx < dw; dx++) {
    const sx = Math.min(dec.W - 1, Math.floor(dx / s));
    const sy = Math.min(dec.H - 1, Math.floor(dy / s));
    const a = dec.rgba[(sy * dec.W + sx) * 4 + 3];
    if (a < 8) continue;
    const al = a / 255;
    const di = ((oy + dy) * W + ox + dx) * 4;
    for (let k = 0; k < 3; k++) {
      const c = dec.rgba[(sy * dec.W + sx) * 4 + k] * al + px[di + k] * (1 - al);
      px[di + k] = Math.round(c);
    }
    px[di + 3] = 255;
  }

const outPath = join(ROOT, "upload-to-github", "orchom-screenshot.png");
writeFileSync(outPath, encodePNG(px, W, H));
console.log(`✓ ${outPath} (1200×675)`);
