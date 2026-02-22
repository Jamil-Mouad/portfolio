import { motion } from 'framer-motion';
import FadeInView from '../components/FadeInView';

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  logo?: string;
  color: string;
  logoBg?: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Java', logo: '/assets/logo-java.webp', color: 'from-orange-500 to-red-600' },
      { name: 'Python', logo: '/assets/python.webp', color: 'from-blue-500 to-yellow-500' },
      { name: 'JavaScript', logo: '/assets/js-removebg-preview.webp', color: 'from-yellow-400 to-yellow-600' },
      { name: 'TypeScript', logo: '/assets/ts-removebg-preview.webp', color: 'from-blue-500 to-blue-700' },
      { name: 'C', logo: '/assets/c.webp', color: 'from-blue-600 to-blue-800' },
      { name: 'PHP', logo: '/assets/php.webp', color: 'from-indigo-500 to-purple-600' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', logo: '/assets/react-removebg-preview.webp', color: 'from-cyan-400 to-blue-500' },
      { name: 'Angular', logo: '/assets/anguar-removebg-preview.webp', color: 'from-red-500 to-red-700' },
      { name: 'Next.js', logo: '/assets/nextjs-removebg-preview.webp', color: 'from-gray-700 to-gray-900' },
      { name: 'HTML', logo: '/assets/html-removebg-preview.webp', color: 'from-orange-500 to-orange-700' },
      { name: 'CSS', logo: '/assets/css-removebg-preview.webp', color: 'from-blue-500 to-blue-700' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Spring Boot', logo: '/assets/spring.webp', color: 'from-green-500 to-emerald-600' },
      { name: 'Node.js', logo: '/assets/nodejs-removebg-preview.webp', color: 'from-green-600 to-green-700' },
      { name: 'J2EE', logo: '/assets/jee.webp', color: 'from-orange-500 to-red-600' },
    ],
  },
  {
    name: 'Mobile',
    skills: [
      { name: 'Flutter', logo: '/assets/logo-flutter.webp', color: 'from-cyan-400 to-blue-600' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', logo: '/assets/logo-postgres.webp', color: 'from-blue-600 to-blue-800' },
      { name: 'MySQL', logo: '/assets/logo-mysql.webp', color: 'from-blue-600 to-orange-500' },
      { name: 'Oracle', logo: '/assets/logo-oracle.webp', color: 'from-red-600 to-red-700' },
      { name: 'MongoDB', logo: '/assets/logo-mongodb.webp', color: 'from-green-500 to-green-700' },
      { name: 'SQLite', logo: '/assets/logo-sqlite.webp', color: 'from-blue-400 to-blue-600' },
      { name: 'SQL/PL-SQL', logo: '/assets/sql_plsql.webp', color: 'from-orange-500 to-red-500' },
    ],
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { name: 'Docker', logo: '/assets/docker.webp', color: 'from-blue-400 to-blue-600' },
      { name: 'Git', logo: '/assets/git.webp', color: 'from-orange-500 to-red-600' },
      { name: 'GitHub', logo: '/assets/github.webp', color: 'from-gray-700 to-gray-900' },
      { name: 'GitLab', logo: '/assets/gitlab.webp', color: 'from-orange-500 to-red-600' },
      { name: 'Postman', logo: '/assets/postman-removebg-preview.webp', color: 'from-orange-500 to-orange-700' },
    ],
  },
  {
    name: 'Operating Systems & Virtualization',
    skills: [
      { name: 'Linux', logo: '/assets/linux-removebg-preview.webp', color: 'from-yellow-500 to-yellow-700' },
      { name: 'Ubuntu', logo: '/assets/ubuntu-removebg-preview.webp', color: 'from-orange-500 to-red-600' },
      { name: 'Windows', logo: '/assets/windows-removebg-preview.webp', color: 'from-blue-500 to-blue-700' },
      { name: 'VMware', logo: '/assets/vmware-removebg-preview.webp', color: 'from-gray-600 to-gray-800' },
      { name: 'KVM/QEMU', logo: '/assets/kmv-removebg-preview.webp', color: 'from-orange-500 to-red-600' },
    ],
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <motion.div
        className="relative bg-white rounded-xl p-6 shadow-lg border border-ig-border/50 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo or Icon */}
          {skill.logo ? (
            <motion.div
              className={`w-18 h-18 md:w-20 md:h-20 flex items-center justify-center mb-3 rounded-lg ${skill.logoBg || 'bg-white/60'} p-2`}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <img
                src={skill.logo}
                alt={skill.name}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </motion.div>
          ) : (
            <div
              className={`w-18 h-18 md:w-20 md:h-20 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-3`}
            >
              <span className="text-white text-2xl font-bold">
                {skill.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Name */}
          <p className="text-sm font-medium text-ig-text text-center">
            {skill.name}
          </p>
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
        />
      </motion.div>
    </motion.div>
  );
};

const SkillsShowcaseSection = () => {
  return (
    <section className="relative w-full py-20 md:py-28 bg-ig-bg">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <FadeInView className="text-center mb-16">
          <p className="text-sm text-ig-text-secondary mb-4 tracking-wide">
            Tech Arsenal
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ig-text mb-6">
            Technologies I Know
          </h2>
          <p className="text-base text-ig-text-secondary max-w-2xl mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on experience, enabling me to tackle challenges from concept to deployment.
          </p>
        </FadeInView>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <FadeInView key={category.name} delay={categoryIndex * 0.1}>
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-serif text-xl md:text-2xl text-ig-text">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-px bg-ig-border" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={categoryIndex * 6 + skillIndex}
                    />
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Additional Info */}
        <FadeInView delay={0.4} className="mt-16 text-center">
          <motion.div
            className="inline-flex flex-wrap justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-ig-border/50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center px-4">
              <p className="font-serif text-2xl text-ig-text">30+</p>
              <p className="text-xs text-ig-text-secondary">Technologies</p>
            </div>
            <div className="w-px h-12 bg-ig-border" />
            <div className="text-center px-4">
              <p className="font-serif text-2xl text-ig-text">5+</p>
              <p className="text-xs text-ig-text-secondary">Projects</p>
            </div>
            <div className="w-px h-12 bg-ig-border" />
            <div className="text-center px-4">
              <p className="font-serif text-2xl text-ig-text">2+</p>
              <p className="text-xs text-ig-text-secondary">Years Learning</p>
            </div>
          </motion.div>
        </FadeInView>
      </div>
    </section>
  );
};

export default SkillsShowcaseSection;
