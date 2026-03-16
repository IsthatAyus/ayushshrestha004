import { useState, useEffect } from 'react';
import reactLogo from './assets/ayush-high-resolution-logo-transparent.png';
import pp from './assets/pp.jpeg';
import './App.css';

// ─── Terminal Typer ────────────────────────────────────────────────────────
function TerminalTyper() {
  const commands = [
    '$ terraform apply --auto-approve',
    '$ kubectl rollout deploy/api --watch',
    '$ docker build -t app:latest .',
    '$ ansible-playbook provision.yml',
    '$ helm upgrade --install prod ./chart',
  ];
  const [lineIndex, setLineIndex] = useState(0);
  const [display, setDisplay]     = useState('');
  const [phase, setPhase]         = useState('typing');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = commands[lineIndex];
    let timeout;
    if (phase === 'typing') {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 55);
      } else {
        timeout = setTimeout(() => setPhase('erasing'), 1800);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 28);
      } else {
        setLineIndex((i) => (i + 1) % commands.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, charIndex, lineIndex]);

  return (
    <div className="terminal-block">
      <div className="terminal-bar">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="t-title">ayush@devops — bash</span>
      </div>
      <div className="terminal-body">
        <span className="t-prompt">ayush@devops:~</span>
        <span className="t-cmd">{display}</span>
        <span className="t-cursor" />
      </div>
    </div>
  );
}

// ─── Skill Group ───────────────────────────────────────────────────────────
function SkillGroup({ icon, category, items }) {
  return (
    <div className="skill-group">
      <div className="skill-group-header">
        <span className="skill-group-icon">{icon}</span>
        <span className="skill-group-category">{category}</span>
      </div>
      <div className="skill-tags">
        {items.map((item) => (
          <span key={item} className="skill-pill">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <div
      className={`project-card ${project.highlight ? 'highlight' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="project-card-inner">
        <div className="project-header">
          <div className="project-meta">
            <span className="project-number">0{index + 1}</span>
            {project.highlight && <span className="project-badge">Featured</span>}
          </div>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>Source</span>
              </a>
            )}
            {project.live && (
              <a href="https://edulinkk.netlify.app/" target="_blank" rel="noopener noreferrer" className="project-link project-link-live" aria-label="Live Demo">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                <span>Live</span>
              </a>
            )}
          </div>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {project.deploy && (
          <div className="project-deploy">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span>{project.deploy}</span>
          </div>
        )}

        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [cursorPos, setCursorPos]         = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);

  const navItems = ['about', 'projects', 'skills', 'contact'];

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPos = window.scrollY + 220;
      for (const section of navItems) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top && scrollPos < top + el.offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    // Small delay so menu close animation plays first on mobile
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      menuOpen ? 280 : 0
    );
  };

  // ── Data ──────────────────────────────────────────────────────────────────
  const skillGroups = [
    { icon: '☁️',  category: 'Cloud',                 items: ['AWS', 'GCP', 'DigitalOcean'] },
    { icon: '📦',  category: 'Containers',             items: ['Docker', 'Kubernetes', 'Helm'] },
    { icon: '⚙️',  category: 'CI / CD',                items: ['GitHub Actions', 'Jenkins', 'ArgoCD'] },
    { icon: '🏗️', category: 'Infrastructure as Code', items: ['Terraform', 'Ansible', 'Pulumi'] },
    { icon: '📊',  category: 'Monitoring',             items: ['Prometheus', 'Grafana', 'Loki'] },
    { icon: '💻',  category: 'Programming',            items: ['Python', 'Bash', 'JavaScript', 'Java'] },
    { icon: '🌐',  category: 'Networking & Web',       items: ['Nginx', 'Apache', 'Linux'] },
    { icon: '🔀',  category: 'Version Control',        items: ['Git', 'GitHub', 'GitLab'] },
  ];

  const projects = [
    {
      title: 'Hosting Automation Platform',
      description:
        'Built an integrated hosting platform using FOSSBilling and ISPConfig with automated provisioning, email notifications, and client management — reducing manual setup time by 80%.',
      deploy: 'Bare-metal VPS · Apache · MySQL · ISPConfig automation hooks',
      tech: ['PHP', 'ISPConfig', 'MySQL', 'Apache', 'FOSSBilling'],
      highlight: true,
    },
    {
      title: 'Edulink',
      description:
        'A collaborative platform for college students to connect and share academic resources. Features resource sharing, discussion forums, and event notifications.',
      deploy: 'Netlify · GitHub Actions CI · CDN-backed assets',
      tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
      github: 'https://github.com/IsthatAyus/Edulink',
      live: 'https://edulinkk.netlify.app/',
      highlight: true,
    },
    {
      title: 'Starlight Collector',
      description:
        'A 2D game built with Java Swing to learn MVC architecture and OOP design patterns. Features dynamic gameplay loops and smooth frame-based animation.',
      deploy: 'Cross-platform JAR · GitHub Releases',
      tech: ['Java', 'Swing', 'MVC', 'OOP'],
      github: 'https://github.com/PritamTheCoder/Starlight_Collector',
      highlight: false,
    },
  ];

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>

      {/* Cursor glow (hidden on touch devices via CSS) */}
      <div
        className="cursor-glow"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <nav className="nav">

          {/* Logo */}
          <div className="nav-logo">
            <img src={reactLogo} alt="Ayush Shrestha" />
            <span className="terminal-prompt">ayush@devops:~$</span>
          </div>

          {/* Desktop links */}
          <div className="nav-links">
            {navItems.map((section, i) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                <span className="nav-number">0{i + 1}.</span>
                {section}
              </button>
            ))}
            <a
              href="/resume.pdf"
              className="btn-nav-resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume ↗
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-menu-inner">
            {navItems.map((section, i) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
              >
                <span className="mobile-nav-number">0{i + 1}.</span>
                {section}
              </button>
            ))}
            <a
              href="/resume.pdf"
              className="mobile-resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Download Resume ↗
            </a>
          </div>
        </div>

        {/* Backdrop */}
        <div
          className={`menu-overlay ${menuOpen ? 'menu-overlay-open' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-pattern" />
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-title">
            <span className="title-name">Ayush Shrestha</span>
            <span className="title-role">DevOps Engineer</span>
          </h1>

          <p className="hero-subtitle">
            Designing reliable infrastructure, automating deployments,
            and building scalable cloud systems.
          </p>

          <TerminalTyper />

          <div className="hero-cta">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              View Projects
            </button>
            <a
              href="/resume.pdf"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
              Contact
            </button>
          </div>

          <div className="hero-scroll">
            <span>scroll</span>
            <div className="scroll-indicator" />
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="section about-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">01</span>
            <span className="label-text">About</span>
          </div>

          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="image-frame">
                <img src={pp} alt="Ayush Shrestha" className="about-image" />
                <div className="image-overlay" />
              </div>
              <div className="image-decoration" />
            </div>

            <div className="about-content">
              <h2 className="section-title">
                Building the Future<br />of Infrastructure
              </h2>
              <div className="about-text">
                <p>
                  I'm a <strong>second-year student</strong> at Malpi International College
                  with an intense passion for{' '}
                  <span className="highlight">DevOps and cloud technologies</span>.
                  Currently interning as a DevOps Engineer, I work hands-on with CI/CD
                  pipelines, infrastructure as code, and container orchestration.
                </p>
                <p>
                  My journey in tech is driven by a vision to build{' '}
                  <strong>scalable, reliable solutions</strong> that make a difference —
                  from automating deployments to optimizing cloud infrastructure.
                </p>
                <p>
                  Beyond the terminal, I'm an aspiring entrepreneur with dreams of creating
                  impactful technology ventures that solve real-world problems.
                </p>
              </div>

              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">1+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section id="projects" className="section projects-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">02</span>
            <span className="label-text">Projects</span>
          </div>
          <h2 className="section-title">Featured Work</h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="projects-footer">
            <a
              href="https://github.com/IsthatAyus"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              View all on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section id="skills" className="section skills-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">03</span>
            <span className="label-text">Skills</span>
          </div>
          <h2 className="section-title">Tech Stack &amp; Expertise</h2>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <SkillGroup key={group.category} {...group} />
            ))}
          </div>

          <div className="skills-note">
            <p>
              Currently expanding expertise in{' '}
              <strong>Kubernetes orchestration</strong> and{' '}
              <strong>cloud-native architectures</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className="section contact-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">04</span>
            <span className="label-text">Contact</span>
          </div>

          <div className="contact-content">
            <div className="contact-text">
              <h2 className="section-title">Let's Build Something Amazing</h2>
              <p>
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Whether you need DevOps
                expertise, want to collaborate, or just want to connect — let's talk.
              </p>
            </div>

            <div className="contact-grid">
              <a href="mailto:ayushshrestha796@gmail.com" className="contact-card">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">ayushshrestha796@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ayush-shrestha-18b8b621a/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="contact-info">
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">Connect with me</div>
                </div>
              </a>

              <a
                href="https://github.com/IsthatAyus"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="contact-info">
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">View my code</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-content">
          <p>Designed &amp; Built by <strong>Ayush Shrestha</strong></p>
          <p className="footer-tech">React · Vite · Love for DevOps</p>
        </div>
      </footer>
    </div>
  );
}

export default App;