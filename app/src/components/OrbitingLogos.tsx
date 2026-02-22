import { motion } from 'framer-motion';

interface OrbitingLogo {
  src: string;
  alt: string;
}

interface OrbitingLogosProps {
  logos: OrbitingLogo[];
  radius?: number;
  duration?: number;
  direction?: 1 | -1;
  logoSize?: string;
  className?: string;
}

const OrbitingLogos = ({
  logos,
  radius = 180,
  duration = 40,
  direction = 1,
  logoSize = 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24',
  className = '',
}: OrbitingLogosProps) => {
  const angleStep = 360 / logos.length;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: radius * 2 + 100,
        height: radius * 2 + 100,
        perspective: '1000px',
      }}
    >
      {/* Orbit container with 3D perspective */}
      <motion.div
        className="absolute inset-0 preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(15deg) rotateY(-10deg)',
        }}
        animate={{
          rotate: direction * 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Orbit ring visualization */}
        <div
          className="absolute rounded-full border border-ig-border/30"
          style={{
            width: radius * 2,
            height: radius * 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Logos positioned around the orbit */}
        {logos.map((logo, index) => {
          const angle = (index * angleStep * Math.PI) / 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={logo.alt}
              className="absolute flex items-center justify-center"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-3rem',
                marginTop: '-3rem',
                width: '6rem',
                height: '6rem',
                x: x,
                y: y,
              }}
              // Counter-rotate to keep logos upright
              animate={{
                rotate: direction * -360,
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`${logoSize} object-contain drop-shadow-lg`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OrbitingLogos;
