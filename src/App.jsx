import { useState, useEffect } from 'react';
import reactLogo from './assets/ayush-high-resolution-logo-transparent.png';
import pp from './assets/pp.jpeg';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Cursor tracking
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll spy
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
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

  const skills = [
    { name: 'Docker', level: 85, category: 'DevOps' },
    { name: 'Kubernetes', level: 75, category: 'DevOps' },
    { name: 'CI/CD Pipelines', level: 80, category: 'DevOps' },
    { name: 'Terraform', level: 70, category: 'IaC' },
    { name: 'AWS', level: 75, category: 'Cloud' },
    { name: 'Git/GitHub', level: 90, category: 'Version Control' },
    { name: 'Linux', level: 85, category: 'OS' },
    { name: 'Python', level: 75, category: 'Programming' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'Java', level: 70, category: 'Programming' }
  ];

  const projects = [
    {
      title: 'Edulink',
      description: 'A collaborative platform for college students to connect and share resources. Features include resource sharing, discussion forums, and event notifications.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/IsthatAyus/Edulink',
      live: 'https://isthatayus.github.io/Edulink/',
      highlight: true
    },
    {
      title: 'Starlight Collector',
      description: 'A 2D game built with Java Swing, developed to learn MVC architecture and OOP concepts. Features dynamic gameplay and smooth animations.',
      tech: ['Java', 'Swing', 'MVC'],
      github: 'https://github.com/PritamTheCoder/Starlight_Collector',
      highlight: false
    },
    {
      title: 'Hosting Automation Platform',
      description: 'Built an integrated hosting platform using FOSSBilling and ISPConfig with automated provisioning, email notifications, and client management.',
      tech: ['PHP', 'ISPConfig', 'MySQL', 'Apache'],
      highlight: true
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
      {/* Custom cursor */}
      <div 
        className="cursor-glow" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px` 
        }} 
      />

      {/* Navigation */}
      <header className="header">
        <nav className="nav">
          <div className="nav-logo">
            <img src={reactLogo} alt="Ayush Shrestha" />
            <span className="terminal-prompt">ayush@devops:~$</span>
          </div>
          <div className="nav-links">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                <span className="nav-number">0{['about', 'projects', 'skills', 'contact'].indexOf(section) + 1}.</span>
                {section}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-pattern"></div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot"></span>
            Available for opportunities
          </div>
          <h1 className="hero-title">
            <span className="title-line">Hi, I'm</span>
            <span className="title-name">Ayush Shrestha</span>
            <span className="title-role">DevOps Engineer</span>
          </h1>
          <p className="hero-subtitle">
            Building scalable infrastructure • Automating deployments • Creating impactful technology solutions
          </p>
          <div className="hero-cta">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              View Projects →
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
              Get in Touch
            </button>
          </div>
          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
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
                <div className="image-overlay"></div>
              </div>
              <div className="image-decoration"></div>
            </div>
            
            <div className="about-content">
              <h2 className="section-title">Building the Future of Infrastructure</h2>
              <div className="about-text">
                <p>
                  I'm a <strong>second-year student</strong> at Malpi International College with an intense passion for 
                  <span className="highlight"> DevOps and cloud technologies</span>. Currently interning as a DevOps Engineer, 
                  I work hands-on with CI/CD pipelines, infrastructure as code, and container orchestration.
                </p>
                <p>
                  My journey in tech is driven by a vision to build <strong>scalable, reliable solutions</strong> that make a difference. 
                  From automating deployments to optimizing cloud infrastructure, I'm constantly learning and pushing boundaries.
                </p>
                <p>
                  Beyond the terminal, I'm an aspiring entrepreneur with dreams of creating impactful technology ventures that solve real-world problems.
                </p>
              </div>
              
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">2+</div>
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

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">02</span>
            <span className="label-text">Projects</span>
          </div>
          
          <h2 className="section-title">Featured Work</h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card ${project.highlight ? 'highlight' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-number">0{index + 1}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="section-content">
          <div className="section-label">
            <span className="label-number">03</span>
            <span className="label-text">Skills</span>
          </div>
          
          <h2 className="section-title">Tech Stack & Expertise</h2>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-category">{skill.category}</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ 
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.05 + 0.3}s`
                    }}
                  >
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="skills-note">
            <p>Currently expanding my expertise in <strong>Kubernetes orchestration</strong> and <strong>cloud-native architectures</strong></p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                Whether you need DevOps expertise, want to collaborate, or just want to connect — let's talk!
              </p>
            </div>

            <div className="contact-grid">
              <a href="mailto:ayushshrestha796@gmail.com" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-info">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">ayushshrestha796@gmail.com</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/ayush-shrestha-18b8b621a/" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="contact-info">
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">Connect with me</div>
                </div>
              </a>

              <a href="https://github.com/IsthatAyus" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Designed & Built by Ayush Shrestha</p>
          <p className="footer-tech">React • Vite • Love for DevOps</p>
        </div>
      </footer>
    </div>
  );
}

export default App;