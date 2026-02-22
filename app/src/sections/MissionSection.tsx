import { motion } from 'framer-motion';
import FadeInView from '../components/FadeInView';

const MissionSection = () => {
  const words = "Building robust, scalable applications with clean code and modern technologies to solve real-world problems.".split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariant = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full py-32 md:py-40 lg:py-48 bg-ig-bg overflow-hidden">
      {/* Subtle tech logos in background */}
      <motion.img
        src="/assets/python.webp"
        alt=""
        loading="lazy"
        className="absolute top-10 right-[-5%] w-[200px] opacity-[0.08] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.img
        src="/assets/spring.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-10 left-[-3%] w-[180px] opacity-[0.06] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-20">
        <FadeInView>
          <motion.p
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] text-ig-text text-left"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.25em]"
                variants={wordVariant}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </FadeInView>
      </div>
    </section>
  );
};

export default MissionSection;
