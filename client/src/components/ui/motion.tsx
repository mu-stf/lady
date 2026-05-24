import { motion } from "framer-motion";

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const FadeIn = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={fadeIn}
    className={className}
  >
    {children}
  </motion.div>
);
