import { motion } from 'framer-motion';
import { MapPin, Calendar, Download } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import Spline3DModel from '../components/Spline3DModel';
import { siteConfig } from '../config/site';

interface AboutSectionProps {
  onChatOpen?: () => void;
}

const AboutSection = ({ onChatOpen }: AboutSectionProps) => {
  return (
    <section id="about" className="relative w-full py-20 md:py-28 bg-ig-bg-secondary">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - 3D Spline Model */}
          <FadeInView direction="left">
            <div className="relative">
              {/* Spline 3D Model */}
              <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-ig-border/10 to-ig-bg shadow-clay">
                <Spline3DModel className="w-full h-full" onChatOpen={onChatOpen} />

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-ig-text/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-ig-text/5 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-64 h-36 bg-white rounded-2xl shadow-lg flex items-center justify-center z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="text-center">
                  <p className="font-serif text-4xl text-ig-text">{siteConfig.yearsExperience}+</p>
                  <p className="text-xs text-ig-text-secondary mt-1">Years Experience</p>
                </div>
              </motion.div>
            </div>
          </FadeInView>

          {/* Right - Content */}
          <FadeInView direction="right" delay={0.2}>
            <div>
              <p className="text-sm text-ig-text-secondary mb-4 tracking-wide">About Me</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ig-text mb-6 leading-tight">
                {siteConfig.name}
              </h2>
              <p className="text-lg text-ig-text-secondary mb-4">
                {siteConfig.title}
              </p>

              {/* Bio */}
              <p className="text-base text-ig-text leading-relaxed mb-8 whitespace-pre-line">
                {siteConfig.bio}
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-ig-text-secondary">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-3 text-ig-text-secondary">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">{siteConfig.yearsExperience}+ years of experience</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <p className="text-sm text-ig-text-secondary mb-3">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 text-sm bg-white border border-ig-border rounded-full text-ig-text"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download CV Button */}
              <motion.a
                href={siteConfig.resumeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ig-text text-white rounded-full text-sm font-medium hover:bg-ig-text/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                download
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
