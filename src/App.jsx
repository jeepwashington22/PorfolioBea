import { useEffect, useMemo, useRef, useState } from "react"
import {
  BookOpen,
  BriefcaseBusiness,
  Contact,
  FolderKanban,
  Globe,
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
  Server,
  FileText,
  GraduationCap,
  Linkedin,
  Menu,
  Sparkles as StarSparkle,
  X,
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
import MagicBento from "./MagicBento"
import LogoLoop from "./LogoLoop"
import AboutInfiniteMenu from "./components/AboutInfiniteMenu"
import EducationSkillsProcess from "./components/EducationSkillsProcess"
import TiltedCard from "./components/TiltedCard/TiltedCard"
import "./App.css"
import Particles from "./components/Particles/Particles"
import profilePic from "./assets/profilepicc.png"

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

const resumeProjects = [
  {
    id: "ark-industries",
    name: "Ark Industries",
    role: "Fullstack Developer",
    link: "https://arkindustriesinc.com/login",
    bullets: [
      "Developed a geofencing and geotagging attendance system with location-based time-in/time-out validation.",
      "Implemented an employee scheduling module for managing work shifts.",
      "Built an automated Daily Time Record (DTR) system that calculates attendance and working hours based on time-in/time-out logic.",
      "Maintained and enhanced full-stack web application features for performance and reliability.",
    ],
  },
  {
    id: "infini-stock",
    name: "Infini-Stock",
    role: "Fullstack Developer",
    link: "https://infini-stock.vercel.app/login",
    bullets: [
      "Developed a QR code-based asset tracking system that assigns unique identifiers to monitor and CPU inventory for efficient asset management.",
      "Designed and implemented the mobile application interface and core inventory management logic.",
      "Built role-based access control (RBAC) to manage permissions for adding, editing, and deleting inventory records.",
      "Enhanced inventory organization and tracking through secure, streamlined asset management workflows.",
    ],
  },
  {
    id: "fallguard",
    name: "FallGuard",
    role: "Fullstack Developer",
    link: null,
    bullets: [
      "Developed an IoT-based fall detection system integrating a Raspberry Pi, camera module, and mobile application for real-time elderly monitoring.",
      "Implemented a machine learning-powered detection system to identify potential falls and automatically notify caregivers or family members during emergencies.",
      "Built full-stack features for real-time alerts, device integration, and emergency response to improve elderly safety and reduce response time.",
    ],
  },
]

const resumeEducation = {
  school: "University of Caloocan City",
  degree: "Bachelor of Science in Information Technology",
  period: "June 2023 - Present",
  coursework: [
    "Database Management",
    "Software Engineering",
    "Artificial Intelligence",
    "Programming",
    "Data Structures and Algorithms",
    "Internet of Things",
    "Web Development",
  ],
}

const resumeSkillGroups = [
  {
    label: "Language",
    items: ["React", "TypeScript", "Laravel", "PHP", "Python", "Flutter", "Kotlin", "Java", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Developer Tools",
    items: ["VS Code", "Figma", "Lovable", "Gemini", "Supabase", "Firebase"],
  },
  {
    label: "Technologies & Frameworks",
    items: ["Windows", "GitHub", "WordPress", "Excel", "Docs"],
  },
]

const heroName = "Jeffrey C. Bonina"
const heroNameParts = heroName.split(" ")

const heroStats = [
  { value: "3+", label: "YEARS EXPERIENCE" },
  { value: "40+", label: "PROJECTS COMPLETED" },
  { value: "20+", label: "HAPPY CLIENTS" },
]

function buildMenuImage(title, subtitle, accent, highlight) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#020617" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="60%" stop-color="${accent}" stop-opacity="0.18" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="900" rx="80" fill="url(#bg)" />
      <circle cx="450" cy="400" r="255" fill="url(#glow)" />
      <circle cx="650" cy="170" r="70" fill="${highlight}" fill-opacity="0.16" />
      <circle cx="250" cy="680" r="110" fill="${highlight}" fill-opacity="0.08" />
      <path d="M150 620C250 520 330 500 450 520C580 542 660 492 770 362" stroke="${highlight}" stroke-opacity="0.32" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 18" />
      <text x="70" y="220" fill="#f8fafc" font-size="82" font-family="Arial, Helvetica, sans-serif" font-weight="700">${title}</text>
      <text x="70" y="285" fill="#cbd5e1" font-size="34" font-family="Arial, Helvetica, sans-serif">${subtitle}</text>
      <text x="70" y="770" fill="#94a3b8" font-size="28" font-family="Arial, Helvetica, sans-serif">Jeffrey C. Bonina</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const serviceMenuItems = [
  {
    image: profilePic,
    link: "mailto:jeffreybonina05@gmail.com",
    title: "Introduction",
    description: "Jeffrey C. Bonina, 3rd-year BSIT student at the University of Caloocan City.",
  },
  {
    image: buildMenuImage("My Role", "Full-stack developer and technical researcher.", "#a78bfa", "#c4b5fd"),
    link: "https://www.linkedin.com/in/jeffbonina/",
    title: "My Role",
    description: "Full-stack developer and technical researcher.",
  },
  {
    image: buildMenuImage("Tech Stack", "React, Flutter, Node.js, PHP, Python, Firebase, and Supabase.", "#38bdf8", "#67e8f9"),
    link: "#services",
    title: "Tech Stack",
    description: "React, Flutter, Node.js, PHP, Python, Firebase, and Supabase.",
  },
  {
    image: buildMenuImage("Specialties", "Mobile, web, IoT, and serverless systems.", "#f59e0b", "#fbbf24"),
    link: "#services",
    title: "Specialties",
    description: "Mobile and web applications, IoT integration (Raspberry Pi, ESP32), and serverless backend architectures.",
  },
  {
    image: buildMenuImage("Focus Areas", "Security-first product thinking.", "#22d3ee", "#67e8f9"),
    link: "#services",
    title: "Focus Areas",
    description: "Developing safety and security systems, and implementing strong data privacy and cybersecurity measures.",
  },
]


function App() {
  const [activeTab, setActiveTab] = useState("Home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [projectQuery, setProjectQuery] = useState("")
  const [projectSort, setProjectSort] = useState("newest")
  const mainScrollRef = useRef(null)
  const [orbitalServiceTab, setOrbitalServiceTab] = useState(null)
  const [activeServiceTab, setActiveServiceTab] = useState("frontend")
  const activeService = servicesData.find((s) => s.id === activeServiceTab)
  const orbitalActiveService = orbitalServiceTab
    ? servicesData.find((s) => s.id === orbitalServiceTab)
    : null

  const theme = {
    shell: "bg-[#080808] text-zinc-100",
    shellOverlay: "bg-[#080808]",
    sidebar: "border-yellow-400/20 bg-zinc-950/30",
    navActive: "bg-yellow-400/12 text-yellow-100",
    navInactive: "text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-100",
    navIcon: "text-yellow-300",
  }

  const themeClasses = {
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

  const techStackLoop = techStack.map((item) => ({
    title: item.label,
    node: <item.icon className={`h-8 w-8 ${item.iconClassName ?? "text-zinc-100"}`} aria-hidden="true" />,
  }))

  const solarStars = [
    { left: "12%", top: "18%", size: 2, opacity: 0.75 },
    { left: "22%", top: "10%", size: 1.5, opacity: 0.5 },
    { left: "35%", top: "24%", size: 2.5, opacity: 0.65 },
    { left: "78%", top: "15%", size: 2, opacity: 0.6 },
    { left: "86%", top: "32%", size: 1.5, opacity: 0.5 },
    { left: "72%", top: "78%", size: 2, opacity: 0.55 },
    { left: "18%", top: "74%", size: 1.5, opacity: 0.45 },
    { left: "46%", top: "88%", size: 2.5, opacity: 0.6 },
    { left: "58%", top: "8%", size: 1.5, opacity: 0.45 },
    { left: "90%", top: "68%", size: 2, opacity: 0.7 },
  ]
  const orbitalDust = Array.from({ length: 18 }).map((_, index) => ({
    left: `${(index * 17 + 11) % 100}%`,
    top: `${(index * 29 + 7) % 100}%`,
    size: 1 + (index % 3) * 0.75,
    opacity: 0.2 + (index % 5) * 0.11,
  }))
  // --- ADDED: Services Data ---

  const nav = [
    { label: "Home", icon: Home },
    { label: "About", icon: User },
    { label: "Resume", icon: FileText },
    { label: "Projects", icon: FolderKanban },
    { label: "Tutorials", icon: BookOpen },
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Chat Room", icon: MessageSquare },
    { label: "Services", icon: BriefcaseBusiness },
    { label: "Contact", icon: Contact },
    { label: "Showcase", icon: PanelsTopLeft },
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
        stack: [SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiGithub],
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

  const contacts = [
    {
      label: "Instagram",
      href: "https://instagram.com/beaalyssalugtup",
      icon: SiInstagram,
    },
    {
      label: "Gmail",
      href: "mailto:jeffreybonina05@gmail.com",
      icon: SiGmail,
    },
    {
      label: "Facebook",
      href: "https://facebook.com/your.profile",
      icon: SiFacebook,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jeffbonina/",
      icon: Linkedin,
    },
    {
      label: "Phone",
      href: "tel:+639763726478",
      icon: Phone,
    },
  ]

  const handleNavClick = (label) => {
    setActiveTab(label)
    setIsSidebarOpen(false)
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
            <section className="hero-shell relative isolate min-h-[100svh] w-full overflow-hidden border border-yellow-400/30 bg-[#080808] px-5 py-6 shadow-[0_0_0_1px_rgba(250,204,21,0.08),0_24px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="absolute inset-0 overflow-hidden">
                <Particles
                  className="absolute inset-0 pointer-events-auto"
                  particleColors={["#ffffff"]}
                  particleCount={200}
                  particleSpread={10}
                  speed={0.1}
                  particleBaseSize={100}
                  moveParticlesOnHover={true}
                  alphaParticles={false}
                  disableRotation={false}
                  pixelRatio={1}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.38),rgba(8,8,8,0.12),rgba(8,8,8,0.38))]" />
              </div>
              <div className="pointer-events-none absolute inset-0 border border-white/5" />
              <div className="hero-bg-word pointer-events-none absolute inset-x-0 top-[25%] -translate-y-1/2 select-none text-center text-[clamp(4.2rem,15vw,15rem)] font-black uppercase leading-none tracking-[-0.08em] word-spacing:40px">
                <span className="block text-yellow-300">PORTFOLIO</span>
            
              </div>

              <div className="relative z-10 flex min-h-[calc(100svh-12rem)] flex-col">
                <div className="flex items-start justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] sm:text-[11px]">
                  <div className="space-y-1">
                    <p className="text-yellow-300">WEB DESIGNER</p>
                    <p className="text-zinc-500">DIGITAL CREATOR</p>
                  </div>

                  <div className="flex items-center gap-2 text-right text-zinc-500">
                    <span>AVAILABLE FOR FREELANCE</span>
                    <StarSparkle className="h-3.5 w-3.5 text-yellow-300" aria-hidden="true" />
                  </div>
                </div>

                <div className="relative mt-8 grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.85fr)] lg:gap-16">
                  <div className="relative z-20 max-w-2xl mt-14 lg:mt-20">
                    <p className="text-[clamp(1.4rem,2.2vw,2.1rem)] leading-none text-white" style={{ fontFamily: "cursive" }}>
                      Hello, I&apos;m
                    </p>

                    <h1 className="max-w-xl text-[clamp(2.6rem,6.2vw,5.1rem)] font-black uppercase leading-[0.86] tracking-[-0.08em] text-white">
                      <span className="block">{heroNameParts.slice(0, 2).join(" ")}</span>
                      <span className="block">{heroNameParts.slice(2).join(" ") || heroName}</span>
                    </h1>

                    <p className="mt-4 text-[clamp(0.75rem,0.95vw,0.95rem)] font-semibold uppercase tracking-[0.24em] text-yellow-400">
                      WEB DESIGNER & UI/UX CREATOR
                    </p>

                    <p className="mt-4 max-w-[30rem] text-xs leading-6 text-zinc-400 sm:text-sm">
                      I design stylish, user-focused web experiences that balance bold visuals with clear
                      structure, combining creative direction and strategy to build memorable digital products.
                    </p>

                    <div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                      <Globe className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                      <span>AVAILABLE WORLDWIDE</span>
                    </div>
                  </div>

                  <div className="relative z-20 flex flex-col justify-end gap-6 pb-8 lg:min-h-[34rem]">
                    <div className="mt-auto space-y-4 lg:ml-auto lg:max-w-[20rem]">
                      <div className="flex items-center gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-yellow-300/40 bg-yellow-300/10 text-yellow-300">
                          <Sparkles className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="max-w-[12rem] text-xs leading-5 text-zinc-300">
                          Turning ideas into powerful digital experiences.
                        </p>
                      </div>

                      <div className="space-y-0 border-t border-zinc-700/60">
                        {heroStats.map((stat, index) => (
                          <div key={stat.label} className={"flex items-start gap-4 py-3 " + (index > 0 ? "border-t border-zinc-700/60" : "") }>
                            <div className="min-w-[4.5rem] text-[clamp(1.6rem,3vw,2.6rem)] font-black leading-none text-yellow-300">
                              {stat.value}
                            </div>
                            <div className="pt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-[55%] z-30 w-[min(84vw,36rem)] -translate-x-1/2 -translate-y-1/2 lg:w-[min(40vw,38rem)]">
                    <div className="relative mx-auto aspect-[4/5] max-w-[38rem]">
                      <img
                        src={profilePic}
                        alt="Portrait of Jeffrey C. Bonina"
                        className="absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative w-full border-t border-yellow-400/20 bg-[#080808] px-5 py-3 sm:px-8 lg:px-10">
              <div className="mx-auto w-full max-w-[1800px]">
  
                <LogoLoop
                  logos={techStackLoop}
                  speed={140}
                  logoHeight={72}
                  gap={72}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#080808"
                  ariaLabel="Tech stack logo loop"
                />
              </div>
            </section>

            <section className="relative w-full overflow-hidden border-t border-yellow-400/20 bg-[#080808] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.10),rgba(8,8,8,0)_34%),radial-gradient(circle_at_top,rgba(250,204,21,0.05),rgba(8,8,8,0)_40%),linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.55))]" />
                <div className="absolute inset-0 orbital-flow" />
                {orbitalDust.map((dust, index) => (
                  <span
                    key={`${dust.left}-${dust.top}-${index}`}
                    className="absolute block rounded-full bg-yellow-100"
                    style={{
                      left: dust.left,
                      top: dust.top,
                      width: `${dust.size}px`,
                      height: `${dust.size}px`,
                      opacity: dust.opacity,
                      boxShadow: "0 0 12px rgba(250,204,21,0.4)",
                    }}
                  />
                ))}
              </div>

              <div className="relative mx-auto grid w-full max-w-[1800px] gap-12 lg:grid-cols-[minmax(460px,1fr)_minmax(0,1.1fr)] lg:items-center">
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-yellow-300">
                      Services
                    </p>
                    <h2 className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-zinc-400">
                      Solar system selector
                    </h2>
                  </div>

                  <div className="orbital-shell relative mx-auto flex aspect-square w-full max-w-[640px] items-center justify-center overflow-hidden rounded-full border border-yellow-400/10 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.14),rgba(8,8,8,0)_40%),radial-gradient(circle_at_center,rgba(255,255,255,0.04),rgba(8,8,8,0)_74%)] shadow-[inset_0_0_120px_rgba(250,204,21,0.05)]">
                    <div className="pointer-events-none absolute inset-[1.5%] rounded-full border border-yellow-400/10" />
                    <div className="pointer-events-none absolute inset-[12%] rounded-full border border-yellow-400/10" />
                    <div className="pointer-events-none absolute inset-[24%] rounded-full border border-yellow-400/10" />
                    <div className="pointer-events-none absolute inset-[36%] rounded-full border border-yellow-400/10" />
                    <div className="pointer-events-none absolute inset-[48%] rounded-full border border-yellow-400/10" />
                    <div className="pointer-events-none absolute inset-[60%] rounded-full bg-yellow-300/10 blur-3xl" />

                    <div className="absolute inset-0 orbital-track">
                      <div className="absolute inset-0">
                        {servicesData.map((service, index) => {
                          const Icon = service.icon
                          const isActive = orbitalServiceTab === service.id
                          const angle = (index / servicesData.length) * 360 - 90
                          const radius = 225

                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => setOrbitalServiceTab(service.id)}
                              className={
                                "orbital-planet group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-in-out " +
                                (isActive
                                  ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100 shadow-[0_0_0_1px_rgba(250,204,21,0.26),0_0_30px_rgba(250,204,21,0.18)]"
                                  : "border-zinc-800/80 bg-zinc-950/60 text-zinc-500 hover:border-yellow-400/30 hover:text-yellow-100")
                              }
                              aria-pressed={isActive}
                              style={{
                                "--orbit-angle": `${angle}deg`,
                                "--orbit-radius": `${radius}px`,
                              }}
                            >
                              <span className="orbital-planet__content flex h-10 w-10 items-center justify-center rounded-full border border-inherit bg-inherit">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0">
                      {solarStars.map((star, index) => (
                        <span
                          key={`${star.left}-${star.top}-${index}`}
                          className="absolute block rounded-full bg-yellow-100"
                          style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            boxShadow: "0 0 10px rgba(250,204,21,0.45)",
                          }}
                        />
                      ))}
                    </div>

                    <div className="service-sun relative z-20 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-yellow-300/35 bg-[#080808]/92 text-center shadow-[0_0_0_1px_rgba(250,204,21,0.18),0_0_80px_rgba(250,204,21,0.16)]">
                      <Sparkles className="h-8 w-8 text-yellow-300 drop-shadow-[0_0_14px_rgba(250,204,21,0.5)]" aria-hidden="true" />
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-yellow-300">
                        Available
                      </p>
                        <p className="mt-2 max-w-[8rem] text-[11px] leading-5 text-zinc-400">
                        Rotate the orbit
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[28rem] overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {orbitalActiveService ? (
                      <motion.div
                        key={orbitalServiceTab}
                        initial={{ opacity: 0, x: 120 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 120 }}
                        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                        className="service-panel h-full rounded-[2rem] border border-yellow-400/20 bg-white/[0.02] p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(250,204,21,0.06),0_28px_70px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10"
                      >
                        <div className="flex h-full flex-col gap-6">
                          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-yellow-300">
                                {orbitalActiveService.label}
                              </p>
                              <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                                {orbitalActiveService.title}
                              </h3>
                              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                                {orbitalActiveService.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 rounded-full border border-yellow-400/15 bg-yellow-400/8 px-4 py-3 text-sm text-zinc-300">
                              <div className="grid h-10 w-10 place-items-center rounded-full border border-yellow-300/30 bg-yellow-300/10 text-yellow-300">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                              </div>
                              <p className="max-w-[18rem] text-sm leading-6 text-zinc-300">
                                Highlighting the specific service you can choose to work on.
                              </p>
                            </div>
                          </div>

                          <div className="mt-auto grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                                Core Capabilities
                              </h4>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {orbitalActiveService.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-yellow-400/15 bg-yellow-400/8 px-3 py-1.5 text-xs font-medium text-zinc-300"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                                Tech & Tools
                              </h4>
                              <div className="mt-3 flex flex-wrap gap-3">
                                {orbitalActiveService.tools.map((tool) => {
                                  const ToolIcon = tool.icon

                                  return (
                                    <div
                                      key={tool.name}
                                      className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-950/40 transition-colors hover:border-yellow-400/30"
                                      title={tool.name}
                                      aria-label={tool.name}
                                    >
                                      <ToolIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: tool.color }} aria-hidden="true" />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="grid h-full min-h-[24rem] place-items-center rounded-[2rem] border border-dashed border-yellow-400/20 bg-white/[0.02] p-8 text-center text-zinc-400 backdrop-blur-md">
                        <div className="max-w-md">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-yellow-300">
                            No service selected
                          </p>
                          <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                            Rotate the orbit and select a planet to reveal the service details with a smooth ease-in animation.
                          </p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>
            <div>
              <EducationSkillsProcess />
            </div>
            <AboutInfiniteMenu />
      <div className={
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-500 " + theme.shell
      }
    >
      <div
        className={
          "relative flex h-full w-full min-h-0 overflow-hidden transition-colors duration-500 " +
          theme.shellOverlay
        }
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen((current) => !current)}
          className="hero-menu-toggle fixed right-4 top-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/35 bg-zinc-950/80 text-yellow-300 shadow-lg backdrop-blur-xl transition-transform duration-200 ease-in-out hover:scale-105"
          aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="site-sidebar"
        >
          {isSidebarOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </button>

        <AnimatePresence>
          {isSidebarOpen ? (
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-30 cursor-default border-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => setIsSidebarOpen(false)}
            />
          ) : null}
        </AnimatePresence>

        <aside
          id="site-sidebar"
          className={
            "fixed inset-y-0 left-0 z-40 w-[285px] max-w-[85vw] border-r p-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out " +
            (isSidebarOpen ? "translate-x-0" : "-translate-x-full") +
            " " +
            theme.sidebar
          }
          aria-hidden={!isSidebarOpen}
        >
          <div className="flex items-center justify-between gap-3 pr-14">
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
                    Jeffrey C. Bonina
                  </p>
                  <span className="inline-flex items-center rounded-md border border-zinc-700/80 bg-zinc-900/50 px-1.5 py-0.5 text-[10px] leading-none text-zinc-200">
                    PH
                  </span>
                </div>
                <p className="truncate text-xs text-zinc-400">@jeffreybonina</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-200 transition-colors hover:bg-zinc-800/80 hover:text-white"
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-5 space-y-1">
            {nav.map((item, index) => {
              const Icon = item.icon
              const isActive = activeTab === item.label
              const revealDelay = isSidebarOpen ? `${140 + index * 70}ms` : "0ms"

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.label)}
                  className={
                    "sidebar-link flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors " +
                    (isActive ? theme.navActive : theme.navInactive) +
                    (isSidebarOpen ? " sidebar-link--open" : "")
                  }
                  style={{ transitionDelay: revealDelay }}
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
          className="min-h-0 flex-1 overflow-y-auto p-5 pt-20 md:p-7 md:pt-20 [scroll-behavior:smooth]"
        >
          {activeTab === "Home" ? (
            <>
              <header className="mb-5">
                <h1 className={"text-md font-semibold tracking-tight transition-colors duration-500 text-zinc-100"}>
                  <TextType
                    texts={["Hello, I'm Jeffrey C. Bonina.", "Web Developer"]}
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

                <button
                  type="button"
                  onClick={() => handleNavClick("Resume")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-500"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  View My Resume
                </button>
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
            <AboutInfiniteMenu />
          ) : activeTab === "Resume" ? (
            <>
              <header className="mb-5">
                <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
                  {activeTab}
                </h1>
                <p className="mt-1 text-sm text-zinc-400">Coming soon.</p>
              </header>
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
    </>
  )
}

export default App