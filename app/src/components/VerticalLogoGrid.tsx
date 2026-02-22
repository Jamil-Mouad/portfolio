import { motion } from 'framer-motion';

interface LogoItem {
  src: string;
  alt: string;
}

interface VerticalLogoGridProps {
  logos: LogoItem[];
  position: 'left' | 'right';
  className?: string;
}

const VerticalLogoGrid = ({ logos, position, className = '' }: VerticalLogoGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: position === 'left' ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-col gap-4 md:gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {logos.map((logo, index) => (
        <motion.div
          key={logo.alt}
          variants={itemVariants}
          className="relative group"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{
            rotateY: position === 'left' ? 15 : -15,
            scale: 1.1,
            z: 50,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain drop-shadow-lg"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          />

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VerticalLogoGrid;
