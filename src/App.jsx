import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Profile', href: '#profile' },
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#expertise' },
]

const experience = [
  {
    year: '2026',
    title: 'CoffeeHeart',
    detail: 'A personal interface lab for products, motion, and systems.',
  },
  {
    year: '2025',
    title: 'Product builder',
    detail: 'Shaping YumTrip, data dashboards, and focused AI assistants.',
  },
  {
    year: '2024',
    title: 'Engineering practice',
    detail: 'Building stronger systems, habits, and a bias toward finishing.',
  },
  {
    year: '2023',
    title: 'Sydney',
    detail: 'A new city, wider perspective, and the start of a new chapter.',
  },
]

const expertise = [
  {
    number: '01',
    label: 'Product thinking',
    title: 'Start with the problem, then earn every interaction.',
    body: 'I turn loose ideas into focused product decisions, useful flows, and interfaces that feel considered rather than decorated.',
    meta: 'DISCOVERY / UX / PROTOTYPING',
  },
  {
    number: '02',
    label: 'System design',
    title: 'Give complexity a shape that can keep evolving.',
    body: 'Clear boundaries, composable parts, and pragmatic architecture make products easier to understand, change, and trust.',
    meta: 'ARCHITECTURE / DATA / APIs',
  },
  {
    number: '03',
    label: 'Interface engineering',
    title: 'Polish belongs in the implementation, not just the mockup.',
    body: 'Responsive layout, purposeful motion, accessibility, and performance are treated as one connected engineering problem.',
    meta: 'REACT / SWIFTUI / MOTION',
  },
  {
    number: '04',
    label: 'Applied intelligence',
    title: 'Use AI where it removes friction and clarifies decisions.',
    body: 'I explore focused assistants, automation, and data workflows that make people more capable without making the product noisier.',
    meta: 'AI TOOLS / PYTHON / AUTOMATION',
  },
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function SectionLabel({ index, children }) {
  return (
    <div className="section-label" data-reveal>
      <span>{index}</span>
      <span>{children}</span>
      <i aria-hidden="true" />
    </div>
  )
}

function YumTripVisual() {
  return (
    <div className="project-art yumtrip-art" aria-hidden="true">
      <div className="visual-topline">
        <span>YUMTRIP / CITY MEMORY</span>
        <span>SYDNEY · 18:42</span>
      </div>
      <div className="map-grid">
        <span className="map-road road-one" />
        <span className="map-road road-two" />
        <span className="map-road road-three" />
        <span className="map-pin pin-one"><i /></span>
        <span className="map-pin pin-two"><i /></span>
        <span className="map-pin pin-three"><i /></span>
        <span className="route-line route-one" />
        <span className="route-line route-two" />
      </div>
      <div className="place-panel">
        <div className="place-number">03</div>
        <p>WEEKEND ROUTE</p>
        <h4>Sydney, saved with context.</h4>
        <div className="place-list">
          <span><b>01</b> Surry Hills</span>
          <span><b>02</b> Circular Quay</span>
          <span><b>03</b> Newtown</span>
        </div>
      </div>
      <div className="project-watermark">Y</div>
    </div>
  )
}

function MarketVisual() {
  return (
    <div className="project-art market-art" aria-hidden="true">
      <div className="market-header">
        <span>MARKET SIGNALS</span>
        <span className="status-dot">LIVE DATA</span>
      </div>
      <div className="market-summary">
        <span>COMPOSITE INDEX</span>
        <strong>12,843.67</strong>
        <small>+ 1.84%</small>
      </div>
      <div className="chart-stage">
        <div className="chart-grid" />
        <div className="chart-bars">
          {[34, 48, 41, 65, 56, 82, 72, 91, 78, 96, 88, 100].map((height, index) => (
            <i key={index} style={{ '--bar': `${height}%` }} />
          ))}
        </div>
        <span className="chart-line" />
      </div>
      <div className="ticker-row">
        <span>TECH <b>+2.4</b></span>
        <span>ENERGY <b>+0.8</b></span>
        <span>HEALTH <b>−0.3</b></span>
      </div>
    </div>
  )
}

function CoffeeHeartVisual() {
  return (
    <div className="project-art coffee-art" aria-hidden="true">
      <div className="coffee-orbit orbit-one" />
      <div className="coffee-orbit orbit-two" />
      <div className="coffee-core">
        <span>CH</span>
        <small>SYSTEM / ONLINE</small>
      </div>
      <div className="terminal-card">
        <div className="terminal-head"><span /><span /><span /></div>
        <p><i>01</i> product.build(<b>clarity</b>)</p>
        <p><i>02</i> interface.refine(<b>motion</b>)</p>
        <p><i>03</i> systems.keep(<b>evolving</b>)</p>
      </div>
      <div className="coffee-meta">
        <span>PERSONAL OS</span>
        <span>2026 / 07</span>
      </div>
    </div>
  )
}

function ProjectCard({ className = '', number, meta, title, description, stack, visual }) {
  return (
    <article className={`project-card ${className}`} data-reveal>
      <div className="project-visual-wrap">
        {visual}
        <span className="project-arrow"><Arrow diagonal /></span>
      </div>
      <div className="project-info">
        <div className="project-meta"><span>{number}</span><span>{meta}</span></div>
        <h3>{title}</h3>
        <div className="project-description">
          <p>{description}</p>
          <span>{stack}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduceMotion(motionQuery.matches)
    updateMotion()
    motionQuery.addEventListener('change', updateMotion)
    return () => motionQuery.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    const updateNav = () => setScrolled(window.scrollY > 28)
    updateNav()
    window.addEventListener('scroll', updateNav, { passive: true })
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site" id="top">
      <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Chris Cui, home">
            <span className="brand-mark">CH</span>
            <span className="brand-name">Chris Cui</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              Let&apos;s talk <Arrow diagonal />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            {!reduceMotion && (
              <video autoPlay muted loop playsInline preload="metadata" poster="/hero-frame.png">
                <source src="/hero-loop.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-content container">
            <div className="hero-status hero-animate delay-one">
              <span>Software engineer</span>
              <span>Sydney / AU</span>
              <span className="availability"><i /> Available for selected projects</span>
            </div>

            <div className="hero-main">
              <p className="hero-index hero-animate delay-two">PORTFOLIO / 2026</p>
              <h1 id="hero-title" className="hero-animate delay-three">
                <span>Complex systems.</span>
                <span className="outline-text">Clear products.</span>
              </h1>
            </div>

            <div className="hero-bottom hero-animate delay-four">
              <div className="hero-intro">
                <span className="intro-line" aria-hidden="true" />
                <p>I build thoughtful digital products across web, iOS, data, and AI — where engineering discipline meets a sharp product point of view.</p>
              </div>
              <a className="round-link" href="#profile" aria-label="Continue to profile">
                <span>Scroll</span>
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="profile section container" id="profile" aria-labelledby="profile-title">
          <SectionLabel index="01">Profile</SectionLabel>

          <div className="profile-grid">
            <div className="profile-portrait-column" data-reveal>
              <div className="portrait-card">
                <div className="portrait-grid" aria-hidden="true" />
                <div className="portrait-scan" aria-hidden="true" />
                <span className="portrait-mono">CH</span>
                <div className="portrait-caption">
                  <span>SOFTWARE ENGINEER</span>
                  <span>2026 / SYD</span>
                </div>
                <div className="portrait-corner top-left" />
                <div className="portrait-corner bottom-right" />
              </div>
              <div className="identity-card">
                <div>
                  <span>Current base</span>
                  <strong>Sydney, Australia</strong>
                </div>
                <a href="mailto:hello@coffeeheart.dev">hello@coffeeheart.dev <Arrow diagonal /></a>
              </div>
            </div>

            <div className="profile-copy">
              <p className="profile-kicker" data-reveal>ABOUT / CHRIS CUI</p>
              <h2 id="profile-title" data-reveal>
                I turn ambiguous ideas into products that feel <em>simple, useful, and built to last.</em>
              </h2>
              <p className="profile-body" data-reveal>
                My work sits between engineering and product craft. I care about the shape of a system, the feel of an interaction, and the practical details that turn an experiment into something people can rely on.
              </p>

              <div className="profile-stats" data-reveal>
                <article><strong>04</strong><span>Selected builds</span></article>
                <article><strong>06</strong><span>Core disciplines</span></article>
                <article><strong>03</strong><span>City nodes</span></article>
              </div>

              <div className="experience-list" data-reveal>
                {experience.map((item) => (
                  <article key={item.year}>
                    <span>{item.year}</span>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="work section container" id="work" aria-labelledby="work-title">
          <SectionLabel index="02">Selected work</SectionLabel>
          <div className="section-intro work-intro">
            <h2 id="work-title" data-reveal>Products built with<br />intent, not noise.</h2>
            <p data-reveal>A selection of product experiments spanning place memory, public market data, and personal interface systems.</p>
          </div>

          <div className="projects-grid">
            <ProjectCard
              className="project-featured"
              number="01"
              meta="IOS PRODUCT / 2025"
              title="YumTrip"
              description="A calmer way to collect restaurants, city notes, and food routes — designed as a memory system rather than another list."
              stack="SWIFTUI / MAPS / PRODUCT DESIGN"
              visual={<YumTripVisual />}
            />

            <ProjectCard
              className="project-market"
              number="02"
              meta="DATA PRODUCT / PROTOTYPE"
              title="Market Signals"
              description="A focused view of watchlists, sector movement, and public market notes without the noise of a trading terminal."
              stack="DATA / CHARTS / REACT"
              visual={<MarketVisual />}
            />

            <ProjectCard
              className="project-coffee"
              number="03"
              meta="INTERFACE LAB / 2026"
              title="CoffeeHeart"
              description="A long-running digital home for experiments in motion, personal systems, and the craft of making interfaces feel alive."
              stack="REACT / CANVAS / MOTION"
              visual={<CoffeeHeartVisual />}
            />
          </div>
        </section>

        <section className="expertise section container" id="expertise" aria-labelledby="expertise-title">
          <SectionLabel index="03">Expertise</SectionLabel>
          <div className="section-intro expertise-intro">
            <h2 id="expertise-title" data-reveal>How I turn ideas<br />into working systems.</h2>
            <p data-reveal>Six disciplines — SwiftUI, Java, React, Python, SQL, and AI tooling — brought together through four ways of working.</p>
          </div>

          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card" key={item.number} data-reveal>
                <div className="expertise-top">
                  <span>{item.number}</span>
                  <span>{item.label}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="expertise-bottom">
                  <p>{item.body}</p>
                  <span>{item.meta}</span>
                </div>
                <i className="expertise-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-grid-bg" aria-hidden="true" />
          <div className="contact-inner container">
            <div className="contact-top" data-reveal>
              <span>04 / CONTACT</span>
              <span className="availability"><i /> Open to thoughtful collaborations</span>
            </div>

            <div className="contact-main">
              <p data-reveal>HAVE SOMETHING WORTH BUILDING?</p>
              <h2 id="contact-title" data-reveal>Let&apos;s make it<br /><em>clear and useful.</em></h2>
              <a className="contact-email" href="mailto:hello@coffeeheart.dev" data-reveal>
                <span>hello@coffeeheart.dev</span>
                <Arrow diagonal />
              </a>
            </div>

            <footer className="footer" data-reveal>
              <div><span>Based in</span><strong>Sydney / Australia</strong></div>
              <div><span>Digital home</span><strong>coffeeheart.dev</strong></div>
              <div><span>© {new Date().getFullYear()}</span><strong>Chris Cui</strong></div>
              <a href="#top">Back to top <Arrow /></a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
