// Career start year — used to compute dynamic "years of experience"
const CAREER_START_YEAR = 2023;

export const siteConfig = {
  name: 'JAMIL Mouad',
  title: 'Full-Stack Developer | DevOps Enthusiast',
  email: 'jamilmouad25000@gmail.com',
  location: 'Casablanca, Morocco',
  url: 'https://portfolio-nine-wine-85.vercel.app',
  yearsExperience: Math.max(1, new Date().getFullYear() - CAREER_START_YEAR),
  bio: `A versatile developer passionate about building modern, scalable applications. I specialize in full-stack development with expertise across Java Spring Boot, React, Angular, Flutter, and DevOps practices.

I thrive on solving complex problems and delivering end-to-end solutions — from crafting responsive frontends to architecting robust backend systems and streamlining deployments with CI/CD pipelines.`,
  specialties: ['Full-Stack Development', 'DevOps & CI/CD', 'Real-Time Applications', 'Microservices Architecture'],
  social: {
    github: 'https://github.com/Jamil-Mouad',
    linkedin: 'https://www.linkedin.com/in/jamil-mouad-3b8bab3b1',
  },
  resumeUrl: '/cv.pdf', // Place your CV at app/public/cv.pdf
};
