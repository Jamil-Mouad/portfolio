import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import { projectsData, type Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="relative w-full aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Project Image Background */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Category label */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-xs text-white capitalize">{project.category}</span>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Hover Overlay with Actions */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-ig-text hover:scale-110 transition-transform"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-5 h-5" />
          </motion.a>
        )}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-ig-text hover:scale-110 transition-transform"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
        {/* Top - Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-white/20 backdrop-blur-sm text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div>
          <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-white/80 max-w-xl drop-shadow-md">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4 mt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="relative w-full py-20 md:py-28 bg-ig-bg-secondary">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Section Header */}
        <FadeInView className="mb-16">
          <p className="text-sm text-ig-text-secondary mb-6 tracking-wide">My Expertise</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.25] text-ig-text max-w-4xl text-center mx-auto">
            Experienced full-stack developer crafting scalable solutions across diverse technologies and platforms.
          </h2>
        </FadeInView>

        {/* Skills Overview */}
        <FadeInView delay={0.2} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="text-base md:text-lg text-ig-text max-w-md">
              From backend systems with Java Spring to modern frontend with Angular and Flutter, I deliver end-to-end solutions.
            </p>
            <a
              href="#skills"
              className="group flex items-center gap-2 text-sm text-ig-text link-underline self-start md:self-auto"
            >
              <span>View all skills</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </FadeInView>

        {/* Tech Stack Title */}
        <FadeInView delay={0.3} className="mb-10 text-center">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ig-text">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { src: '/assets/python.webp', alt: 'Python' },
              { src: '/assets/logo-java.webp', alt: 'Java' },
              { src: '/assets/spring.webp', alt: 'Spring Boot' },
              { src: '/assets/html-removebg-preview.webp', alt: 'HTML/CSS' },
              { src: '/assets/js-removebg-preview.webp', alt: 'JavaScript' },
              { src: '/assets/nodejs-removebg-preview.webp', alt: 'Node.js' },
              { src: '/assets/anguar-removebg-preview.webp', alt: 'Angular' },
              { src: '/assets/logo-flutter.webp', alt: 'Flutter' },
              { src: '/assets/logo-oracle.webp', alt: 'Oracle' },
              { src: '/assets/logo-mysql.webp', alt: 'MySQL' },
              { src: '/assets/logo-postgres.webp', alt: 'PostgreSQL' },
              { src: '/assets/logo-mongodb.webp', alt: 'MongoDB' },
              { src: '/assets/dart-removebg-preview.webp', alt: 'Dart' },
              { src: '/assets/expressjs-removebg-preview.webp', alt: 'Express.js' },
              { src: '/assets/maven-removebg-preview.webp', alt: 'Maven' },
            ].map((tech) => (
              <div
                key={tech.alt}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white border border-ig-border p-2 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <img src={tech.src} alt={tech.alt} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-ig-text-secondary group-hover:text-ig-text transition-colors">{tech.alt}</span>
              </div>
            ))}
          </div>
        </FadeInView>

        {/* Project Cards */}
        <div className="space-y-8 mt-16">
          {projectsData.map((project, index) => (
            <FadeInView key={project.id} delay={0.1 * (index + 1)}>
              <ProjectCard project={project} />
            </FadeInView>
          ))}
        </div>

        {/* Focus Areas */}
        <div id="skills" className="mt-20">
          <FadeInView delay={0.3}>
              <p className="text-sm text-ig-text-secondary mb-4">What I Focus On</p>
              <h4 className="font-serif text-xl md:text-2xl text-ig-text mb-8">
                Core areas of expertise
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Backend Systems', desc: 'Java Spring Boot, Node.js, REST APIs, microservices architecture', icon: '{}' },
                  { title: 'Frontend Development', desc: 'React, Angular, Next.js — responsive, accessible, and performant UIs', icon: '</>' },
                  { title: 'Databases', desc: 'PostgreSQL, MySQL, MongoDB, Oracle — schema design and optimization', icon: 'DB' },
                  { title: 'Mobile Development', desc: 'Cross-platform apps with Flutter and Dart', icon: '[]' },
                  { title: 'DevOps & CI/CD', desc: 'Docker, GitLab CI, Terraform, Prometheus/Grafana monitoring', icon: '>_' },
                  { title: 'Real-Time Systems', desc: 'WebSocket, Socket.IO, STOMP — live updates and event-driven design', icon: '<<' },
                ].map((area, i) => (
                  <motion.div
                    key={area.title}
                    className="p-6 bg-white rounded-xl border border-ig-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <span className="inline-block text-lg font-mono text-ig-text-secondary mb-3">{area.icon}</span>
                    <h5 className="font-serif text-lg text-ig-text mb-2">{area.title}</h5>
                    <p className="text-sm text-ig-text-secondary leading-relaxed">{area.desc}</p>
                  </motion.div>
                ))}
              </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
