"use client";

import { useState } from "react";

const projects = [
  {
    id: "Qrjb1roJoBU",
    title: "Boss Fight + Parry System",
    eyebrow: "Combat / Boss AI",
    description:
      "A complete boss encounter built around responsive parry timing and readable combat flow. This system demonstrates boss attack logic, defensive timing windows, combat feedback, and the encounter design needed to make a high-stakes fight feel fair and satisfying.",
    skills: ["Boss encounters", "Parry mechanics", "Combat feedback"],
  },
  {
    id: "tc7lUxgfz0Q",
    title: "Data Saving System + Inventory System",
    eyebrow: "Persistence / Inventory",
    description:
      "A dependable player-data foundation paired with a structured inventory flow. This project demonstrates clean data organization, reliable saving and loading, and synchronized item state built for games that need long-term progression.",
    skills: ["Data persistence", "Inventory architecture", "Client/server sync"],
  },
  {
    id: "nNdAh53DC7M",
    title: "Working Vehicle + Gear Framework",
    eyebrow: "Vehicles / Equipment",
    description:
      "A reusable framework for drivable vehicles and functional gear. It highlights modular gameplay architecture, responsive controls, equipment state handling, and systems that can be expanded without rebuilding the foundation.",
    skills: ["Vehicle systems", "Gear framework", "Reusable modules"],
  },
  {
    id: "hCqlQ7YgMXs",
    title: "Dynamic Quest + Money Framework",
    eyebrow: "Quests / Economy",
    description:
      "A configurable quest and currency loop that tracks objectives, rewards players, and updates progression dynamically. It showcases economy design, event-driven logic, and flexible content systems for repeatable gameplay.",
    skills: ["Quest progression", "Currency systems", "Reward logic"],
  },
  {
    id: "xcOu7b0e5jM",
    title: "Modular AI + Aggro System Framework",
    eyebrow: "AI / Combat",
    description:
      "A modular NPC framework with target detection and aggro behavior. This build demonstrates state-based AI, reusable enemy logic, combat targeting, and an architecture designed for adding new behaviors efficiently.",
    skills: ["NPC state logic", "Aggro targeting", "Modular AI"],
  },
  {
    id: "ke1Bhn0ZGGc",
    title: "Player Movement System",
    eyebrow: "Movement / Character",
    description:
      "A responsive custom movement controller focused on player feel. The system demonstrates character-state management, input handling, movement transitions, and the polish required to make moment-to-moment gameplay feel intentional.",
    skills: ["Character controller", "Input handling", "Movement states"],
  },
  {
    id: "cZyyWepvBCc",
    title: "Looting + Accessory + Backpack System",
    eyebrow: "Loot / Equipment",
    description:
      "An interconnected item flow covering world looting, accessories, and backpack management. It advertises strong system integration: collecting items, equipping them, updating inventory state, and keeping the player experience consistent.",
    skills: ["Loot interactions", "Equipment logic", "Backpack flow"],
  },
  {
    id: "UGyoDSMMh-4",
    title: "Chest + RNG System",
    eyebrow: "Rewards / RNG",
    description:
      "A chest-opening system powered by weighted random rewards and rarity tiers. This project shows probability design, reward-table organization, server-authoritative outcomes, and a satisfying progression hook.",
    skills: ["Weighted RNG", "Rarity tables", "Reward systems"],
  },
  {
    id: "coa5FW_ExA8",
    title: "Round System Manager",
    eyebrow: "Rounds / Game Flow",
    description:
      "A complete match lifecycle controller that moves players through waiting, active rounds, results, and resets. It demonstrates timers, state-machine thinking, player orchestration, and reliable cleanup between sessions.",
    skills: ["Match lifecycle", "State management", "Round cleanup"],
  },
  {
    id: "m_zlT-_N4i4",
    title: "Progressive Rebirth System",
    eyebrow: "Progression / Prestige",
    description:
      "A scalable rebirth loop with progressive requirements and meaningful rewards. It highlights long-term progression design, multiplier logic, persistent growth, and balancing-friendly configuration.",
    skills: ["Progression loops", "Scaling formulas", "Persistent upgrades"],
  },
  {
    id: "CeejJBcooHs",
    title: "Pet + Egg Rarity + Hatching System",
    eyebrow: "Pets / Collection",
    description:
      "A collection framework combining eggs, weighted pet rarities, and the hatching flow. This system demonstrates configurable content, collection management, probability logic, and economy-ready reward mechanics.",
    skills: ["Pet collection", "Hatching logic", "Rarity balancing"],
  },
  {
    id: "3amMD4wfaNc",
    title: "Helicopter Framework",
    eyebrow: "Flight / Vehicles",
    description:
      "A reusable helicopter controller built around responsive flight input and stable vehicle behavior. It showcases advanced vehicle scripting, coordinated movement logic, and a framework that can support multiple aircraft.",
    skills: ["Flight controls", "Vehicle physics", "Framework design"],
  },
] as const;

const services = [
  "Gameplay systems",
  "Persistent data",
  "AI & NPC logic",
  "Economy design",
  "Vehicle frameworks",
  "System optimization",
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText("renolicious");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Renolicious home">
          <span className="wordmark-mark">R</span>
          <span>RENOLICIOUS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Hire me <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="kicker"><span /> Roblox systems developer</p>
          <h1>
            ROBLOX
            <span>SYSTEMS.</span>
            BUILT TO SCALE.
          </h1>
          <p className="hero-intro">
            I build reliable, modular Roblox gameplay systems—from persistent
            inventories and AI to vehicles, progression, and full game loops.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#contact">Available for commissions ↗</a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Portfolio overview">
          <div className="panel-status"><span /> Available for new projects</div>
          <div className="hero-stat">
            <strong>12</strong>
            <span>systems showcased</span>
          </div>
          <div className="panel-line" />
          <div className="panel-meta">
            <span>Focus</span>
            <strong>Roblox / Luau</strong>
          </div>
          <div className="panel-meta">
            <span>Specialty</span>
            <strong>Scalable frameworks</strong>
          </div>
        </div>

        <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
          <span>Scroll to work</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="services-strip" id="services" aria-label="Services">
        <p>Capabilities</p>
        <div className="service-list">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="kicker"><span /> Selected work</p>
            <h2>PROVEN SYSTEMS.<br /><em>REAL GAMEPLAY.</em></h2>
          </div>
          <p>
            Twelve working systems demonstrating the architecture, game logic,
            and player-focused thinking I bring to Roblox projects.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <div className="video-shell">
                <div className="video-topline">
                  <span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
                  <span>WATCH DEMO</span>
                </div>
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${project.id}?rel=0&modestbranding=1`}
                    title={`${project.title} video demonstration`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="project-copy">
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="skill-tags" aria-label="Skills demonstrated">
                  {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                <a
                  className="watch-link"
                  href={`https://youtu.be/${project.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on YouTube <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hire-process" aria-labelledby="hire-title">
        <div>
          <p className="kicker"><span /> Simple process</p>
          <h2 id="hire-title">FROM BRIEF<br />TO <em>BUILD.</em></h2>
        </div>
        <ol>
          <li><span>01</span><div><strong>Send the scope</strong><p>Tell me what system you need, your game genre, timeline, and any references.</p></div></li>
          <li><span>02</span><div><strong>Plan the framework</strong><p>We align on features, milestones, and how the system fits your existing game.</p></div></li>
          <li><span>03</span><div><strong>Build & deliver</strong><p>I create the system, test the core flow, and provide a clean handoff.</p></div></li>
        </ol>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <p className="kicker light"><span /> Let&apos;s build something</p>
        <h2>HAVE A SYSTEM<br />IN MIND?</h2>
        <p className="contact-lead">
          I&apos;m available for Roblox scripting commissions, custom frameworks,
          and gameplay-system development. The fastest way to reach me is Discord.
        </p>

        <div className="discord-card">
          <div className="discord-icon" aria-hidden="true">#</div>
          <div className="discord-details">
            <span>Discord username</span>
            <strong>renolicious</strong>
          </div>
          <button type="button" onClick={copyDiscord} aria-live="polite">
            {copied ? "Copied!" : "Copy username"}
          </button>
          <a href="https://discord.com/app" target="_blank" rel="noreferrer">
            Open Discord <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="contact-note">When you message me, include your project idea, budget range, and ideal deadline.</p>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          <span className="wordmark-mark">R</span>
          <span>RENOLICIOUS</span>
        </a>
        <p>Roblox systems developer · Built for performance and scale.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
