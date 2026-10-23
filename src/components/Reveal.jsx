import { motion, useReducedMotion } from "motion/react";

/**
 * Shared scroll-reveal wrapper.
 * - triggers once when the element enters the viewport
 * - respects prefers-reduced-motion (fades only, no movement)
 * - polymorphic: `as="li"` renders the element as a list item (motion.li)
 */
export default function Reveal({ as: Tag = "div", children, delay = 0, y = 24, className }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
