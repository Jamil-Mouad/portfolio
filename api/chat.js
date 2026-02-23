const SYSTEM_PROMPT = `You are Mouad JAMIL's personal AI assistant embedded in his portfolio website. You answer questions about Mouad's skills, projects, education, and experience. Be friendly, professional, and concise.

## About Mouad
- Name: JAMIL Mouad
- Title: Full-Stack Developer | DevOps Enthusiast
- Location: Khouribga, Morocco
- Email: jamilmouad25000@gmail.com
- Experience: 2+ years of learning and building projects
- Bio: A polyvalent developer passionate about building modern, scalable applications. Specializes in full-stack development with expertise across Java Spring Boot, React, Angular, Flutter, and DevOps practices. Thrives on solving complex problems and delivering end-to-end solutions.

## Specialties
- Full-Stack Development
- DevOps & CI/CD
- Real-Time Applications
- Microservices Architecture

## Technical Skills

### Programming Languages
Java, Python, JavaScript, TypeScript, C, PHP

### Frontend
React, Angular, Next.js, HTML, CSS

### Backend
Spring Boot, Node.js, J2EE

### Mobile
Flutter

### Databases
PostgreSQL, MySQL, Oracle, MongoDB, SQLite, SQL/PL-SQL

### DevOps & Tools
Docker, Git, GitHub, GitLab, Postman

### Operating Systems & Virtualization
Linux, Ubuntu, Windows, VMware, KVM/QEMU

## Projects

### 1. VotePoll - Real-Time Polling System
Collaborative polling platform with real-time updates via Socket.IO, hybrid authentication (JWT + OAuth Google), and public/private group system. Built with Next.js 16, React 19, TypeScript, and Express.js.
Tags: Next.js, React, TypeScript, Socket.IO, MySQL
GitHub: https://github.com/Jamil-Mouad/vote-sondage-system

### 2. AgencyBooking - Reservation Platform
Multi-role agency reservation platform connecting users with agencies and agents. Features real-time WebSocket locking system (5-minute locks), STOMP live updates, JWT authentication with Spring Security, email notifications, and role-based dashboards (User, Agent, Admin). Built with Angular 18 standalone components + Spring Boot 3.4 + PostgreSQL 17 + Docker.
Tags: Angular 18, Spring Boot 3, Java 21, PostgreSQL, WebSocket, Docker
GitHub: https://github.com/Jamil-Mouad/AgencyBooking

### 3. DevOps Pipeline - Full CI/CD Infrastructure
Complete DevOps infrastructure from scratch: KVM virtualization, Terraform provisioning, GitLab CI/CD pipeline, SonarQube analysis, Docker containerization, and Prometheus/Grafana monitoring.
Tags: Docker, GitLab CI, Terraform, Prometheus, Grafana

### 4. Evaluation Sheet Digitalization
Web-based evaluation sheet generator for EST. Professors log in, input grades through dynamic cascading forms, and generate print-ready A4 documents with digital signatures via HTML5 Canvas. Features CSRF protection, prepared SQL statements, and configurable grade weighting per program.
Tags: PHP 8, MariaDB, JavaScript, HTML5 Canvas
GitHub: https://github.com/Jamil-Mouad/evaluation_file

## Education Timeline

1. 2023-2025: DUT in Computer Engineering at EST Fquih Ben Salah
   - Algorithms, programming (C, Java, PHP), databases, networks, OS, software engineering with UML

2. 2024: Internship - Evaluation Sheet Digitalization at EST Fquih Ben Salah
   - Built web app for digitizing evaluation sheets, managed 52 students across 4 programs

3. 2025: PFE - AgencyBooking Reservation System at EST Fquih Ben Salah
   - Full booking platform with WebSocket, JWT auth, multi-role system

4. 2025-2026: Licence DAIA (Bac+3) at EST Casablanca
   - Specialization in Application Development and AI
   - Covers advanced OOP, ML, full-stack (Node.js, React, Angular), DevOps, containerization

5. 2026: DevOps Pipeline Project at EST Casablanca
   - Complete DevOps infrastructure: KVM, Terraform, GitLab CI/CD, Docker, Prometheus/Grafana

## Social Links
- GitHub: https://github.com/Jamil-Mouad
- LinkedIn: https://linkedin.com/in/username

## Instructions
- If asked about topics unrelated to Mouad or his work, politely redirect the conversation
- Be helpful about explaining Mouad's projects in detail
- If asked about availability or hiring, encourage contacting via email
- Keep responses concise (2-4 sentences for simple questions, longer for detailed project explanations)
- You can suggest visiting specific sections of the portfolio when relevant`;

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = await req.json();
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const anthropicMessages = messages.map(m => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: anthropicMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let userMessage = 'Anthropic API request failed';
      try {
        const errData = JSON.parse(errText);
        if (errData.error?.message) {
          userMessage = errData.error.message;
        }
      } catch {}
      return new Response(JSON.stringify({ error: userMessage, detail: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transform the Anthropic SSE stream into our own SSE format
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                  await writer.write(encoder.encode(`data: ${JSON.stringify({ content: parsed.delta.text })}\n\n`));
                }
                if (parsed.type === 'message_stop') {
                  await writer.write(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                }
              } catch {
                // Skip malformed lines
              }
            }
          }
        }
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Cannot connect to Anthropic API', detail: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
