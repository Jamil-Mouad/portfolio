import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Contact', href: '#contact' },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.button
          className="md:hidden w-10 h-10 flex items-center justify-center text-ig-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[320px] bg-ig-bg border-ig-border p-0"
      >
        <SheetHeader className="p-6 border-b border-ig-border">
          <SheetTitle className="font-serif text-lg text-ig-text">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-6">
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="py-4 border-b border-ig-border/50 text-lg font-serif text-ig-text hover:text-ig-text-secondary transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.name}
              </motion.a>
            ))}
          </AnimatePresence>
        </nav>

        {/* Download CV Button */}
        <div className="px-6 pt-4">
          <a
            href="/cv.pdf"
            download
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 w-full py-3 bg-ig-text text-white rounded-full text-sm font-medium hover:bg-ig-text/90 transition-colors"
          >
            Download CV
          </a>
        </div>

        {/* Code Icon at Bottom */}
        <div className="absolute bottom-6 left-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-ig-text-secondary"
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
