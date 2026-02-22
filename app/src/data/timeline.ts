export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  image?: string;
  type: 'education' | 'certification';
  technologies?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2023 - 2025',
    title: 'DUT in Computer Engineering',
    institution: 'EST Fquih Ben Salah',
    description: 'Two-year university technology diploma covering algorithms, programming (C, Java, PHP), databases, networks, operating systems, and software engineering with UML.',
    type: 'education',
    technologies: ['Java', 'PHP', 'MySQL', 'C'],
  },
  {
    id: '2',
    year: '2024',
    title: 'Internship - Evaluation Sheet Digitalization',
    institution: 'EST Fquih Ben Salah',
    description: 'Built a complete web application for digitizing internship evaluation sheets. Managed 52 students across 4 programs with automatic PDF generation.',
    type: 'education',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: '3',
    year: '2025',
    title: 'PFE - AgencyBooking Reservation System',
    institution: 'EST Fquih Ben Salah',
    description: 'Developed a full booking platform with WebSocket real-time notifications, JWT authentication, multi-role system, and automated email confirmations.',
    image: '/assets/spring.webp',
    type: 'education',
    technologies: ['Spring Boot', 'Java 21', 'PostgreSQL', 'WebSocket'],
  },
  {
    id: '4',
    year: '2025 - 2026',
    title: 'Licence DAIA (Bac+3)',
    institution: 'EST Casablanca',
    description: 'Specialization in Application Development and Artificial Intelligence. Covering advanced OOP, machine learning, full-stack development (Node.js, React, Angular), DevOps, and containerization.',
    image: '/assets/react-removebg-preview.webp',
    type: 'education',
    technologies: ['React', 'Node.js', 'Docker', 'Machine Learning'],
  },
  {
    id: '5',
    year: '2026',
    title: 'DevOps Pipeline Project',
    institution: 'EST Casablanca',
    description: 'Built complete DevOps infrastructure: KVM virtualization, Terraform provisioning, GitLab CI/CD, SonarQube analysis, Docker containerization, and Prometheus/Grafana monitoring.',
    image: '/assets/docker.webp',
    type: 'education',
    technologies: ['Docker', 'Terraform', 'GitLab CI', 'Prometheus'],
  },
];
