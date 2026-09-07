"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioConfig as config, capabilities, testimonials } from "./portfolio-config";

import { featuredProjects, archive, uiShowcase } from "./portfolio-projects";
import { loadYouTubeAPI, type PreviewPlayer } from "./youtube-api";

type SystemPreviewProps = {
  number: string;
  title: string;
  video: string;
  onOpen: () => void;
  paused: boolean;
  isPlaying: boolean;
};

function SystemPreview({ number, title, video, onOpen, paused, isPlaying }: SystemPreviewProps) {
  const playerHost = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PreviewPlayer | null>(null);
  const pauseRef = useRef(paused);

  useEffect(() => {
    pauseRef.current = paused;
    const player = playerRef.current;
    if (!player) return;
    if (paused) player.pauseVideo();
    else player.playVideo();
  }, [paused]);

  useEffect(() => {
    const host = playerHost.current;
    if (!isPlaying || !host) return;
    let cancelled = false;
    let player: PreviewPlayer | undefined;
    // The iframe remains mounted while scrolling, pausing, or opening a demo.
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${video}` +
      `?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}` +
      `&autoplay=${pauseRef.current ? 0 : 1}&mute=1&loop=1&playlist=${video}&controls=0&rel=0&playsinline=1&disablekb=1`;
    iframe.title = `${title} autoplay preview`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.tabIndex = -1;
    host.append(iframe);
    void loadYouTubeAPI().then(api => {
      if (cancelled) return;
      player = new api.Player(iframe, {
        events: {
          onReady: event => {
            if (cancelled) return;
            playerRef.current = event.target;
            event.target.mute();
            if (pauseRef.current) event.target.pauseVideo();
            else event.target.playVideo();
          },
          onStateChange: event => {
            if (cancelled || pauseRef.current) return;
            if (event.data === 0) {
              event.target.seekTo(0, true);
              event.target.playVideo();
            }
          },
        },
      });
    }).catch(() => {
      // The original muted looping embed still works if the controls API fails.
    });
    return () => {
      cancelled = true;
      playerRef.current = null;
      player?.destroy();
      host.replaceChildren();
    };
  }, [isPlaying, video, title]);

  return (
    <div className="project-media">
      <img src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
      <div ref={playerHost} />
      <span className="media-shade" aria-hidden="true" />
      <button className="project-preview-button" type="button" onClick={onOpen} aria-label={`Watch ${title} with sound`}>
        <span className="play-button">VIEW WITH SOUND <b>▶</b></span>
        <span className="project-number">{number}</span>
      </button>
    </div>
  );
}

export default function Home() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [showcasePlaying, setShowcasePlaying] = useState(false);
  const [previewsPaused, setPreviewsPaused] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;
    // Warm up all nine players before arrival and retain them for this page visit.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowcasePlaying(true);
        observer.disconnect();
      }
    }, { rootMargin: "1200px 0px", threshold: 0 });
    observer.observe(showcase);
    return () => {
      observer.disconnect();
    };
  }, []);

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

    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(config.DISCORD_USERNAME);
      setCopyStatus("Username copied.");
    } catch {
      setCopyStatus(`Copy manually: ${config.DISCORD_USERNAME}`);
    }
  }

  return (
    <>
    <a className="skip-link" href="#work">Skip to projects</a>
    <main id="top">
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Renolicious home">
          <span className="brand-mark">R</span>
          <span>RENOLICIOUS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#build">Capabilities</a>
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
          <span className="eyebrow"><i /> Currently available for work</span>
          <span className="hero-index">Portfolio / 2026</span>
        </div>
        <h1 id="hero-title">
          <span>I BUILD THE</span>
          <span className="outline">SYSTEMS BEHIND</span>
          <span>GREAT GAMES</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-description"><p className="hero-promise">I build complete, production-ready Roblox games and systems.</p><p>From backend architecture and gameplay to polished UI, tweening, GFX, monetization, and optimization.</p></div>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View projects <span>↓</span></a>
            <a className="text-link" href="#contact">Hire me <span>↗</span></a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Experience and availability">
          <div><strong>{config.YEARS_EXPERIENCE}<small> Years</small></strong><span>Experience</span></div>
          <div><strong>{config.DAILY_AVAILABILITY}</strong><span>Availability for active projects</span></div>
          <div><strong>{config.CLIENT_WORK_VALUE}</strong><span>Client work <small>· Past 2 weeks</small></span></div>
          <div><strong>{config.PROJECT_COUNT}</strong><span>Projects completed <small>· This month</small></span></div>
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

      <section className="work" id="work">
        <div className="section-heading section-shell" data-reveal>
          <span className="section-label">01 / Selected work</span>
          <div>
            <h2>PROVEN SYSTEMS.<br /><em>REAL GAMEPLAY.</em></h2>
            <p>{featuredProjects.length} featured builds. {featuredProjects.length + archive.length} systems to explore. Every one made to solve a real gameplay problem.</p>
          </div>
        </div>

        <div className="showcase-controls section-shell">
          <button className="project-link" type="button" onClick={() => setPreviewsPaused(value => !value)}>
            {previewsPaused ? "Play previews ▶" : "Pause previews Ⅱ"}
          </button>
        </div>
        <div className="project-list" ref={showcaseRef}>
          {featuredProjects.map((project) => (
            <article className={`project project-${project.accent}`} key={project.number} data-reveal>
              <SystemPreview
                paused={Boolean(activeVideo) || previewsPaused}
                isPlaying={showcasePlaying}
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
                <button className="project-link" type="button" onClick={() => setActiveVideo({ id: project.video, title: project.title })}>Watch demo <span>▶</span></button>
              </div>
            </article>
          ))}
        </div>

        <div className="archive section-shell" data-reveal>
          <div className="archive-heading">
            <span className="section-label">More systems / 10—14</span>
            <p>Five more builds across AI, UI, equipment, game flow, and vehicles.</p>
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

      <section className="build-section section-shell" id="build" aria-labelledby="build-title">
        <div className="section-heading" data-reveal>
          <span className="section-label">02 / Capabilities</span>
          <div><h2 id="build-title">WHAT I CAN<br /><em>BUILD.</em></h2><p>A single mechanic or a complete game. Client and server, connected from the start.</p></div>
        </div>
        <div className="capability-grid">
          {capabilities.map((group, index) => <article className="capability-card" key={group.title} data-reveal>
            <span className="capability-index">{String(index + 1).padStart(2, "0")} /</span>
            <h3>{group.title}</h3><p>{group.description}</p>
            <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
          </article>)}
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

      <section className="intro section-shell" data-reveal>
        <div>
          <span className="section-label">04 / Why hire me</span>
        </div>
        <div className="intro-copy">
          <p className="display-copy">I turn ambitious Roblox ideas into <em>clean, reliable systems.</em></p>
          <div className="intro-meta">
            <p>From a single gameplay mechanic to a connected framework, every build is structured to be readable, secure, and ready to expand.</p>
            <div className="verified"><span>●</span><div><small>Roblox creator</small><strong>stinkybumgamer</strong></div></div>
          </div>
        </div>
      </section>

      <section className="why-grid section-shell" aria-label="Why work with me">
        {[
          ["Full-stack ownership", "Gameplay, backend, UI, and client-side polish built as one connected experience."],
          ["Time for your project", `${config.YEARS_EXPERIENCE} years of experience, with up to ${config.DAILY_AVAILABILITY} available for active projects. Short-term and long-term work.`],
          ["Architecture that grows", "Modular Luau, persistent data, server-side validation, and exploit-resistant systems designed for expansion."],
          ["A clean fit for your game", "Existing codebase integration, advanced tweening, debugging, testing, and performance optimization."]
        ].map(([title, description], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
      </section>

      {testimonials.length > 0 && <section className="testimonials section-shell" aria-labelledby="testimonials-title">
        <h2 id="testimonials-title">Client feedback</h2>
        <div className="why-grid">{testimonials.map(item => <figure key={item.name + item.project}><blockquote>{item.quote}</blockquote><figcaption>{item.name} · {item.project}</figcaption></figure>)}</div>
      </section>}

      <section className="process section-shell" data-reveal>
        <div className="process-heading">
          <span className="section-label">05 / Process</span>
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
          <span className="section-label section-label-light">06 / Start a project</span>
          <h2>HAVE A ROBLOX<br />GAME YOU NEED<br /><em>BUILT?</em></h2>
          <div className="contact-grid">
            <div className="contact-copy"><p>Send me your scope, budget, and deadline and let&apos;s discuss the project.</p><span className="availability"><i /> Currently available for work</span><p className="contact-availability">Up to {config.DAILY_AVAILABILITY} for active projects.</p></div>
            <div className="discord-card">
              <span>Discord username</span>
              <strong>{config.DISCORD_USERNAME}</strong>
              <button type="button" onClick={copyDiscord}>Copy username</button>
              <span className="copy-status" role="status">{copyStatus}</span>
            </div>
            <a className="contact-arrow" href="https://discord.com/app" target="_blank" rel="noreferrer" aria-label="Open Discord">↗</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">R</span><span>RENOLICIOUS</span></a>
        <p>Full-Stack Roblox Developer · Built for performance and scale.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>

    {activeVideo && (
      <dialog ref={dialogRef} className="video-modal" aria-modal="true" aria-labelledby={`video-title-${activeVideo.id}`} onCancel={() => setActiveVideo(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveVideo(null); }}>
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
          <a className="video-fallback" href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
        </div>
      </dialog>
    )}
    </>
  );
}
