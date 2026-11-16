import { motion } from "framer-motion";

export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SpringCard = ({ children, className = "", onClick, ...props }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.012 }}
    whileTap={{ scale: 0.985 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.div>
);
