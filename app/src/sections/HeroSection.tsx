import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import OrbitingLogos from '../components/OrbitingLogos';
import VerticalLogoGrid from '../components/VerticalLogoGrid';

// Orbit logos - main technologies
const orbitLogos = [
  { src: '/assets/logo-java.webp', alt: 'Java' },
  { src: '/assets/python.webp', alt: 'Python' },
  { src: '/assets/ts-removebg-preview.webp', alt: 'TypeScript' },
  { src: '/assets/spring.webp', alt: 'Spring' },
  { src: '/assets/logo-flutter.webp', alt: 'Flutter' },
  { src: '/assets/logo-postgres.webp', alt: 'PostgreSQL' },
  { src: '/assets/logo-mysql.webp', alt: 'MySQL' },
  { src: '/assets/logo-mongodb.webp', alt: 'MongoDB' },
];

// Left grid logos - DevOps tools
const leftGridLogos = [
  { src: '/assets/docker.webp', alt: 'Docker' },
  { src: '/assets/git.webp', alt: 'Git' },
  { src: '/assets/github.webp', alt: 'GitHub' },
  { src: '/assets/gitlab.webp', alt: 'GitLab' },
];

// Right grid logos - Frontend frameworks
const rightGridLogos = [
  { src: '/assets/react-removebg-preview.webp', alt: 'React' },
  { src: '/assets/anguar-removebg-preview.webp', alt: 'Angular' },
  { src: '/assets/nextjs-removebg-preview.webp', alt: 'Next.js' },
  { src: '/assets/nodejs-removebg-preview.webp', alt: 'Node.js' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ig-bg">
      {/* Main content area with 3-column layout */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16">
        {/* Left Grid - DevOps Tools */}
        <div className="hidden md:flex absolute left-4 lg:left-16 top-1/2 -translate-y-1/2 z-10">
          <VerticalLogoGrid logos={leftGridLogos} position="left" />
        </div>

        {/* Center - Orbiting Logos + Laptop */}
        <div className="relative flex items-center justify-center" style={{ width: '620px', height: '620px' }}>
          {/* Orbiting logos container - absolutely centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OrbitingLogos
              logos={orbitLogos}
              radius={260}
              duration={40}
              direction={1}
              logoSize="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36"
              className="opacity-80"
            />
          </div>

          {/* Laptop - Center Focus */}
          <motion.div
            className="relative w-[320px] md:w-[450px] lg:w-[500px] z-20"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.img
              src="/assets/laptop-center-removebg-preview.webp"
              alt="Laptop with code"
              className="w-full h-full object-contain drop-shadow-2xl"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>

        {/* Right Grid - Frontend Frameworks */}
        <div className="hidden md:flex absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 z-10">
          <VerticalLogoGrid logos={rightGridLogos} position="right" />
        </div>
      </div>

      {/* Mobile: Show grids at bottom */}
      <div className="md:hidden absolute bottom-32 left-0 right-0 flex justify-between px-6">
        <div className="flex gap-3">
          {leftGridLogos.slice(0, 2).map((logo) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-10 h-10 object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            />
          ))}
        </div>
        <div className="flex gap-3">
          {rightGridLogos.slice(0, 2).map((logo) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-10 h-10 object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 sm:px-10 lg:px-20 pb-10">
        {/* Bottom Row */}
        <div className="flex items-end justify-between">
          {/* Left - See all projects */}
          <motion.a
            href="#projects"
            className="group flex items-center gap-2 text-sm text-ig-text link-underline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span>View my projects</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>

          {/* Center - Hidden on mobile, shows tagline */}
          <motion.p
            className="hidden md:block font-serif text-lg text-ig-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Full-Stack Developer | DevOps Enthusiast
          </motion.p>

          {/* Right - Scroll down */}
          <motion.div
            className="flex items-center gap-2 text-sm text-ig-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <span className="hidden sm:inline">Scroll down</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
