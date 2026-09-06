import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const services = [
  {
    name: 'iOS Development',
    description:
      'Building intuitive, production-minded iOS experiences with SwiftUI, SwiftData, thoughtful interaction design, and reliable local data flows.',
  },
  {
    name: 'AI Product Engineering',
    description:
      'Turning AI capabilities into focused product features for investment intelligence, travel planning, discovery, and personal knowledge workflows.',
  },
  {
    name: 'Cloud Backends',
    description:
      'Creating Python services and REST APIs that connect mobile clients to cloud-hosted analysis, real-time information, and durable product logic.',
  },
  {
    name: 'Location Experiences',
    description:
      'Designing context-aware journeys with Mapbox, background location tracking, travel history, discovery, and personalised collections.',
  },
  {
    name: 'Software Systems',
    description:
      'Developing clear application structures across Java, C, SQL, Git, and modern engineering practices for products that remain easy to evolve.',
  },
]

const projects = [
  {
    number: '01',
    category: 'Full Stack',
    name: 'PortSight',
    images: ['/assets/project-01a.webp', '/assets/project-01b.webp', '/assets/project-01c.webp'],
  },
  {
    number: '02',
    category: 'iOS + AI',
    name: 'LifeTrip',
    images: ['/assets/project-02a.webp', '/assets/project-02b.webp', '/assets/project-02c.webp'],
  },
  {
    number: '03',
    category: 'Mobile',
    name: 'YumTrip',
    images: ['/assets/project-03a.webp', '/assets/project-03b.webp', '/assets/project-03c.webp'],
  },
]

function scrollToSection(id: string) {
  return (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }
}

type FadeInProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
}

function FadeIn({
  as = 'div',
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps) {
  const MotionElement = useMemo(() => motion.create(as), [as])

  return (
    <MotionElement
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </MotionElement>
  )
}

function MouseScrubMannequin() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previousX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  const seekToTarget = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || seeking.current) return
    if (Math.abs(video.currentTime - targetTime.current) < 0.01) return

    seeking.current = true
    video.currentTime = targetTime.current
  }

  useEffect(() => {
    const sensitivity = 0.8
    const onMouseMove = (event: MouseEvent) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return

      if (previousX.current === null) {
        previousX.current = event.clientX
        return
      }

      const delta = event.clientX - previousX.current
      previousX.current = event.clientX
      const timeOffset = (delta / window.innerWidth) * sensitivity * video.duration
      targetTime.current = Math.min(video.duration, Math.max(0, targetTime.current + timeOffset))
      seekToTarget()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        className="hero-scrub-video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          targetTime.current = event.currentTarget.currentTime
        }}
        onSeeked={() => {
          seeking.current = false
          seekToTarget()
        }}
        aria-label="Interactive digital mannequin controlled by horizontal mouse movement"
      />
      <div className="hero-video-shade" aria-hidden="true" />
    </>
  )
}

function ContactButton() {
  return (
    <a className="contact-button" href="mailto:3262160489@qq.com">
      Contact Me
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
    </a>
  )
}

function LiveProjectButton() {
  return (
    <a
      className="live-button"
      href="https://github.com/cuijiajun6666"
      target="_blank"
      rel="noreferrer"
    >
      Live Project
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
    </a>
  )
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[680px] flex-col overflow-x-clip" id="home">
      <MouseScrubMannequin />
      <FadeIn as="nav" y={-20} className="glass-nav" aria-label="Primary navigation">
        <a className="nav-link" href="#about" onClick={scrollToSection('about')}>About</a>
        <a className="nav-link" href="#expertise" onClick={scrollToSection('expertise')}>Skills</a>
        <a className="nav-link" href="#projects" onClick={scrollToSection('projects')}>Projects</a>
        <a className="nav-link" href="#contact" onClick={scrollToSection('contact')}>Contact</a>
      </FadeIn>

      <div className="relative z-20 overflow-hidden pt-24 sm:pt-28 md:pt-32">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m chris
        </FadeIn>
      </div>

      <div className="relative z-20 mx-auto mt-auto flex w-full max-w-[1700px] items-end justify-between gap-8 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn as="p" delay={0.35} y={20} className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
          a software engineer driven by building intelligent and unforgettable products
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

function MarqueeRow({ images, direction, offset }: { images: string[]; direction: 'left' | 'right'; offset: number }) {
  const repeated = [...images, ...images, ...images]
  const shift = offset - 200

  return (
    <div
      className="relative flex w-max gap-3"
      style={{
        left: direction === 'right' ? '-42%' : '-15%',
        transform: `translate3d(${direction === 'right' ? shift : -shift}px, 0, 0)`,
        willChange: 'transform',
      }}
    >
      {repeated.map((src, index) => (
        <img
          key={`${src}-${index}`}
          className="h-[270px] w-[420px] flex-none rounded-2xl object-cover"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const sectionTop = sectionRef.current?.offsetTop ?? 0
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" aria-label="Selected visual work">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" offset={offset} />
        <MarqueeRow images={marqueeImages.slice(11)} direction="left" offset={offset} />
      </div>
    </section>
  )
}

function AnimatedCharacter({
  character,
  progress,
  start,
  end,
}: {
  character: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const displayCharacter = character === ' ' ? '\u00A0' : character

  return (
    <span className="relative inline-block">
      <span className="opacity-0" aria-hidden="true">{displayCharacter}</span>
      <motion.span className="absolute inset-0" style={{ opacity }} aria-hidden="true">
        {displayCharacter}
      </motion.span>
    </span>
  )
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const characters = Array.from(children)

  return (
    <p ref={ref} className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]" aria-label={children}>
      {characters.map((character, index) => {
        const start = index / characters.length
        const end = Math.min(1, start + 1 / characters.length)
        return <AnimatedCharacter key={`${character}-${index}`} character={character} progress={scrollYProgress} start={start} end={end} />
      })}
    </p>
  )
}

function AboutSection() {
  const aboutText =
    'I am a software engineering student at the University of Sydney, focused on full-stack iOS applications, AI-powered products, cloud backend services, and intuitive mobile experiences. I turn ambitious ideas into thoughtful products that feel clear, useful, and alive.'

  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="decor decor-moon">
        <img src="/assets/moon.png" alt="" />
      </FadeIn>
      <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="decor decor-object">
        <img src="/assets/object.png" alt="" />
      </FadeIn>
      <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="decor decor-lego">
        <img src="/assets/lego.png" alt="" />
      </FadeIn>
      <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="decor decor-group">
        <img src="/assets/group.png" alt="" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn as="h2" y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          About me
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText>{aboutText}</AnimatedText>
          <ContactButton />
        </div>
      </div>
    </section>
  )
}

function ExpertiseSection() {
  return (
    <section id="expertise" className="scroll-mt-24 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-[1700px]">
        <FadeIn as="h2" y={40} className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Expertise
        </FadeIn>
        <div className="mx-auto max-w-5xl border-b border-[rgba(12,12,12,0.15)]">
          {services.map((service, index) => (
            <FadeIn key={service.name} delay={index * 0.1} className="grid grid-cols-[0.32fr_0.68fr] gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{String(index + 1).padStart(2, '0')}</span>
              <div className="flex flex-col justify-center gap-3 sm:gap-4">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{service.name}</h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, stackProgress }: { project: (typeof projects)[number]; index: number; stackProgress: MotionValue<number> }) {
  const segmentLength = 1 / (projects.length + 0.28)
  const segmentStart = index * segmentLength
  const segmentEnd = (index + 1) * segmentLength
  const targetScale = index === projects.length - 1 ? 1 : index === 0 ? 0.92 : 0.96
  const targetY = index === projects.length - 1 ? 0 : 24
  const rawScale = useTransform(stackProgress, [segmentStart, segmentEnd], [1, targetScale])
  const rawY = useTransform(stackProgress, [segmentStart, segmentEnd], [0, targetY])
  const scale = useSpring(rawScale, { stiffness: 180, damping: 28, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.35 })

  return (
    <motion.article
      className="project-card-shell sticky mx-auto flex w-full max-w-[1500px] flex-col overflow-hidden rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 text-[#D7E2EA] sm:rounded-[40px] sm:p-5 md:rounded-[48px] md:p-6"
      style={{ top: 'var(--project-sticky-top)', zIndex: 10 + index, scale, y }}
    >
        <div className="mb-4 grid flex-none grid-cols-[auto_1fr] items-end gap-3 sm:mb-5 sm:grid-cols-[auto_0.55fr_1fr_auto] sm:gap-5">
          <span className="text-[clamp(2.6rem,6.5vw,92px)] font-black leading-[0.78]">{project.number}</span>
          <span className="text-xs font-medium uppercase tracking-[0.22em] opacity-60 sm:text-sm">{project.category}</span>
          <h3 className="col-span-2 text-[clamp(1.25rem,2.8vw,3.25rem)] font-medium uppercase leading-none sm:col-span-1">{project.name}</h3>
          <div className="col-span-2 justify-self-end sm:col-span-1">
            <LiveProjectButton />
          </div>
        </div>

        <div className="project-media-grid grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] gap-3 sm:gap-4">
          <div className="flex min-h-0 flex-col gap-3 sm:gap-4">
            <img className="project-image project-image-top min-h-0" src={project.images[0]} alt={`${project.name} project view one`} loading="lazy" />
            <img className="project-image min-h-0 flex-1" src={project.images[1]} alt={`${project.name} project view two`} loading="lazy" />
          </div>
          <img className="project-image h-full min-h-0" src={project.images[2]} alt={`${project.name} project view three`} loading="lazy" />
        </div>
    </motion.article>
  )
}

function ProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1700px]">
        <FadeIn as="h2" y={40} className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </FadeIn>
        <div ref={stackRef} className="project-stack relative">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} stackProgress={stackProgress} />
          ))}
        </div>
        <footer id="contact" className="relative z-30 mt-24 flex min-h-[260px] scroll-mt-24 flex-col justify-end gap-8 border-t border-white/15 pb-6 pt-16 text-[#D7E2EA] sm:mt-32 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] opacity-50">Jiajun Cui / Chris</p>
            <p className="mt-2 text-xl font-light">Software Engineering · iOS · AI</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-wider">
            <a className="nav-link" href="mailto:3262160489@qq.com">Email</a>
            <a className="nav-link" href="https://www.linkedin.com/in/jiajuncui" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="nav-link" href="https://github.com/cuijiajun6666" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </footer>
      </div>
    </section>
  )
}

function App() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY}px`)
  }

  return (
    <main className="site-wrapper" onMouseMove={handlePointerMove}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
    </main>
  )
}

export default App
