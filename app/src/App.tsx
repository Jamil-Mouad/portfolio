import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';

// Lazy load below-fold sections for faster initial load
const AboutSection = lazy(() => import('./sections/AboutSection'));
const MissionSection = lazy(() => import('./sections/MissionSection'));
const SkillsShowcaseSection = lazy(() => import('./sections/SkillsShowcaseSection'));
const ProjectShowcase = lazy(() => import('./sections/ProjectShowcase'));
const TimelineSection = lazy(() => import('./sections/TimelineSection'));
const Footer = lazy(() => import('./sections/Footer'));
const ChatWindow = lazy(() => import('./components/ChatWindow'));

const SectionFallback = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-ig-text/20 border-t-ig-text rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { scrollY } = useScroll();

  // Header background opacity based on scroll
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-ig-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Fixed Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: useTransform(
            headerBgOpacity,
            v => `rgba(229, 229, 229, ${v})`
          )
        }}
      >
        <Header />
      </motion.div>

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection onChatOpen={() => setIsChatOpen(true)} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MissionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsShowcaseSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectShowcase />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TimelineSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>

      {/* AI Chat Modal */}
      {isChatOpen && (
        <Suspense fallback={null}>
          <ChatWindow onClose={() => setIsChatOpen(false)} />
        </Suspense>
      )}
    </motion.div>
  );
}

export default App;
