import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import { siteConfig } from '../config/site';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: siteConfig.social.github, icon: Github },
    { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin },
    { name: 'Twitter', href: siteConfig.social.twitter, icon: Twitter },
  ];

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Floating code symbols for the animated background
  const codeSymbols = [
    '<div>', '</>', '{  }', '( )', '[ ]', '&&', '=>', '===',
    'const', 'async', 'return', '.map()', 'flex', 'grid',
    '@keyframes', 'transform', '::after', ':hover',
  ];

  return (
    <footer id="contact" className="relative w-full min-h-screen overflow-hidden bg-[#0f0f0f]">
      {/* Animated aurora/mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora blobs */}
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Floating code symbols */}
        {codeSymbols.map((symbol, i) => (
          <motion.span
            key={i}
            className="absolute text-white/[0.04] font-mono text-sm select-none pointer-events-none"
            style={{
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 10) % 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.02, 0.06, 0.02],
            }}
            transition={{
              duration: 6 + (i % 4) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 sm:px-10 lg:px-20 py-10">
        {/* Top - Back to top */}
        <FadeInView>
          <div className="flex justify-center pt-10">
            <motion.a
              href="#"
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-2"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
              </motion.div>
              <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors tracking-widest uppercase">
                Top
              </span>
            </motion.a>
          </div>
        </FadeInView>

        {/* Center - Contact */}
        <FadeInView delay={0.2} className="flex-1 flex flex-col items-center justify-center">
          <motion.p
            className="text-white/30 text-sm tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's work together
          </motion.p>

          {/* Email with animated underline */}
          <motion.a
            href={`mailto:${siteConfig.email}`}
            className="group relative font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center mb-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">{siteConfig.email}</span>
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.a>

          {/* Social Icons with glassmorphism */}
          <div className="flex items-center gap-4 mt-6">
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-xl bg-white/[0.03] backdrop-blur-sm flex items-center justify-center border border-white/[0.06] hover:border-white/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-500" />
                </motion.a>
              );
            })}
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="group relative w-14 h-14 rounded-xl bg-white/[0.03] backdrop-blur-sm flex items-center justify-center border border-white/[0.06] hover:border-white/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-500" />
            </motion.a>
          </div>
        </FadeInView>

        {/* Bottom Row */}
        <FadeInView delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.06]">
            <p className="text-[11px] text-white/20 tracking-wide">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="text-[11px] text-white/20 tracking-wide">
              Crafted with React, TypeScript & Framer Motion
            </p>
            <div className="flex items-center gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/20 hover:text-white/60 transition-colors duration-500 tracking-wide uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </FadeInView>
      </div>

      {/* CSS for aurora animation */}
      <style>{`
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.08;
          animation: aurora-float 20s ease-in-out infinite;
        }

        .aurora-blob-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
          animation-duration: 25s;
        }

        .aurora-blob-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: -15%;
          right: -10%;
          animation-delay: -8s;
          animation-duration: 20s;
        }

        .aurora-blob-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: -15s;
          animation-duration: 22s;
        }

        @keyframes aurora-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(50px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 40px) scale(0.95);
          }
          75% {
            transform: translate(30px, 20px) scale(1.05);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
