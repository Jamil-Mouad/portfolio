export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'backend' | 'fullstack';
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'VotePoll - Real-Time Polling System',
    description: 'Collaborative polling platform with real-time updates via Socket.IO, hybrid authentication (JWT + OAuth Google), and public/private group system. Built with Next.js 16, React 19, TypeScript, and Express.js.',
    image: '/assets/projects/neovote.webp',
    gradient: 'from-blue-600 via-indigo-500 to-purple-500',
    tags: ['Next.js', 'React', 'TypeScript', 'Socket.IO', 'MySQL'],
    githubUrl: 'https://github.com/Jamil-Mouad/vote-sondage-system',
    category: 'fullstack',
  },
  {
    id: '2',
    title: 'AgencyBooking - Reservation Platform',
    description: 'Multi-role agency reservation platform connecting users with agencies and agents. Features real-time WebSocket locking system, STOMP live updates, JWT authentication with Spring Security, email notifications, and role-based dashboards. Built with Angular 18 + Spring Boot 3.',
    image: '/assets/projects/agencybooking.webp',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
    tags: ['Angular 18', 'Spring Boot 3', 'Java 21', 'PostgreSQL', 'WebSocket', 'Docker'],
    githubUrl: 'https://github.com/Jamil-Mouad/AgencyBooking',
    category: 'fullstack',
  },
  {
    id: '3',
    title: 'DevOps Pipeline - Full CI/CD Infrastructure',
    description: 'Complete DevOps infrastructure from scratch: KVM virtualization, Terraform provisioning, GitLab CI/CD pipeline, SonarQube analysis, Docker containerization, and Prometheus/Grafana monitoring.',
    image: '/assets/projects/pipelinedevos.webp',
    gradient: 'from-orange-600 via-amber-500 to-yellow-400',
    tags: ['Docker', 'GitLab CI', 'Terraform', 'Prometheus', 'Grafana'],
    category: 'backend',
  },
  {
    id: '4',
    title: 'Evaluation Sheet Digitalization',
    description: 'Web-based evaluation sheet generator for EST. Professors log in, input grades through dynamic cascading forms, and generate print-ready A4 documents with digital signatures. Features CSRF protection, prepared SQL statements, and configurable grade weighting per program.',
    image: '/assets/projects/evaluationfile0.webp',
    gradient: 'from-purple-600 via-violet-500 to-pink-400',
    tags: ['PHP 8', 'MariaDB', 'JavaScript', 'HTML5 Canvas'],
    githubUrl: 'https://github.com/Jamil-Mouad/evaluation_file',
    category: 'web',
  },
];
