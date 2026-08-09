"use client";

import { useEffect, useState } from "react";

const featuredProjects = [
  {
    number: "01",
    title: "DeadShot Project",
    category: "Commissioned solo build",
    description:
      "A complete commissioned experience built end to end—from systems and animation to UI, gameplay, and both sides of the stack.",
    skills: ["Solo development", "Gameplay systems", "UI + animation"],
    video: "uxHYi6nJZbA",
    accent: "red",
  },
  {
    number: "02",
    title: "Scalable Egg RNG",
    category: "Pets · RNG · Collection",
    description:
      "A weighted reward framework with responsive hatching, persistent collection state, and architecture built to grow with a live game.",
    skills: ["Weighted RNG", "Collection state", "Scalable modules"],
    video: "RguPZ3K_T94",
    accent: "dark",
  },
  {
    number: "03",
    title: "Boss Fight + Parry",
    category: "Combat · Boss AI",
    description:
      "A high-stakes encounter focused on readable attack logic, precise parry windows, combat feedback, and a fair player experience.",
    skills: ["Boss logic", "Parry timing", "Combat feedback"],
    video: "Qrjb1roJoBU",
    accent: "dark",
  },
  {
    number: "04",
    title: "Inventory + Data",
    category: "Persistence · Inventory",
    description:
      "A dependable player-data foundation with structured inventory state, reliable saves, and clean client/server synchronization.",
    skills: ["Data persistence", "Inventory architecture", "State sync"],
    video: "tc7lUxgfz0Q",
    accent: "red",
  },
  {
    number: "05",
    title: "Modular AI + Aggro",
    category: "AI · Combat",
    description:
      "Reusable NPC intelligence with target detection, aggro behavior, state-driven decisions, and an extensible enemy framework.",
    skills: ["NPC states", "Aggro targeting", "Modular AI"],
    video: "xcOu7b0e5jM",
    accent: "dark",
  },
  {
    number: "06",
    title: "Vehicle + Gear",
    category: "Vehicles · Equipment",
    description:
      "A reusable foundation for responsive vehicles and functional gear with modular controls and reliable equipment state.",
    skills: ["Vehicle systems", "Gear framework", "Reusable modules"],
    video: "nNdAh53DC7M",
    accent: "red",
  },
];

const archive = [
  ["07", "Inventory UI Framework", "Inventory · UI", "0Tv6my4FM0w"],
  ["08", "Quest + Money Framework", "Quests · Economy", "hCqlQ7YgMXs"],
  ["09", "Player Movement System", "Movement · Character", "ke1Bhn0ZGGc"],
  ["10", "Looting + Backpack", "Loot · Equipment", "cZyyWepvBCc"],
  ["11", "Chest + RNG System", "Rewards · RNG", "UGyoDSMMh-4"],
  ["12", "Round System Manager", "Rounds · Game flow", "coa5FW_ExA8"],
  ["13", "Progressive Rebirth", "Progression · Prestige", "m_zlT-_N4i4"],
  ["14", "Helicopter Framework", "Flight · Vehicles", "3amMD4wfaNc"],
];

const capabilities = [
  ["01", "Gameplay systems", "Combat, movement, quests, rounds, rewards and the moment-to-moment logic players feel."],
  ["02", "Persistent data", "Reliable player profiles, inventories, progression and secure client/server synchronization."],
  ["03", "AI + NPC logic", "State-driven enemies, targeting, aggro behavior and reusable decision frameworks."],
  ["04", "Economy design", "Currencies, weighted rewards, rebirth loops and systems tuned for long-term play."],
  ["05", "Vehicle frameworks", "Responsive ground and air vehicles built around stable, extensible control systems."],
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? (window.scrollY / available) * 100 : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  async function copyDiscord() {
    await navigator.clipboard.writeText("renolicious");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main id="top">
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Renolicious home">
          <span className="brand-mark">R</span>
          <span>RENOLICIOUS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start a project <span>↗</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-topline">
          <span className="eyebrow"><i /> Roblox systems developer</span>
          <span className="hero-index">Portfolio / 2026</span>
        </div>
        <h1 id="hero-title">
          <span>I BUILD THE</span>
          <span className="outline">SYSTEMS BEHIND</span>
          <span>GREAT GAMES.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            Modular Roblox systems engineered for performance, scale, and the kind of gameplay players come back to.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore the work <span>↓</span></a>
            <a className="text-link" href="#contact">Available for commissions <span>↗</span></a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Portfolio overview">
          <div><strong>14</strong><span>Systems<br />showcased</span></div>
          <div><strong>100%</strong><span>Custom<br />Luau work</span></div>
          <div><strong>FULL</strong><span>Stack Roblox<br />development</span></div>
          <div className="hero-scroll"><span>Scroll to enter</span><b>↓</b></div>
        </div>
      </section>

      <section className="ticker" aria-label="Core disciplines">
        <div className="ticker-track">
          <span>GAMEPLAY SYSTEMS</span><i>◆</i><span>MODULAR LUAU</span><i>◆</i><span>AI FRAMEWORKS</span><i>◆</i><span>PLAYER DATA</span><i>◆</i><span>GAMEPLAY SYSTEMS</span><i>◆</i><span>MODULAR LUAU</span><i>◆</i>
        </div>
      </section>

      <section className="intro section-shell" data-reveal>
        <div>
          <span className="section-label">01 / Profile</span>
        </div>
        <div className="intro-copy">
          <p className="display-copy">I turn ambitious Roblox ideas into <em>clean, reliable systems.</em></p>
          <div className="intro-meta">
            <p>From a single gameplay mechanic to a connected framework, every build is structured to be readable, secure, and ready to expand.</p>
            <div className="verified"><span>●</span><div><small>Verified creator</small><strong>stinkybumgamer</strong></div></div>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading section-shell" data-reveal>
          <span className="section-label">02 / Selected work</span>
          <div>
            <h2>PROVEN SYSTEMS.<br /><em>REAL GAMEPLAY.</em></h2>
            <p>Six featured builds. Fourteen systems in total. Every one made to solve a real gameplay problem.</p>
          </div>
        </div>

        <div className="project-list">
          {featuredProjects.map((project) => (
            <article className={`project project-${project.accent}`} key={project.number} data-reveal>
              <a className="project-media" href={`https://youtu.be/${project.video}`} target="_blank" rel="noreferrer" aria-label={`Watch ${project.title} on YouTube`}>
                <img src={`https://i.ytimg.com/vi/${project.video}/maxresdefault.jpg`} alt="" />
                <span className="media-shade" />
                <span className="play-button">PLAY <b>↗</b></span>
                <span className="project-number">/{project.number}</span>
              </a>
              <div className="project-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul aria-label="Skills demonstrated">
                  {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                <a className="project-link" href={`https://youtu.be/${project.video}`} target="_blank" rel="noreferrer">Watch case study <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>

        <div className="archive section-shell" data-reveal>
          <div className="archive-heading">
            <span className="section-label">More systems / 07—14</span>
            <p>Eight more builds across UI, progression, movement, rewards, and vehicles.</p>
          </div>
          <div className="archive-list">
            {archive.map(([number, title, category, video]) => (
              <a key={number} href={`https://youtu.be/${video}`} target="_blank" rel="noreferrer">
                <span>{number}</span><strong>{title}</strong><em>{category}</em><b>↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="capability-title section-shell" data-reveal>
          <span className="section-label section-label-light">03 / Capabilities</span>
          <h2>BUILT TO<br /><span>DO MORE.</span></h2>
        </div>
        <div className="capability-list section-shell">
          {capabilities.map(([number, title, description]) => (
            <article key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-shell" data-reveal>
        <div className="process-heading">
          <span className="section-label">04 / Process</span>
          <h2>FROM BRIEF<br />TO BUILD.</h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Send the scope</strong><p>Share the system, game genre, timeline, budget, and any useful references.</p></div></li>
          <li><span>02</span><div><strong>Plan the framework</strong><p>We align on the architecture, milestones, and fit with your existing game.</p></div></li>
          <li><span>03</span><div><strong>Build + deliver</strong><p>I develop the system, test the core flow, and provide a clean handoff.</p></div></li>
        </ol>
      </section>

      <section className="contact" id="contact">
        <div className="contact-noise" aria-hidden="true" />
        <div className="section-shell contact-inner" data-reveal>
          <span className="section-label section-label-light">05 / Start a project</span>
          <h2>LET&apos;S BUILD<br />SOMETHING<br /><em>SERIOUS.</em></h2>
          <div className="contact-grid">
            <p>Available for Roblox scripting commissions, custom frameworks, and gameplay-system development.</p>
            <div className="discord-card">
              <span>Discord username</span>
              <strong>renolicious</strong>
              <button type="button" onClick={copyDiscord}>{copied ? "Copied" : "Copy username"}</button>
            </div>
            <a className="contact-arrow" href="https://discord.com/app" target="_blank" rel="noreferrer" aria-label="Open Discord">↗</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">R</span><span>RENOLICIOUS</span></a>
        <p>Roblox systems developer · Built for performance and scale.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
