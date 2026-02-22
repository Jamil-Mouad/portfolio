import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ClaySculptureProps {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  floatDelay?: number;
  initialDelay?: number;
}

const ClaySculpture = ({ 
  src, 
  alt, 
  className = '', 
  parallaxSpeed = 0.3,
  floatDelay = 0,
  initialDelay = 0.8
}: ClaySculptureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect - elements move at different speeds
  const y = useTransform(scrollYProgress, [0, 1], [0, -150 * parallaxSpeed]);
  
  // Slight rotation for more organic feel
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: initialDelay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain clay-shadow"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        loading="eager"
      />
    </motion.div>
  );
};

export default ClaySculpture;
