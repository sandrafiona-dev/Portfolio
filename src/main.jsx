import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  MoonStar,
  Send,
  Sparkle,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import "./styles.css";

const navItems = ["Home", "About", "Projects", "Skills", "Education", "Contact"];

const roles = [
  "AI Builder",
  "Full Stack Developer",
  "Creative Technologist",
];

const skills = [
  {
    title: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Python", "FastAPI", "SQLite"],
  },
  {
    title: "AI & Machine Learning",
    items: ["PyTorch", "ResNet-50", "U-Net", "Grad-CAM", "Gemini API"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "ngrok"],
  },
  {
    title: "UI Engineering",
    items: ["Glassmorphism", "Motion Design"],
  },
];

const projects = [
  {
    index: "01",
    name: "AI Recruitment Platform",
    description:
      "AI-powered recruitment platform that parses resumes and job descriptions, evaluates candidate-job fit, identifies skill gaps, and generates role recommendations.",
    features: [
      "Resume & job parsing",
      "TF-IDF candidate matching",
      "Skill-gap analysis",
      "Role recommendations",
    ],
    tech: [
      "React",
      "FastAPI",
      "Python",
      "Scikit-learn",
      "Docker",
      "pytest",
    ],
    github: "https://github.com/sandrafiona-dev/AI-Recruitment-Platform",
    accent: "from-cyan/40 to-lilac/30",
  },
  {
    index: "02",
    name: "RetinaHeart AI",
    description: "AI-powered retinal image analysis platform for cardiovascular risk prediction.",
    features: ["Retinal image analysis", "Grad-CAM explanations", "PDF clinical reports"],
    tech: ["PyTorch", "FastAPI", "React", "Gemini API"],
    github: "https://github.com/sandrafiona-dev/OculoCardia-AI",
    accent: "from-rose/50 to-cyan/30",

  },
  {
    index: "03",
    name: "Beat Quest",
    description: "Spotify-powered music quiz platform designed for Gen Z and Gen Alpha audiences.",
    features: ["Music quizzes", "Spotify integration", "Dynamic gameplay"],
    tech: ["React", "TypeScript", "Spotify API"],
    github: "https://github.com/sandrafiona-dev/beat-quest-tunes",
    accent: "from-lilac/50 to-rose/30",
  },
  {
    index: "04",
    name: "Portfolio",
    description: "A storytelling-driven portfolio featuring immersive UI, 3D interactions, and modern frontend engineering.",
    features: ["3D UI", "Responsive layout", "Motion effects"],
    tech: ["React", "Three.js", "Tailwind"],
    github: "https://github.com/sandrafiona-dev/Portfolio",
    accent: "from-cyan/40 to-lilac/30",
  },
];

function LiquidGlass() {
  const mesh = useRef();
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.x = t * 0.15 + mouse.y * 0.18;
    mesh.current.rotation.y = t * 0.2 + mouse.x * 0.22;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.85}>
      <group>
        <mesh ref={mesh} scale={[1.55, 1.55, 1.55]}>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial
            color="#b69cff"
            distort={0.45}
            speed={1.6}
            roughness={0.08}
            metalness={0.26}
            transparent
            opacity={0.72}
            transmission={0.72}
            thickness={0.9}
            envMapIntensity={1.8}
          />
        </mesh>
        <mesh scale={[2.05, 2.05, 2.05]}>
          <torusGeometry args={[1.08, 0.008, 16, 180]} />
          <meshBasicMaterial color="#a989ff" transparent opacity={0.36} />
        </mesh>
      </group>
    </Float>
  );
}

function DepthField() {
  const group = useRef();
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 7,
          -Math.random() * 5,
        ],
        scale: 0.035 + Math.random() * 0.09,
        speed: 0.25 + Math.random() * 0.55,
        color: index % 3 === 0 ? "#ff8db9" : index % 3 === 1 ? "#7ee7ff" : "#a989ff",
      })),
    [],
  );

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = mouse.y * 0.08;
    group.current.rotation.y = mouse.x * 0.1;
    group.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * particles[index].speed + index) * 0.0009;
      child.rotation.x = t * 0.12 + index;
      child.rotation.y = t * 0.16 + index;
    });
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.45}
            roughness={0.18}
            metalness={0.35}
            transparent
            opacity={0.68}
          />
        </mesh>
      ))}
    </group>
  );
}

function AmbientScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.4]} gl={{ alpha: true }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} intensity={1.6} color="#7ee7ff" />
      <pointLight position={[-3, -2, 2]} intensity={1.3} color="#ff8db9" />
      <DepthField />
    </Canvas>
  );
}

function ProjectArtifact({ variant = 0 }) {
  const group = useRef();

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = Math.sin(t * 0.55) * 0.18 + mouse.y * 0.12;
    group.current.rotation.y = t * 0.55 + mouse.x * 0.25;
    group.current.position.y = Math.sin(t * 1.1) * 0.08;
  });

  return (
    <Float speed={1.4} floatIntensity={0.55} rotationIntensity={0.28}>
      <group ref={group}>
        {variant === 1 ? (
          <>
            <mesh>
              <torusKnotGeometry args={[0.52, 0.15, 130, 14]} />
              <MeshDistortMaterial color="#ff8db9" distort={0.22} speed={1.4} roughness={0.15} metalness={0.5} />
            </mesh>
            <mesh scale={1.55}>
              <torusGeometry args={[0.56, 0.01, 12, 120]} />
              <meshBasicMaterial color="#7ee7ff" transparent opacity={0.42} />
            </mesh>
          </>
        ) : variant === 2 ? (
          <>
            <mesh rotation={[0.7, 0.2, 0.4]}>
              <boxGeometry args={[0.82, 0.82, 0.82, 6, 6, 6]} />
              <MeshDistortMaterial color="#7ee7ff" distort={0.28} speed={1.1} roughness={0.12} metalness={0.42} />
            </mesh>
            <mesh scale={1.34}>
              <icosahedronGeometry args={[0.58, 1]} />
              <meshBasicMaterial color="#a989ff" wireframe transparent opacity={0.32} />
            </mesh>
          </>
        ) : (
          <>
            <mesh>
              <sphereGeometry args={[0.66, 48, 48]} />
              <MeshDistortMaterial color="#b69cff" distort={0.38} speed={1.2} roughness={0.08} metalness={0.34} />
            </mesh>
            <mesh scale={[1.18, 1.18, 1.18]}>
              <torusGeometry args={[0.56, 0.012, 12, 120]} />
              <meshBasicMaterial color="#ff8db9" transparent opacity={0.36} />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
}

function MiniScene({ variant = 0, className = "" }) {
  return (
    <div className={`mini-scene ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 36 }} dpr={[1, 1.6]} gl={{ alpha: true }}>
        <ambientLight intensity={0.75} />
        <pointLight position={[2, 2, 3]} intensity={2.1} color="#ffffff" />
        <pointLight position={[-2, -1.5, 2]} intensity={1.4} color="#a989ff" />
        <ProjectArtifact variant={variant} />
      </Canvas>
    </div>
  );
}

function HeroScene() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 6], fov: 48 }} dpr={[0.75, 1.25]}>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 2, 4]} intensity={3.2} color="#ff9dd2" />
      <pointLight position={[-3, -2, 2]} intensity={2.3} color="#7ee7ff" />
      <Suspense fallback={null}>
        <LiquidGlass />
        <DepthField />
        <Sparkles count={62} speed={0.22} size={2.2} scale={[5, 4, 2]} color="#e9ddff" />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const doneTyping = !deleting && text === word;
    const doneDeleting = deleting && text === "";
    const delay = doneTyping ? 1300 : deleting ? 42 : 75;

    const timer = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true);
      } else if (doneDeleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, text, wordIndex, words]);

  return text;
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 38 });
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 38 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
    };
    const over = (event) => setActive(Boolean(event.target.closest("a, button, .magnetic")));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden="true"
      className={`custom-cursor ${active ? "is-active" : ""}`}
      style={{ x: smoothX, y: smoothY }}
    />
  );
}

function TiltCard({ children, className = "", id }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [7, -7]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);

  return (
    <motion.div
      id={id}
      className={`glass-card magnetic ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isLight = theme === "light";

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#home" className="brand-link" aria-label="Sandra Fiona home" onClick={closeMenu}>
          <span className="font-script text-3xl text-white">Sandra Fiona</span>
          <Sparkle className="h-4 w-4 text-lilac" />
        </a>
        <div className="desktop-nav">
          {navItems.map((item) => (
            <a className="nav-link" href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            aria-label={isLight ? "Switch to night theme" : "Switch to light theme"}
            aria-pressed={isLight}
            onClick={onThemeToggle}
          >
            {isLight ? <MoonStar className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a className="nav-link" href={`#${item.toLowerCase()}`} key={item} onClick={closeMenu}>
            {item}
          </a>
        ))}
      </div>
    </header>
  );
}

function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="eyebrow">MCA Gen AI Student</div>
          <h1 className="hero-title">
            Turning <span className="gradient-text">AI ideas</span> into working applications.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/78">
            MCA Generative AI student building AI-powered applications through thoughtful design,
            immersive interfaces, and intelligent systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="primary-button">
              <Sparkle className="h-4 w-4" /> Explore My Work
            </a>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                const contact = document.getElementById("contact");

                if (contact) {
                  const y =
                    contact.getBoundingClientRect().top +
                    window.scrollY -
                    80;

                  window.scrollTo({
                    top: y,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get In Touch <Send className="h-4 w-4" />
            </button>
            <a href="Sandra_Fiona_Resume.pdf" target="_blank" rel="noreferrer" className="secondary-button">
              Resume <Download className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-lg text-ink">
            <span>I&apos;m a</span>
            <span className="typing-role">{typed}<span className="cursor-bar">|</span></span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {roles.slice(0, 3).map((role) => (
              <span className="pill" key={role}>{role}</span>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[460px] sm:h-[460px] md:h-[460px] lg:h-[560px] w-full">
          <div className="hero-orbit" />
          <HeroScene />
          <motion.div
            className="floating-note"
            animate={{ y: [0, -12, 0], rotate: [-5, -2, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Currently Exploring</span>
            <strong>Generative AI</strong>
            <strong>Computer Vision</strong>
            <small>01</small>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const milestones = ["Tamil Nadu", "BCA Graduate", "MCA Gen AI", "Building Impact"];
  return (
    <section id="about" className="section">
      <div className="chapter-label">Chapter 01</div>
      <TiltCard className="story-grid">
        <div>
          <h2>My Story</h2>
          <div className="photo-stack" aria-hidden="true">
            <div className="photo-card sunset" />
            <div className="photo-card code" />
            <div className="photo-card ocean" />
            <span className="paper-note">keep<br />building</span>
          </div>
        </div>
        <div className="story-copy">
          <p className="story-lead">A curious student from Tamil Nadu who fell in love with code.</p>
          <p>
            From solving small problems to building intelligent systems, Sandra&apos;s journey is
            fueled by curiosity, creativity, and the belief that technology can make a real impact.
          </p>
        </div>
        <div className="timeline">
          {milestones.map((item, index) => (
            <div className="timeline-item" key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
              <p>{index === 0 ? "Where my story began" : index === 1 ? "Built the foundation" : index === 2 ? "Exploring the future" : "Creating meaningful products"}</p>
            </div>
          ))}
        </div>
      </TiltCard>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="chapter-label">Chapter 03</div>
      <div className="section-heading">
        <div>
          <h2>Featured Projects</h2>
          <p>Things I&apos;ve built with passion and a lot of coffee.</p>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <TiltCard className="project-card project-card-3d" key={project.name}>
            <span className="project-index">{project.index}</span>
            <MiniScene variant={Number(project.index) - 1} />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="feature-list">
              {project.features.map((feature) => <span key={feature}>{feature}</span>)}
            </div>
            <div className="tech-row">
              {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" className="card-link" >
              View Project <ArrowRight className="h-4 w-4" /> </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="chapter-label">Chapter 04</div>
      <div className="section-heading">
        <div>
          <h2>Skills & Tools</h2>
          <p>Frontend craft, intelligent systems, product thinking, and immersive motion.</p>
        </div>
      </div>
      <div className="skills-grid">
        {skills.map((group, index) => (
          <TiltCard className="skill-card" key={group.title}>
            <MiniScene variant={index % 3} className="skill-mini-scene" />
            <div className="skill-icon">{index === 0 ? <Code2 /> : index === 3 ? <Github /> : <Sparkle />}</div>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function EducationContact() {
  const [command, setCommand] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const particles = useMemo(() => Array.from({ length: 22 }, (_, i) => i), []);

  function submit(event) {
    event.preventDefault();

    if (command.trim().toLowerCase() === "sudo hire sandra") {
      setCelebrate(true);

      window.setTimeout(() => {
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=sandrafiona11@gmail.com&su=Let's%20Work%20Together&body=Hi%20Sandra%2C%0A%0AI%27d%20like%20to%20discuss%20an%20opportunity%20with%20you.",
          "_blank"
        );
      }, 700);

      window.setTimeout(() => setCelebrate(false), 2600);
    }
  }

  return (
    <section id="education" className="section two-column">
      <TiltCard className="education-card">
        <div className="card-title-row">
          <h2>Education</h2>
          <GraduationCap className="h-10 w-10 text-cyan" />
        </div>
        <div className="education-list">
          <div>
            <strong>MCA - Generative AI</strong>
            <span>2025-Pursuing | SRM Institute of Science and Technology, Chennai</span>
          </div>
          <div>
            <strong>BCA - Computer Applications</strong>
            <span>2021-2024 | Women's Christian College, Chennai</span>
          </div>
        </div>
      </TiltCard>

      <TiltCard className={`terminal-card ${celebrate ? "celebrate" : ""}`} id="contact">
        <div className="terminal-top">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span>terminal</span>
        </div>
        <div className="terminal-body">
          <p>&gt; Hello there!</p>
          <p>&gt; Interested in working together?</p>
          <p>&gt; Type a command below.</p>
          <form onSubmit={submit}>
            <Terminal className="h-4 w-4" />
            <input
              aria-label="Contact command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="sudo hire sandra"
            />
            <button aria-label="Send command"><Send className="h-4 w-4" /></button>
          </form>
          <p className="thanks">Thank you! Let&apos;s build something amazing together.</p>
        </div>
        {celebrate && <div className="confetti">{particles.map((item) => <i key={item} />)}</div>}
      </TiltCard>

      <div className="contact-strip">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sandrafiona11@gmail.com&su=Let's%20Work%20Together&body=Hi%20Sandra%2C%0A%0AI%27d%20like%20to%20discuss%20an%20opportunity%20with%20you."
          target="_blank" rel="noreferrer" > <Mail className="h-4 w-4" /> Email </a>
        <a href="https://linkedin.com/in/sandra-fiona-814903265" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        <a href="https://github.com/sandrafiona-dev" target="_blank" rel="noreferrer"><Github className="h-4 w-4" /> GitHub</a>
        <a href="Sandra_Fiona_Resume.pdf" target="_blank" rel="noreferrer"><Download className="h-4 w-4" /> Resume</a>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem("portfolio-theme") || "night");

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "night" : "light"));
  };

  return (
    <>
      <CustomCursor />
      <div className="ambient-bg" />
      {!window.matchMedia("(max-width: 768px)").matches && (
        <div className="ambient-canvas" aria-hidden="true">
          <AmbientScene />
        </div>
      )}
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <Story />
        <Projects />
        <Skills />
        <EducationContact />
      </main>
      <footer>
        <span>&copy; 2026 Sandra Fiona</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
