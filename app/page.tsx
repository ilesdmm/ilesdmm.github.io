"use client";

import { useEffect, useRef, useState } from "react";

const featuredProjects = [
  {
    number: "01",
    title: "Full FPS Game",
    category: "Commissioned solo build",
    description:
      "A complete commissioned experience built end to end—from systems and animation to UI, gameplay, and both sides of the stack.",
    skills: ["Solo development", "Gameplay systems", "UI + animation"],
    video: "uxHYi6nJZbA",
    accent: "dark",
  },
  {
    number: "02",
    title: "Pet Hatching & Collection System",
    category: "Pets · RNG · Collection",
    description:
      "A weighted reward framework with responsive hatching, persistent collection state, and architecture built to grow with a live game.",
    skills: ["Weighted RNG", "Collection state", "Scalable modules"],
    video: "RguPZ3K_T94",
    accent: "dark",
  },
  {
    number: "03",
    title: "Boss Fight System",
    category: "Combat · Boss AI",
    description:
      "A high-stakes encounter focused on readable attack logic, precise parry windows, combat feedback, and a fair player experience.",
    skills: ["Boss logic", "Parry timing", "Combat feedback"],
    video: "UwSvlbf52wE",
    accent: "dark",
  },
  {
    number: "04",
    title: "Dynamic Movement System",
    category: "Movement · Character",
    description:
      "A responsive character controller with dynamic locomotion, polished transitions, and movement states built for fluid gameplay.",
    skills: ["Movement states", "Responsive controls", "Animation flow"],
    video: "Nghd8kI_ICA",
    accent: "dark",
  },
  {
    number: "05",
    title: "Parry System",
    category: "Combat · Defense",
    description:
      "A responsive parry framework with precise timing windows, combat feedback, and reliable server-side validation.",
    skills: ["Parry windows", "Combat feedback", "Server validation"],
    video: "Xc5ziaTrDrM",
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
    accent: "dark",
  },
];

const archive = [
  ["07", "Modular AI + Aggro", "AI · Combat", "xcOu7b0e5jM"],
  ["08", "Inventory UI Framework", "Inventory · UI", "0Tv6my4FM0w"],
  ["09", "Quest + Money Framework", "Quests · Economy", "hCqlQ7YgMXs"],
  ["10", "Player Movement System", "Movement · Character", "ke1Bhn0ZGGc"],
  ["11", "Looting + Backpack", "Loot · Equipment", "cZyyWepvBCc"],
  ["12", "Chest + RNG System", "Rewards · RNG", "UGyoDSMMh-4"],
  ["13", "Round System Manager", "Rounds · Game flow", "coa5FW_ExA8"],
  ["14", "Progressive Rebirth", "Progression · Prestige", "m_zlT-_N4i4"],
  ["15", "Helicopter Framework", "Flight · Vehicles", "3amMD4wfaNc"],
];

const uiShowcase = [
  {
    number: "01",
    title: "Rebirth interface",
    detail: "Progression UI · Custom icon set",
    image: "/ui-gfx/rebirth-interface.png",
  },
  {
    number: "02",
    title: "Skins shop",
    detail: "Storefront UI · Custom icon set",
    image: "/ui-gfx/skins-interface.png",
  },
  {
    number: "03",
    title: "Jump upgrades",
    detail: "Upgrade UI · Custom icon set",
    image: "/ui-gfx/jump-upgrades-interface.png",
  },
  {
    number: "04",
    title: "Fantasy portfolio UI",
    detail: "Visual direction · Interface design",
    image: "/ui-gfx/portfolio-interface.png",
  },
];

type SystemPreviewProps = {
  number: string;
  title: string;
  video: string;
  onOpen: () => void;
};

function SystemPreview({ number, title, video, onOpen }: SystemPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPlaying(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0.18 },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  const autoplayUrl =
    `https://www.youtube-nocookie.com/embed/${video}` +
    `?autoplay=1&mute=1&loop=1&playlist=${video}&controls=0&rel=0&playsinline=1&disablekb=1`;

  return (
    <div className="project-media" ref={previewRef}>
      {isPlaying ? (
        <iframe
          src={autoplayUrl}
          title={`${title} autoplay preview`}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="lazy"
          tabIndex={-1}
        />
      ) : (
        <img src={`https://i.ytimg.com/vi/${video}/maxresdefault.jpg`} alt="" />
      )}
      <span className="media-shade" aria-hidden="true" />
      <button className="project-preview-button" type="button" onClick={onOpen} aria-label={`Watch ${title} with sound`}>
        <span className="play-button">VIEW WITH SOUND <b>▶</b></span>
        <span className="project-number">{number}</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

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

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  async function copyDiscord() {
    await navigator.clipboard.writeText("renolicious");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
    <main id="top">
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Renolicious home">
          <span className="brand-mark">R</span>
          <span>RENOLICIOUS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">UI / GFX</a>
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
          <div><strong>15</strong><span>Systems<br />showcased</span></div>
          <div><strong>100%</strong><span>Custom<br />Luau work</span></div>
          <div><strong>FULL</strong><span>Stack Roblox<br />development</span></div>
          <div className="hero-scroll"><span>Scroll to enter</span><b>↓</b></div>
        </div>
      </section>

      <section className="ticker" aria-label="Core disciplines">
  <div className="ticker-track">

    <div className="ticker-group">
      <span>GAMEPLAY SYSTEMS</span>
      <i>◆</i>

      <span>MODULAR LUAU</span>
      <i>◆</i>

      <span>AI FRAMEWORKS</span>
      <i>◆</i>

      <span>PLAYER DATA</span>
      <i>◆</i>

      <span>CORE SYSTEMS</span>
      <i>◆</i>
    </div>

    <div className="ticker-group" aria-hidden="true">
      <span>GAMEPLAY SYSTEMS</span>
      <i>◆</i>

      <span>MODULAR LUAU</span>
      <i>◆</i>

      <span>AI FRAMEWORKS</span>
      <i>◆</i>

      <span>PLAYER DATA</span>
      <i>◆</i>

      <span>CORE SYSTEMS</span>
      <i>◆</i>
    </div>

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
            <p>Six featured builds. Fifteen systems in total. Every one made to solve a real gameplay problem.</p>
          </div>
        </div>

        <div className="project-list">
          {featuredProjects.map((project) => (
            <article className={`project project-${project.accent}`} key={project.number} data-reveal>
              <SystemPreview
                number={project.number}
                title={project.title}
                video={project.video}
                onOpen={() => setActiveVideo({ id: project.video, title: project.title })}
              />
              <div className="project-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul aria-label="Skills demonstrated">
                  {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                <button className="project-link" type="button" onClick={() => setActiveVideo({ id: project.video, title: project.title })}>Watch here <span>▶</span></button>
              </div>
            </article>
          ))}
        </div>

        <div className="archive section-shell" data-reveal>
          <div className="archive-heading">
            <span className="section-label">More systems / 07—15</span>
            <p>Nine more builds across AI, UI, progression, movement, rewards, and vehicles.</p>
          </div>
          <div className="archive-list">
            {archive.map(([number, title, category, video]) => (
              <button key={number} type="button" onClick={() => setActiveVideo({ id: video, title })} aria-label={`Watch ${title} on this page`}>
                <span>{number}</span><strong>{title}</strong><em>{category}</em><b>▶</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-gfx" id="capabilities">
        <div className="ui-gfx-inner section-shell">
          <div className="ui-gfx-heading" data-reveal>
            <span className="section-label">03 / UI + GFX</span>
            <div>
              <p className="ui-gfx-kicker">UI / GFX ARTIST</p>
              <h2>DESIGNED TO<br /><em>FEEL ALIVE.</em></h2>
              <p className="ui-gfx-intro">
                I design game interfaces from first icon to final interaction. Every icon shown here is custom-made, and I&apos;m highly skilled at advanced tweening that makes menus feel responsive, polished, and satisfying to use.
              </p>
            </div>
          </div>

          <div className="ui-gfx-strengths" aria-label="UI and GFX strengths" data-reveal>
            <article>
              <span>01</span>
              <strong>Custom icons</strong>
              <p>Every icon is drawn for the interface—no stock icon packs or mismatched visual language.</p>
            </article>
            <article>
              <span>02</span>
              <strong>UI / GFX design</strong>
              <p>Clear hierarchy, bold art direction, and game-ready layouts built around the player experience.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Advanced tweening</strong>
              <p>Confident motion work for menus, feedback states, transitions, and interactions that feel alive.</p>
            </article>
          </div>

          <div className="ui-gfx-gallery">
            {uiShowcase.map((project) => (
              <figure className="ui-gfx-card" key={project.number} data-reveal>
                <div className="ui-gfx-image">
                  <img src={project.image} alt={`${project.title} Roblox interface designed by Renolicious`} loading="lazy" />
                  <span>{project.number}</span>
                </div>
                <figcaption>
                  <strong>{project.title}</strong>
                  <span>{project.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
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

    {activeVideo && (
      <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby={`video-title-${activeVideo.id}`} onClick={() => setActiveVideo(null)}>
        <div className="video-modal-panel" onClick={(event) => event.stopPropagation()}>
          <div className="video-modal-header">
            <div>
              <span>Now playing</span>
              <h2 id={`video-title-${activeVideo.id}`}>{activeVideo.title}</h2>
            </div>
            <button type="button" onClick={() => setActiveVideo(null)} aria-label="Close video" autoFocus>Close ×</button>
          </div>
          <div className="video-player">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              title={`${activeVideo.title} video demonstration`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )}
    </>
  );
}
