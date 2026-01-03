import reactLogo from './assets/ayush-high-resolution-logo-transparent.png'
import pp from './assets/pp.jpeg'
import './App.css'

function App() {
  return (
    <div className="portfolio">
      <header>
        <nav>
          <img src={reactLogo} alt="Ayush Shrestha Logo" srcSet="" />
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <div className="about-content">
          <img src={pp} alt="Ayush Shrestha" className="about-image" />
          <div className="about-text">
            <p><strong>Ayush Shrestha</strong> <br/>Second-year student at Malpi International College with a passion for DevOps and cloud technologies. Currently interning as a DevOps Engineer, working with CI/CD pipelines, infrastructure as code, and container orchestration. Driven by the vision of building scalable solutions and aspiring to create impactful technology ventures.</p>
          </div>
        </div>
      </section>

      <div id="projects">
        <h2>Projects</h2>
        <div className="project">
          <h3>Edulink</h3>
          <p>Made a Html, CSS, JS based project for college students to connect and share resources. It has features like resource sharing, discussion forums, and event notifications.</p>
          <p><strong>Github:</strong><a href="https://github.com/IsthatAyus/Edulink"> https://github.com/IsthatAyus/Edulink</a></p>
          <p><strong>Website:</strong><a href="https://isthatayus.github.io/Edulink/"> https://isthatayus.github.io/Edulink/</a></p>
        </div>
        <div className="project">
          <h3>Starlight Collector</h3>
          <p>Made a java based 2d game using swing. It was developed as a college project to learn mvc model and oop concepts.</p>
          <p><strong>Github:</strong><a href="https://github.com/PritamTheCoder/Starlight_Collector"> https://github.com/PritamTheCoder/Starlight_Collector</a></p>
        </div>
      </div>
      

      <div id="contact">
        <h2>Contact</h2>
        <p><strong>Email:</strong><a href="mailto:ayushshrestha796@gmail.com"> ayushshrestha796@gmail.com</a></p>
        <p><strong>LinkedIn:</strong><a href="https://www.linkedin.com/in/ayush-shrestha-18b8b621a/"> Click Here</a></p>
        <p><strong>Github:</strong><a href="https://github.com/IsthatAyus"> Click Here</a></p>
      </div>
    </div>
  )
}

export default App