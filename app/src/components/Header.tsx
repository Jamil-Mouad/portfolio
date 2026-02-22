import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
    <motion.header
      className="w-full px-6 sm:px-10 lg:px-20 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Code Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-ig-text"
          >
            <path
              d="M8 10L3 14L8 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 10L25 14L20 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6L12 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-serif text-sm tracking-[0.15em] text-ig-text hidden sm:inline">
            PORTFOLIO
          </span>
        </div>

        {/* Center Text - Hidden on mobile */}
        <motion.h1
          className="hidden lg:block font-serif text-xl xl:text-2xl text-ig-text text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Full-Stack Software Developer
        </motion.h1>

        {/* Right Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="link-underline text-sm text-ig-text hover:opacity-70 transition-opacity duration-200"
          >
            About
          </a>
          <a
            href="#projects"
            className="link-underline text-sm text-ig-text hover:opacity-70 transition-opacity duration-200"
          >
            Projects
          </a>
          <a
            href="#timeline"
            className="link-underline text-sm text-ig-text hover:opacity-70 transition-opacity duration-200"
          >
            Timeline
          </a>
          <a
            href="#contact"
            className="link-underline text-sm text-ig-text hover:opacity-70 transition-opacity duration-200"
          >
            Contact
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-4 py-1.5 text-sm bg-ig-text text-white rounded-full hover:bg-ig-text/90 transition-colors duration-200"
          >
            CV
          </a>
          {/* Small Code Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-ig-text"
          >
            <path
              d="M8 10L3 14L8 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 10L25 14L20 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6L12 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </motion.header>
  );
};

export default Header;
