import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import { timelineData, type TimelineItem } from '../data/timeline';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

const CardContent = ({
  item,
  index,
  slideFrom,
}: {
  item: TimelineItem;
  index: number;
  slideFrom: 'left' | 'right';
}) => {
  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, x: slideFrom === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.div
        className="bg-white rounded-xl p-5 shadow-lg border border-ig-border/50 cursor-pointer"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'education' ? 'bg-blue-100' : 'bg-amber-100'
            }`}
          >
            {item.type === 'education' ? (
              <GraduationCap className="w-5 h-5 text-blue-600" />
            ) : (
              <Award className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <div>
            <p className="text-xs text-ig-text-secondary">{item.year}</p>
            <p className="text-xs font-medium text-ig-text">
              {item.institution}
            </p>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-serif text-lg text-ig-text mb-2 leading-tight">
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-ig-text-secondary mb-3">
          {item.description}
        </p>

        {/* Technologies */}
        {item.technologies && (
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs bg-ig-bg rounded-full text-ig-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Image if available */}
        {item.image && (
          <motion.img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="absolute -top-3 -right-3 w-12 h-12 object-contain opacity-80"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const TimelineCard = ({ item, index }: TimelineCardProps) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex md:items-center w-full">
      {/* Desktop left column */}
      <div className="hidden md:flex w-1/2 justify-end pr-10">
        {isLeft && (
          <CardContent item={item} index={index} slideFrom="left" />
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          className={`w-4 h-4 rounded-full border-4 shadow-sm ${
            item.type === 'education'
              ? 'bg-blue-500 border-blue-200'
              : 'bg-amber-500 border-amber-200'
          }`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>

      {/* Desktop right column */}
      <div className="hidden md:flex w-1/2 pl-10">
        {!isLeft && (
          <CardContent item={item} index={index} slideFrom="right" />
        )}
      </div>

      {/* Mobile: always right of line */}
      <div className="md:hidden pl-14 w-full">
        <CardContent item={item} index={index} slideFrom="right" />
      </div>
    </div>
  );
};

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="relative w-full py-20 md:py-28 bg-ig-bg overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <FadeInView className="text-center mb-16">
          <p className="text-sm text-ig-text-secondary mb-4 tracking-wide">
            My Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ig-text mb-6">
            Education & Journey
          </h2>
          <p className="text-base text-ig-text-secondary max-w-2xl mx-auto">
            A timeline of my academic journey and hands-on projects that shaped
            my expertise.
          </p>
        </FadeInView>

        {/* Legend */}
        <FadeInView delay={0.2} className="flex justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-ig-text-secondary">Education</span>
          </div>
        </FadeInView>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line — left on mobile, center on desktop */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-ig-border" />

          {/* Timeline items */}
          <div className="space-y-10 md:space-y-14">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* End dot */}
          <motion.div
            className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 -bottom-2 w-3 h-3 rounded-full bg-ig-border"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
