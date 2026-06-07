import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function EntryReveal() {
  const prefersReducedMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return null;
  }

  if (prefersReducedMotion) {
    return (
      <motion.div
        className="entry-reveal entry-reveal-reduced"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onAnimationComplete={() => setIsDone(true)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="entry-reveal" aria-hidden="true">
      <div
        className="entry-reveal-mask"
        onAnimationEnd={() => setIsDone(true)}
      />
    </div>
  );
}
