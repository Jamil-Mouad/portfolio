import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface Spline3DModelProps {
  className?: string;
  onChatOpen?: () => void;
}

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ig-border/20 to-ig-bg rounded-2xl">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-16 h-16 border-4 border-ig-text/20 border-t-ig-text rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <p className="text-sm text-ig-text-secondary">Loading 3D Model...</p>
    </div>
  </div>
);

const MobileFallback = ({ onChatOpen }: { onChatOpen?: () => void }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ig-border/10 to-ig-bg rounded-2xl min-h-[300px]">
    <motion.button
      onClick={onChatOpen}
      className="flex flex-col items-center gap-4 p-8 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-ig-text to-ig-text-secondary flex items-center justify-center shadow-clay"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageCircle className="w-10 h-10 text-white" />
      </motion.div>
      <p className="text-sm text-ig-text-secondary font-medium">Chat with AI</p>
    </motion.button>
  </div>
);

const Spline3DModel = ({ className = '', onChatOpen }: Spline3DModelProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Defer Spline loading - wait until the section is likely in view
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setShouldLoad(true), 1500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // On mobile, show a lightweight placeholder instead of the heavy 3D model
  if (isMobile) {
    return (
      <div className={`relative w-full h-full min-h-[300px] ${className}`}>
        <MobileFallback onChatOpen={onChatOpen} />
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full h-full min-h-[400px] md:min-h-[500px] cursor-pointer group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onChatOpen}
    >
      {shouldLoad ? (
        <Suspense fallback={<LoadingFallback />}>
          <Spline
            scene="https://prod.spline.design/mPMAqOHq4WavjrIT/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <LoadingFallback />
      )}

      {/* Chat hint overlay */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-ig-text/80 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <MessageCircle className="w-3 h-3" />
        <span>Click to chat with AI</span>
      </motion.div>
    </motion.div>
  );
};

export default Spline3DModel;
