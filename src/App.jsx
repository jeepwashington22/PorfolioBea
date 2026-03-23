import { useMemo, useRef, useState } from "react"
import {
  BookOpen,
  BriefcaseBusiness,
  Contact,
  FolderKanban,
  Home,
  LayoutDashboard,
  MessageSquare,
  PanelsTopLeft,
  Phone,
  Search,
  User,
  Code2,          
  LayoutTemplate, 
  Sparkles,       
  WalletCards,    
  Server          
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion" // <--- ADD THIS LINE
import {
  SiCss,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFlutter,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGmail,
  SiGoogle,
  SiHtml5,
  SiInstagram,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPython,
  SiReact,
  SiRaspberrypi,
  SiSanity,
  SiTailwindcss,
  SiTypescript,
  SiFacebook,
} from "react-icons/si"

import TextType from "./TextType"
import GlareHover from "./GlareHover"
import LiquidEther from "./components/LiquidEther"
import MagicBento from "./MagicBento"
import TiltedCard from "./components/TiltedCard/TiltedCard"
import Lanyard from "./Lanyard"

import profilePic from "./assets/profilePic.jpg"

const projectMediaMap = import.meta.glob(
  "./assets/projectImages/*.{jpg,jpeg,png,webp,mp4}",
  { eager: true, import: "default" },
)

const projectMedia = Object.entries(projectMediaMap)
  .map(([path, src]) => ({
    path,
    src,
    isVideo: path.toLowerCase().endsWith(".mp4"),
  }))
  .sort((a, b) => a.path.localeCompare(b.path))
  const servicesData = [
  {
    id: "frontend",
    label: "Frontend Web",
    icon: LayoutTemplate,
    title: "Frontend Development",
    description: "Turning ideas into scalable, user-friendly web apps with modern interfaces.",
    skills: ["Responsive Web Design", "Single Page Apps (SPA)", "Interactive UIs", "Landing Pages"],
    tools: [
      { icon: SiReact, color: "#61DAFB", name: "React" },
      { icon: SiNextdotjs, color: "#ffffff", name: "Next.js" },
      { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
      { icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind CSS" },
    ]
  },
  {
    id: "fullstack",
    label: "Full-Stack",
    icon: Server,
    title: "Full-Stack & Backend",
    description: "End-to-end development, shipping real client projects including CMS and e-commerce platforms.",
    skills: ["E-Commerce Platforms", "Custom CMS", "RESTful APIs", "Database Management"],
    tools: [
      { icon: SiNodedotjs, color: "#339933", name: "Node.js" },
      { icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
      { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
    ]
  },
  {
    id: "ai",
    label: "AI Agents",
    icon: Sparkles,
    title: "AI & LLM Integration",
    description: "Building intelligent, context-aware web experiences that solve real problems.",
    skills: ["LLM Integration", "AI Agents", "Automated Workflows", "Prompt Engineering"],
    tools: [
      { icon: SiOpenai, color: "#412991", name: "OpenAI" },
      { icon: SiGoogle, color: "#4285F4", name: "Gemini API" },
      { icon: Code2, color: "#eab308", name: "API Integration" }
    ]
  }
]


function App() {
  const [activeTab, setActiveTab] = useState("Home")
  const [projectQuery, setProjectQuery] = useState("")
  const [projectSort, setProjectSort] = useState("newest")
  const [isLightMode, setIsLightMode] = useState(false)
  const mainScrollRef = useRef(null)
  // --- ADD THESE TWO LINES ---
  const [activeServiceTab, setActiveServiceTab] = useState("frontend")
  const activeService = servicesData.find((s) => s.id === activeServiceTab)

  const theme = isLightMode
    ? {
        shell: "bg-zinc-50 text-zinc-950",
        shellOverlay: "bg-white/55",
        sidebar: "border-zinc-200/70 bg-white/60",
        navActive: "bg-zinc-200/70 text-zinc-950",
        navInactive:
          "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-950",
        navIcon: "text-zinc-600",
      }
    : {
        shell: "bg-zinc-950 text-zinc-100",
        shellOverlay: "bg-zinc-900/40",
        sidebar: "border-zinc-800/80 bg-zinc-950/30",
        navActive: "bg-zinc-800/70 text-zinc-100",
        navInactive:
          "text-zinc-300 hover:bg-zinc-800/40 hover:text-zinc-100",
        navIcon: "text-zinc-300",
      }
  
  const themeClasses = isLightMode
        ? {
            card: "border-zinc-200/70 bg-white/40",
            text: { primary: "text-zinc-950", secondary: "text-zinc-600", muted: "text-zinc-500" },
            input: "border-zinc-200/80 bg-white/60 text-zinc-950 placeholder:text-zinc-500 focus:border-zinc-400",
            inputIcon: "text-zinc-500",
            border: "border-zinc-200/70",
            divider: "bg-zinc-300/50",
        }
        : {
        card: "border-zinc-800/80 bg-zinc-950/25",
        text: { primary: "text-zinc-100", secondary: "text-zinc-300", muted: "text-zinc-500" },
        input: "border-zinc-800/80 bg-zinc-950/20 text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700/80",
        inputIcon: "text-zinc-500",
        border: "border-zinc-800/80",
        divider: "bg-zinc-800/80",
      }

  const techStack = [
    { label: "HTML", icon: SiHtml5, iconClassName: "text-orange-300" },
    { label: "CSS", icon: SiCss, iconClassName: "text-blue-300" },
    { label: "JavaScript", icon: SiJavascript, iconClassName: "text-yellow-300" },
    { label: "TypeScript", icon: SiTypescript, iconClassName: "text-sky-300" },
    { label: "React", icon: SiReact, iconClassName: "text-sky-300" },
    { label: "Next.js", icon: SiNextdotjs, iconClassName: "text-zinc-100" },
    { label: "Tailwind CSS", icon: SiTailwindcss, iconClassName: "text-cyan-300" },
    { label: "Node.js", icon: SiNodedotjs, iconClassName: "text-green-300" },
    { label: "Express", icon: SiExpress, iconClassName: "text-zinc-200" },
    { label: "MongoDB", icon: SiMongodb, iconClassName: "text-emerald-300" },
    { label: "Firebase", icon: SiFirebase, iconClassName: "text-amber-300" },
    { label: "Docker", icon: SiDocker, iconClassName: "text-sky-300" },
    { label: ".NET", icon: SiDotnet, iconClassName: "text-violet-300" },
    { label: "PHP", icon: SiPhp, iconClassName: "text-indigo-300" },
    { label: "Python", icon: SiPython, iconClassName: "text-blue-300" },
    { label: "Flutter", icon: SiFlutter, iconClassName: "text-cyan-300" },
    { label: "Raspberry Pi", icon: SiRaspberrypi, iconClassName: "text-pink-300" },
    { label: "Sanity", icon: SiSanity, iconClassName: "text-red-300" },
    { label: "Git", icon: SiGit, iconClassName: "text-orange-300" },
    { label: "GitHub", icon: SiGithub, iconClassName: "text-zinc-100" },
    { label: "OpenAI", icon: SiOpenai, iconClassName: "text-zinc-100" },
    { label: "Google", icon: SiGoogle, iconClassName: "text-zinc-100" },
    { label: "Gmail", icon: SiGmail, iconClassName: "text-zinc-100" },
    { label: "Instagram", icon: SiInstagram, iconClassName: "text-zinc-100" },
    { label: "Facebook", icon: SiFacebook, iconClassName: "text-zinc-100" },
  ]
  // --- ADDED: Services Data ---

  const nav = [
    { label: "Home", icon: Home },
    { label: "About", icon: User },
    { label: "Projects", icon: FolderKanban },
    { label: "Tutorials", icon: BookOpen },
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Chat Room", icon: MessageSquare },
    { label: "Services", icon: BriefcaseBusiness },
    { label: "Contact", icon: Contact },
    { label: "Showcase", icon: PanelsTopLeft },
  ]

  const contacts = [
    {
      label: "Instagram",
      href: "https://instagram.com/beaalyssalugtup",
      icon: SiInstagram,
    },
    {
      label: "Gmail",
      href: "mailto:your.email@gmail.com",
      icon: SiGmail,
    },
    {
      label: "Facebook",
      href: "https://facebook.com/your.profile",
      icon: SiFacebook,
    },
    {
      label: "Phone",
      href: "tel:09000000000",
      icon: Phone,
    },
  ]

  const projects = useMemo(() => {
    const items = Array.from({ length: 6 }).map((_, index) => {
      const media = projectMedia.length
        ? projectMedia[index % projectMedia.length]
        : null

      return {
        id: `project-${index + 1}`,
        title: index === 0 ? "ResQWave" : `Project ${index + 1}`,
        status: "Completed",
        featured: index === 1,
        description:
          "A modern, responsive web app built with a focus on clean UI, performance, and scalable architecture.",
        media,
        stack: [
          SiReact,
          SiTypescript,
          SiTailwindcss,
          SiNodedotjs,
          SiMongodb,
          SiGithub,
        ],
        year: 2026 - (index % 3),
      }
    })

    const q = projectQuery.trim().toLowerCase()
    const filtered = q
      ? items.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        )
      : items

    const sorted = [...filtered].sort((a, b) =>
      projectSort === "oldest" ? a.year - b.year : b.year - a.year,
    )

    return sorted
  }, [projectQuery, projectSort])

  return (
    <div
      className={
        "relative h-screen w-screen transition-colors duration-500 " + theme.shell
      }
    >
      <div className="pointer-events-none absolute inset-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-auto fixed right-6 top-6 z-50">
        <Lanyard
          position={[0, 0, 0]}
          gravity={[0, -40, 0]}
          size={88}
          small
          theme={isLightMode ? "light" : "dark"}
          onToggle={() => setIsLightMode((v) => !v)}
        />
      </div>

      <div
        className={
          "relative flex h-full w-full min-h-0 overflow-hidden transition-colors duration-500 " +
          theme.shellOverlay
        }
      >
        <aside
          className={
            "hidden w-[250px] shrink-0 border-r p-5 transition-colors duration-500 md:block " +
            theme.sidebar
          }
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
              <img
                src={profilePic}
                alt="Profile"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-zinc-100">
                  Bea Alyssa Lugtu
                </p>
                <span className="inline-flex items-center rounded-md border border-zinc-700/80 bg-zinc-900/50 px-1.5 py-0.5 text-[10px] leading-none text-zinc-200">
                  US
                </span>
              </div>
              <p className="truncate text-xs text-zinc-400">@beaalyssalugtup</p>
            </div>
          </div>

          <nav className="mt-5 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveTab(item.label)}
                  className={
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors " +
                    (isActive ? theme.navActive : theme.navInactive)
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={`h-4 w-4 ${theme.navIcon}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        <main
          ref={mainScrollRef}
          className="min-h-0 flex-1 overflow-y-auto p-5 md:p-7"
        >
          {activeTab === "Home" ? (
            <>
              <header className="mb-5">
                <h1 className={"text-md font-semibold tracking-tight transition-colors duration-500 " + (isLightMode ? "text-zinc-950" : "text-zinc-100")}>
                  <TextType
                    texts={["Hello, I'm Bea Alyssa Lugtu.", "A Software Developer"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={50}
                    variableSpeedEnabled={false}
                    variableSpeedMin={60}
                    variableSpeedMax={120}
                    cursorBlinkDuration={0.5}
                  />
                </h1>
                <p className={"mt-1 font-bold text-lg transition-colors duration-500 " + themeClasses.text.secondary}>
                  Full-Stack Developer | LLM & AI Agent Builder | React · TypeScript · Node.js
                </p>
                <div className={"mt-4 rounded-2xl p-5 backdrop-blur-md transition-colors duration-500 " + themeClasses.card}>
                  <p className={"max-w-11/12 text-sm leading-relaxed text-justify transition-colors duration-500 " + themeClasses.text.muted}>
                   I'm a CS student who fell in love with building things people actually use. I specialize in frontend-focused full-stack development — turning ideas into scalable, user-friendly web apps using React, TypeScript, Node.js, and Tailwind CSS. I've shipped real client projects including a completed content management system (CMS) and an e-commerce platform. I also build and implement AI agents powered by LLMs, integrating OpenAI and Gemini APIs to create intelligent, context-aware web experiences that solve real problems.


                  </p>
                </div>
              </header>

              {/* --- SKILLS SECTION WITH BIGGER COLORED ICONS --- */}
              <section className="mb-8">
                {/* Divider Header */}
                <div className="mb-5 flex items-center gap-4">
                  <h2 className={"text-sm font-semibold uppercase tracking-widest transition-colors duration-500 " + themeClasses.text.secondary}>
                    My Skills
                  </h2>
                  <div className={"h-px flex-1 transition-colors duration-500 " + themeClasses.divider}></div>
                </div>

                {/* Circular Icons Container */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { Icon: SiHtml5, name: "HTML5", color: "#E34F26" },
                    { Icon: SiCss, name: "CSS3", color: "#1572B6" },
                    { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
                    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
                    { Icon: SiReact, name: "React", color: "#61DAFB" },
                    { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
                    { Icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
                    { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
                    { Icon: SiExpress, name: "Express", color: "#FFFFFF" },
                    { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
                    { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
                    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
                    { Icon: SiDotnet, name: ".NET", color: "#512BD4" },
                    { Icon: SiPhp, name: "PHP", color: "#777BB4" },
                    { Icon: SiPython, name: "Python", color: "#3776AB" },
                    { Icon: SiFlutter, name: "Flutter", color: "#02569B" },
                    { Icon: SiRaspberrypi, name: "Raspberry Pi", color: "#C51A4A" },
                    { Icon: SiSanity, name: "Sanity", color: "#F03E2F" },
                    { Icon: SiGit, name: "Git", color: "#F05032" },
                    { Icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
                    { Icon: SiOpenai, name: "OpenAI", color: "#412991" },
                    { Icon: SiGoogle, name: "Google", color: "#4285F4" },
                    { Icon: SiGmail, name: "Gmail", color: "#EA4335" },
                    { Icon: SiInstagram, name: "Instagram", color: "#E4405F" },
                    { Icon: SiFacebook, name: "Facebook", color: "#1877F2" },
                  ].map((tech, idx) => (
                    <div
                      key={idx}
                      title={tech.name}
                      className={"group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full shadow-sm transition-all duration-300 hover:scale-110 " + themeClasses.card}>
                      <tech.Icon 
                        // Increased icon to h-8 w-8
                        className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
                        style={{ color: tech.color }} 
                      />
                    </div>
                  ))}
                </div>
              </section>

              <MagicBento
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="132, 0, 255"
                disableAnimations={false}
              />
            </>
          
          ) : activeTab === "Projects" ? (
            <>
              <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
                <header className="mb-5">
                  <h1 className={"text-md font-semibold tracking-tight transition-colors duration-500 " + themeClasses.text.primary}>
                    Projects
                  </h1>
                  <p className={"mt-1 text-sm leading-relaxed transition-colors duration-500 " + themeClasses.text.muted}>
                    A showcase of both private and open-source projects I've built or contributed.
                  </p>
                </header>

                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="relative w-full md:max-w-sm">
                    <Search className={"absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-500 " + themeClasses.inputIcon} />
                    <input
                      value={projectQuery}
                      onChange={(e) => setProjectQuery(e.target.value)}
                      placeholder="Search projects by title..."
                      className={"w-full rounded-xl py-2 pl-10 pr-3 text-sm outline-none backdrop-blur-md transition-colors duration-500 " + themeClasses.input}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={projectSort}
                      onChange={(e) => setProjectSort(e.target.value)}
                      className={"rounded-xl px-3 py-2 text-sm outline-none backdrop-blur-md transition-colors duration-500 " + themeClasses.input}
                      aria-label="Sort"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project) => (
                    <GlareHover
                      key={project.id}  
                      glareOpacity={0.22}
                      glareSize={260}
                      transitionDuration={650}
                      className="rounded-2xl border border-zinc-800/80 bg-zinc-950/25 backdrop-blur-xl"
                    >
                      <article className="flex h-full w-full flex-col overflow-hidden">
                        <div className="relative aspect-[16/9] bg-zinc-950/40">
                          {project.media ? (
                            project.media.isVideo ? (
                              <video
                                className="h-full w-full object-cover opacity-70"
                                src={project.media.src}
                                muted
                                loop
                                playsInline
                                autoPlay
                              />
                            ) : (
                              <img
                                src={project.media.src}
                                alt={project.title}
                                className="h-full w-full object-cover opacity-70"
                                loading="lazy"
                                decoding="async"
                              />
                            )
                          ) : null}

                          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/50" />

                          <div className="absolute left-4 top-4 flex items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-zinc-950/35 px-2.5 py-1 text-[10px] font-semibold text-zinc-200">
                              {project.status}
                            </span>
                            {project.featured ? (
                              <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-300">
                                Featured
                              </span>
                            ) : null}
                          </div>

                          <div className="absolute inset-0 grid place-items-center">
                            <div className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2.5 text-sm font-semibold text-zinc-100 backdrop-blur-md">
                              View Project +
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-zinc-100">
                                {project.title}
                              </p>
                              <p className="mt-1 text-xs text-zinc-400">{project.year}</p>
                            </div>
                          </div>

                          <div className="mt-3 text-sm leading-relaxed text-zinc-400">
                            <p className="leading-relaxed">{project.description}</p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((StackIcon, i) => (
                              <div
                                key={`${project.id}-stack-${i}`}
                                className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-950/15"
                                title="Tech"
                                aria-label="Tech"
                              >
                                <StackIcon className="h-4 w-4 text-zinc-200" aria-hidden="true" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </article>
                    </GlareHover>
                  ))}
                </section>
              </div>
            </>
          ) : activeTab === "About" ? (
         <>
              <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl pb-10">
                <header className="mb-8">
                  <h1 className={"text-md font-bold tracking-tight transition-colors duration-500 " + themeClasses.text.primary}>About Me</h1>
                  <p className={"mt-2 text-sm transition-colors duration-500 " + themeClasses.text.muted}>
                    A quick snapshot of who I am and what I build.
                  </p>
                </header>

                {/* --- HERO PROFILE CARD --- */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl"
                >
                  {/* Subtle Background Glows */}
                  <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"></div>
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]"></div>

                  <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
                    <div className="shrink-0 drop-shadow-2xl">
                      <TiltedCard
                        imageSrc={profilePic}
                        altText="Profile photo"
                        captionText="Bea Alyssa Lugtu"
                        containerHeight="160px"
                        containerWidth="160px"
                        imageHeight="160px"
                        imageWidth="160px"
                        rotateAmplitude={12}
                        scaleOnHover={1.05}
                        showMobileWarning={false}
                        showTooltip
                        displayOverlayContent
                        overlayContent={
                          <p className="tilted-card-demo-text rounded-full bg-black/40 px-3 py-1 font-bold text-white backdrop-blur-md">
                          </p>
                        }
                      />
                    </div>

                    <aside className="min-w-0 flex-1 text-center md:text-left">
                      <h2 className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                        Bea Alyssa Lugtu
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-wide text-blue-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                          Software Developer
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300">
                          📍 Caloocan City, NCR
                        </span>
                      </div>

                      <p className={"mt-5 text-sm leading-relaxed max-w-2xl md:text-base transition-colors duration-500 " + themeClasses.text.muted}>
                        Full-stack developer focused on frontend-first product experiences — building
                        responsive UIs, robust APIs, and LLM integrations that feel genuinely useful rather than gimmicky.
                      </p>
                    </aside>
                  </div>
                </motion.section>

                {/* --- THE STORY CARD --- */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  className="mt-6 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                >
                  <h3 className={"flex items-center gap-4 text-xs font-semibold uppercase tracking-widest mb-6 transition-colors duration-500 " + themeClasses.text.muted}>
                    <span className={"h-px w-8 transition-colors duration-500 " + themeClasses.divider}></span> The Story
                  </h3>
                  <div className={"space-y-5 text-sm md:text-base leading-relaxed transition-colors duration-500 " + themeClasses.text.secondary}>
                    <p>
                      I'm a Computer Science student who fell in love with building things people
                      actually use. I focus on frontend-first full-stack development — turning ideas
                      into fast, scalable web apps with React, TypeScript, Node.js, and Tailwind CSS.
                    </p>
                    <p>
                      I've shipped real client work including a CMS and an e-commerce platform, and I
                      also build AI agents powered by LLMs (OpenAI and Gemini) to deliver intelligent,
                      context-aware experiences. I enjoy bridging hardware and software too —
                      especially IoT projects that help communities stay safe and connected.
                    </p>
                  </div>
                </motion.section>

                {/* --- EDUCATION & EXPERIENCE GRID --- */}
                <section className="mt-6 grid gap-6 md:grid-cols-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl transition-all hover:bg-white/[0.03]"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <h3 className={"text-lg font-bold transition-colors duration-500 " + themeClasses.text.primary}>Education</h3>
                    </div>
                    <div className="space-y-2 border-l-2 border-zinc-800 pl-4 relative">
                      <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-blue-500" />
                      <p className="text-base font-semibold text-zinc-200">
                        University of Caloocan City
                      </p>
                      <p className="text-sm font-medium text-zinc-400">BS Computer Science</p>
                      <p className="text-xs text-zinc-500">Aug 2022 – Apr 2026</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl transition-all hover:bg-white/[0.03]"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border-purple-500/20 bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <h3 className={"text-lg font-bold transition-colors duration-500 " + themeClasses.text.primary}>Experience</h3>
                    </div>
                    <div className="space-y-4 text-sm text-zinc-300">
                      <p className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-purple-500/50">
                        Built and shipped client-facing products like a CMS and an e-commerce platform,
                        with a strong focus on usability, performance, and maintainable architecture.
                      </p>
                      <p className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-purple-500/50">
                        Developed AI agents and LLM features (OpenAI + Gemini) for smarter workflows and
                        context-aware user experiences, plus IoT work bridging hardware + software.
                      </p>
                    </div>
                  </motion.div>
                </section>

                {/* --- TECH STACK SECTION --- */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                  className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
                    <div>
                      <h3 className={"flex items-center gap-4 text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-500 " + themeClasses.text.muted}>
                        <span className={"h-px w-8 transition-colors duration-500 " + themeClasses.divider}></span> Tech Stack
                      </h3>
                      <p className={"text-sm leading-relaxed transition-colors duration-500 " + themeClasses.text.muted}>
                        The tools, platforms, and languages I use across web, backend, and AI.
                      </p>
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 hidden sm:block animate-pulse">
                      Scroll ↓
                    </p>
                  </div>

                  {/* Added a fading edge mask for the scroll area */}
                  <div className="relative">
                    <div className="max-h-[320px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {techStack.map((item) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={item.label}
                              className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/10"
                            >
                              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-zinc-900/50 shadow-inner transition-transform duration-300 group-hover:scale-110">
                                <Icon
                                  className={`h-6 w-6 ${item.iconClassName ?? "text-zinc-200"}`}
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-zinc-200 transition-colors group-hover:text-white">
                                  {item.label}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {/* Bottom fade out gradient */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#131315] to-transparent"></div>
                  </div>
                </motion.section>
              </div>
            </>
          ) : activeTab === "Services" ? (
            <>
              {/* --- HEADER & OVERVIEW DESCRIPTION --- */}
              <header className="mb-6">
                <h1 className="text-md font-bold tracking-tight text-zinc-100">
                  {activeTab}
                </h1>
                <p className="mt-1 text-sm text-zinc-400">
                  How I can help bring your ideas to life.
                </p>
                
                {/* Added General Description to fix empty space and add context */}
                <div className="mt-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5 backdrop-blur-md">
                  <p className="text-sm leading-relaxed text-zinc-300 text-justify">
                    I offer end-to-end development services tailored to build modern, scalable, and intelligent applications. Whether you need a highly interactive frontend, a robust full-stack architecture, or cutting-edge AI and LLM integrations to automate workflows, I build solutions focused on performance and real-world usability.
                  </p>
                </div>
              </header>

              {/* Sub-Tabs for Services */}
              <div className="flex flex-wrap gap-3 mb-6">
                {servicesData.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeServiceTab === tab.id
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveServiceTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                          : "bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Interactive Content Area - Expanded for better visual balance */}
              <div className="rounded-2xl border border-zinc-800 bg-[#111113]/80 backdrop-blur-sm p-6 md:p-10 min-h-[340px] relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeServiceTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col h-full flex-1"
                  >
                    {/* Top part: Icon, Title, Description */}
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          {activeService && <activeService.icon className="w-6 h-6 text-blue-400" />}
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">
                          {activeService?.title}
                        </h3>
                      </div>
                      
                      <p className="text-base text-zinc-400 mb-8 max-w-2xl leading-relaxed">
                        {activeService?.description}
                      </p>
                    </div>

                    {/* Bottom part: Split into 2 columns for wider screens to fill space perfectly */}
                    <div className="mt-auto pt-6 border-t border-zinc-800/50 grid gap-8 md:grid-cols-2">
                      
                      {/* Capabilities Column */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                          Core Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeService?.skills.map((skill, index) => (
                            <div 
                              key={index}
                              className="px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 cursor-default"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech & Tools Column */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                          Tech & Tools
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {activeService?.tools.map((tool, index) => {
                            const ToolIcon = tool.icon
                            return (
                              <div 
                                key={index}
                                className="group relative p-2.5 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
                              >
                                <ToolIcon 
                                  className="w-5 h-5 text-zinc-400 group-hover:scale-110 transition-transform duration-300" 
                                  style={{ color: tool.color }}
                                />
                                {/* Tooltip */}
                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-800 text-[10px] font-semibold tracking-wide rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-xl">
                                  {tool.name}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <header className="mb-5">
                <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                  {activeTab}
                </h1>
                <p className="mt-1 text-sm text-zinc-400">Coming soon.</p>
              </header>
            </>
          )}
        </main>
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {contacts.map((item) => {
          const Icon = item.icon

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
              aria-label={item.label}
              title={item.label}
              className="grid h-12 w-12 place-items-center transition-transform hover:scale-110"
            >
              <Icon className="h-5 w-5 text-zinc-100" aria-hidden="true" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default App
