---
name: Synthetic Horizon
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system embodies a "High-Contrast Light" aesthetic that merges professional developer utility with a futuristic, premium finish. The target audience includes tech recruiters, engineering leaders, and open-source collaborators who value precision and forward-thinking engineering.

The style is a refined **Light-Mode Glassmorphism**. It replaces the heavy glows of dark-themed futuristic UIs with high-clarity translucency, subtle multi-layered shadows, and crisp "Electric Blue" accents. The emotional response is one of clarity, technical competence, and high-end craftsmanship.

## Colors
The palette is rooted in a "Light Slate" foundation to reduce eye strain while maintaining a clean, professional backdrop.

- **Primary (#3b82f6):** An energetic Electric Blue used for critical actions, active states, and focus indicators.
- **Secondary (#8b5cf6):** A technical Violet used for secondary brand elements, code syntax highlighting, and visual flair.
- **Surface & Bright:** The background uses #f8fafc to provide a soft canvas, while #ffffff is reserved for elevated glass cards and interactive components.
- **On-Surface:** A deep #0f172a navy ensures maximum legibility and professional gravity for all typographic elements.

## Typography
The system utilizes **Sora** as the primary typeface to convey a geometric, futuristic, and highly structured feel. Its wide apertures and distinctive letterforms make it perfect for a modern developer persona.

**JetBrains Mono** is introduced as a supporting font for technical labels, metadata, and code snippets, grounding the design in developer culture. High-level headers use tight letter-spacing and bold weights to command attention, while body text maintains generous line heights for long-form technical documentation readability.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy with a strict 8px rhythmic system. 

- **Desktop (1280px+):** A 12-column grid with 24px gutters. Content is centered with 48px outer margins.
- **Tablet (768px - 1279px):** An 8-column grid with 24px gutters.
- **Mobile (< 767px):** A 4-column grid with 16px gutters and margins.

Spacing is used to create "breathing room" around technical content, reinforcing the premium feel. Sections should be separated by large vertical gaps (e.g., 120px on desktop) to allow the glassmorphic elements to stand out against the slate background.

## Elevation & Depth
Elevation in this design system is achieved through **Soft Glassmorphism**. Unlike traditional shadows, depth is communicated via:

1.  **Backdrop Blurs:** Elevated surfaces use `backdrop-filter: blur(12px)` and a semi-transparent white fill (`rgba(255, 255, 255, 0.7)`).
2.  **Inner Borders:** A 1px solid border with low opacity (`rgba(15, 23, 42, 0.05)`) simulates a glass edge.
3.  **Layered Shadows:** Instead of a single heavy shadow, use a "dual shadow" technique:
    - Shadow 1: 0px 4px 6px rgba(15, 23, 42, 0.02)
    - Shadow 2: 0px 10px 15px rgba(15, 23, 42, 0.04)
4.  **Tonal Tiers:** The `surface-bright` (#ffffff) is used only for the highest level of elevation (e.g., active modals or primary buttons).

## Shapes
The design system uses a **Rounded** shape language to balance the technical sharpness of the typography. 

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px) radius.
- **Cards & Containers:** 1rem (16px) radius.
- **Feature Sections:** 1.5rem (24px) radius for large layout containers.

This specific roundedness avoids the playfulness of pill shapes while feeling significantly more modern and premium than sharp corners.

## Components

- **Buttons:** Primary buttons use a solid #3b82f6 fill with white text. Secondary buttons use a glass effect: semi-transparent white background, 1px navy border at 10% opacity, and #3b82f6 text.
- **Chips:** Small, 4px rounded elements using `label-caps` typography. Backgrounds should be very pale tints of the primary or secondary colors (e.g., #3b82f6 at 10% opacity).
- **Input Fields:** Use #ffffff backgrounds with a subtle inner shadow. On focus, the border transitions to Primary #3b82f6 with a faint 4px outer glow.
- **Cards:** The hallmark of the system. Glass-effect cards with 16px padding, 16px border-radius, and a subtle light-blue tint on hover to indicate interactivity.
- **Lists:** Clean, borderless list items separated by 8px of vertical space. Hover states use a subtle #f1f5f9 background transition.
- **Code Blocks:** High-contrast containers with #0f172a backgrounds, utilizing JetBrains Mono and vibrant secondary color syntax highlighting.