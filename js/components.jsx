// components.jsx — componentes das seções

const { useState, useEffect, useRef } = React;

// ── ícones (svg inline, estilo lucide) ──
const Icon = ({ name, size = 14 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowRight: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowDown: <path d="M12 5v14M5 13l7 7 7-7" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    terminal: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
};

// ── animação de entrada ao rolar (wrapper) ──
// Modo padrão envolve os filhos em um <div>. O modo `as="self"` clona o
// único filho e adiciona a classe `reveal` diretamente nele — necessário quando
// o filho precisa ser filho direto de um grid CSS / pai posicionado
// (caso contrário grid-column / pseudo-elementos ::before quebram).
function Reveal({ children, delay = 0, as }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  if (as === "self") {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ref,
      className: `${child.props.className || ""} reveal`.trim(),
    });
  }
  return <div ref={ref} className="reveal">{children}</div>;
}

// ── barra de navegação ──
function Navbar({ t, lang, setLang, dark, setDark, onConsole }) {
  const links = [
    { id: "about", label: t.nav.about, num: "01" },
    { id: "skills", label: t.nav.skills, num: "02" },
    { id: "projects", label: t.nav.projects, num: "03" },
    { id: "timeline", label: t.nav.timeline, num: "04" },
    { id: "contact", label: t.nav.contact, num: "05" },
  ];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-brand-dot" />
        <span>juan.dev</span>
        <span style={{ color: "var(--fg-4)" }}>/</span>
        <span style={{ color: "var(--fg-3)" }}>portfolio</span>
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>
            <span className="nav-link-num">{l.num}.</span>{l.label}
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <button className="nav-btn" onClick={() => setLang(lang === "pt" ? "en" : "pt")} title="Switch language">
          <Icon name="globe" />
          <span>{lang === "pt" ? "PT" : "EN"}</span>
        </button>
        <button className="nav-btn" onClick={() => setDark(!dark)} title="Toggle theme">
          <Icon name={dark ? "sun" : "moon"} />
        </button>
        <button className="nav-btn" onClick={onConsole} title="Open console" aria-label="console">
          <Icon name="terminal" />
        </button>
      </div>
    </nav>
  );
}

// ── terminal do hero ──
function HeroTerminal() {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dot r" />
        <span className="terminal-dot y" />
        <span className="terminal-dot g" />
        <span className="terminal-title">~ /juan/portfolio — zsh</span>
      </div>
      <div className="terminal-body">
        <span className="term-line"><span className="term-prompt">$</span> whoami</span>
        <span className="term-line">juan_oliveira_marques</span>
        <span className="term-line">&nbsp;</span>
        <span className="term-line"><span className="term-prompt">$</span> cat profile.json</span>
        <span className="term-line">{`{`}</span>
        <span className="term-line">  <span className="term-key">"role"</span>: <span className="term-string">"backend developer"</span>,</span>
        <span className="term-line">  <span className="term-key">"focus"</span>: [<span className="term-string">"systems"</span>, <span className="term-string">"AI"</span>],</span>
        <span className="term-line">  <span className="term-key">"stack"</span>: [<span className="term-string">"python"</span>, <span className="term-string">"django"</span>, <span className="term-string">"react"</span>],</span>
        <span className="term-line">  <span className="term-key">"learning"</span>: <span className="term-num">true</span>,</span>
        <span className="term-line">  <span className="term-key">"available"</span>: <span className="term-num">true</span></span>
        <span className="term-line">{`}`}</span>
        <span className="term-line">&nbsp;</span>
        <span className="term-line"><span className="term-prompt">$</span> uptime</span>
        <span className="term-line"><span className="term-comment"># 3+ years · still curious</span></span>
        <span className="term-line">&nbsp;</span>
        <span className="term-line"><span className="term-prompt">$</span> <span className="term-cursor" /></span>
      </div>
    </div>
  );
}

// ── hero ──
function Hero({ t }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <Reveal>
              <div className="hero-status">
                <span className="hero-status-dot" />
                <span>{t.hero.status}</span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="hero-role">{t.hero.role}</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="hero-name">
                {t.hero.name}
                <span className="hero-name-accent">_dev</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="hero-tagline">{t.hero.tagline}</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="hero-desc">{t.hero.description}</p>
            </Reveal>
            <Reveal delay={280}>
              <div className="hero-ctas">
                <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
                  {t.hero.cta1} <span className="btn-arrow">→</span>
                </button>
                <button className="btn" onClick={() => scrollTo("contact")}>
                  {t.hero.cta2}
                </button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <HeroTerminal />
          </Reveal>
        </div>
        <Reveal delay={350}>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-v">99.9%</div>
              <div className="hero-stat-l">{t.hero.uptime}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-v">∞ ml</div>
              <div className="hero-stat-l">{t.hero.coffee}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-v">~2.4k</div>
              <div className="hero-stat-l">{t.hero.lines}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── sobre ──
function About({ t }) {
  return (
    <section className="section" id="about">
      <span className="crosshair tl" />
      <span className="crosshair tr" />
      <div className="container">
        <Reveal>
          <div className="section-label">{t.about.label}</div>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>{t.about.heading}</h2>
          </Reveal>
          <div>
            <Reveal delay={80}>
              <div className="about-text">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="about-stats">
                {t.about.stats.map((s, i) => (
                  <div key={i} className="about-stat">
                    <div className="about-stat-v">{s.v}</div>
                    <div className="about-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── habilidades ──
function Skills({ t }) {
  return (
    <section className="section" id="skills">
      <span className="crosshair tl" />
      <span className="crosshair tr" />
      <div className="container">
        <Reveal>
          <div className="section-label">{t.skills.label}</div>
        </Reveal>
        <Reveal>
          <h2 className="section-heading">{t.skills.heading}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="skills-grid">
            {t.skills.groups.map((g, i) => (
              <div key={i} className="skill-group">
                <div className="skill-group-title">{g.title}</div>
                <div className="skill-list">
                  {g.items.map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── projetos ──
function Projects({ t }) {
  return (
    <section className="section" id="projects">
      <span className="crosshair tl" />
      <span className="crosshair tr" />
      <div className="container">
        <Reveal>
          <div className="section-label">{t.projects.label}</div>
        </Reveal>
        <Reveal>
          <h2 className="section-heading">{t.projects.heading}</h2>
        </Reveal>
        <div className="projects-grid">
          {t.projects.list.map((p, i) => (
            <Reveal key={i} delay={i * 60} as="self">
              <article className={`proj-card${p.featured ? " featured" : ""}`}>
                <div className="proj-head">
                  <span className="proj-tag">
                    {p.featured && "★ "}{p.tag}
                  </span>
                  <span className="proj-num">0{i + 1}</span>
                </div>
                <h3 className="proj-name">{p.name}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map((tc) => (
                    <span key={tc} className="proj-tech-chip">{tc}</span>
                  ))}
                </div>
                <div className="proj-foot">
                  <a className="proj-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    {t.projects.view} <span>→</span>
                  </a>
                  <Icon name="code" size={14} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── linha do tempo ──
function Timeline({ t }) {
  return (
    <section className="section" id="timeline">
      <span className="crosshair tl" />
      <span className="crosshair tr" />
      <div className="container">
        <Reveal>
          <div className="section-label">{t.timeline.label}</div>
        </Reveal>
        <Reveal>
          <h2 className="section-heading">{t.timeline.heading}</h2>
        </Reveal>
        <div className="timeline">
          {t.timeline.items.map((it, i) => (
            <Reveal key={i} delay={i * 80} as="self">
              <div className="tl-item">
                <div className="tl-year">{it.year}</div>
                <div>
                  <h3 className="tl-title">{it.title}</h3>
                  <div className="tl-sub">{it.sub}</div>
                  <div className="tl-body">{it.body}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── contato ──
function Contact({ t }) {
  const [copied, setCopied] = useState(false);
  const email = "juanoliveira549@gmail.com";
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className="section" id="contact">
      <span className="crosshair tl" />
      <span className="crosshair tr" />
      <div className="container">
        <Reveal>
          <div className="section-label">{t.contact.label}</div>
        </Reveal>
        <div className="contact-grid">
          <div>
            <Reveal>
              <h2 className="section-heading">{t.contact.heading}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="contact-sub">{t.contact.sub}</p>
            </Reveal>
            <Reveal delay={140}>
              <a className="btn btn-primary" href={`mailto:${email}`}>
                <Icon name="mail" /> {t.contact.cta} <span className="btn-arrow">→</span>
              </a>
            </Reveal>
          </div>
          <div className="contact-card">
            <div className="contact-row">
              <span className="contact-row-l"><Icon name="mail" /> email</span>
              <a className="contact-row-v" href={`mailto:${email}`}>{email}</a>
              <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copyEmail}>
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>
            <div className="contact-row">
              <span className="contact-row-l"><Icon name="github" /> github</span>
              <a className="contact-row-v" href="https://github.com/JuanMarques1" target="_blank" rel="noopener noreferrer">
                /JuanMarques1
              </a>
            </div>
            <div className="contact-row">
              <span className="contact-row-l"><Icon name="linkedin" /> linkedin</span>
              <a className="contact-row-v" href="https://www.linkedin.com/in/juan-oliveira-marques/" target="_blank" rel="noopener noreferrer">/juan-oliveira-marques</a>
            </div>
            <div className="contact-row">
              <span className="contact-row-l">status</span>
              <span className="contact-row-v" style={{ color: "var(--green)" }}>● aceitando projetos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── rodapé ──
function Footer({ t }) {
  return (
    <footer className="container">
      <div className="footer">
        <div>
          © 2026 Juan Oliveira Marques · {t.footer.built} <span style={{ color: "var(--accent)" }}>React</span> {t.footer.and} <span style={{ color: "var(--accent)" }}>CSS</span>
        </div>
        <div className="footer-hint">{t.footer.hint}</div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Icon, Reveal, Navbar, Hero, About, Skills, Projects, Timeline, Contact, Footer,
});
