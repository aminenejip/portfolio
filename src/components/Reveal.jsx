import { motion, useReducedMotion } from "motion/react";

/**
 * Shared scroll-reveal wrapper.
 * - triggers once when the element enters the viewport
 * - respects prefers-reduced-motion (fades only, no movement)
 */
export default function Reveal({ children, delay = 0, y = 24, className }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
