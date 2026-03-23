import { useEffect, useMemo, useRef, useState } from "react"
import {
  BadgeCheck,
  BookOpen,
  MessageSquare,
  Monitor,
  User,
  Wrench,
} from "lucide-react"
import projectsPreview from "./assets/projectImages/projectPreview.png"

function clampNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

function buildParticles(count) {
  const safeCount = Math.max(0, Math.floor(count))
  return Array.from({ length: safeCount }).map((_, i) => {
    const size = 1 + Math.random() * 2.25
    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      opacity: 0.25 + Math.random() * 0.45,
    }
  })
}

export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  spotlightRadius = 400,
  particleCount = 12,
  glowColor = "132, 0, 255",
  disableAnimations = false,
}) {
  const rootRef = useRef(null)
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false })
  const [ripples, setRipples] = useState([])

  const particles = useMemo(() => buildParticles(particleCount), [particleCount])

  useEffect(() => {
    if (disableAnimations) return

    const id = window.setInterval(() => {
      setRipples((r) => r.filter((x) => Date.now() - x.t < 900))
    }, 200)

    return () => window.clearInterval(id)
  }, [disableAnimations])

  const radius = clampNumber(spotlightRadius, 400)

  const onMove = (e) => {
    if (!enableSpotlight) return
    const el = rootRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  const onLeave = () => {
    if (!enableSpotlight) return
    setSpot((s) => ({ ...s, visible: false }))
  }

  const onClick = (e) => {
    if (!clickEffect || disableAnimations) return
    const el = rootRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setRipples((r) => [
      ...r,
      {
        id: `${Date.now()}-${Math.random()}`,
        x,
        y,
        t: Date.now(),
      },
    ])
  }

  // Tilt/magnetism intentionally not implemented; props are accepted for API parity.
  void enableTilt
  void enableMagnetism

  const glow = enableBorderGlow
    ? `0 0 0 1px rgba(${glowColor}, 0.35), 0 0 40px rgba(${glowColor}, 0.22)`
    : undefined

  const fadeTextClass = textAutoHide
    ? "group-hover:opacity-90 transition-opacity"
    : ""

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-100">Featured Sections</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Explore everything I’ve created, contributed, and accomplished.
        </p>
      </div>

      <div
        ref={rootRef}
        className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-4"
        style={glow ? { boxShadow: glow } : undefined}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {enableSpotlight ? (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: spot.visible
                ? `radial-gradient(${radius}px circle at ${spot.x}px ${spot.y}px, rgba(${glowColor}, 0.28), rgba(0,0,0,0) 60%)`
                : "transparent",
            }}
          />
        ) : null}

        {enableStars ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {particles.map((p) => (
              <span
                key={p.id}
                className={
                  "absolute block rounded-full bg-white/70 " +
                  (disableAnimations ? "" : "animate-[magicFloat_var(--d)_ease-in-out_infinite]")
                }
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                  animationDelay: `${p.delay}s`,
                  // eslint-disable-next-line no-template-curly-in-string
                  "--d": `${p.duration}s`,
                }}
              />
            ))}
          </div>
        ) : null}

        {clickEffect
          ? ripples.map((r) => (
              <span
                key={r.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: r.x,
                  top: r.y,
                  width: 10,
                  height: 10,
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, rgba(${glowColor}, 0.35), rgba(${glowColor}, 0) 70%)`,
                  animation: disableAnimations
                    ? undefined
                    : "magicRipple 900ms ease-out forwards",
                }}
              />
            ))
          : null}

        <style>
          {"@keyframes magicFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes magicRipple{0%{opacity:.9;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(26)}}"}
        </style>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Projects */}
          <div className="group/project rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5 overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  Projects
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  A selection of work across web products.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
                <BadgeCheck className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            {/* --- REPLACED WIREFRAME WITH YOUR IMAGE --- */}
            <div className="mt-4 relative h-[180px] w-full overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-900/40">
              <img 
                src={projectsPreview} 
                alt="Projects Preview" 
                className="h-full w-full object-cover object-top opacity-70 transition-transform duration-500 group-hover/project:scale-105 group-hover/project:opacity-100"
              />
              {/* Optional: Adds a dark fade at the bottom so it blends nicely */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          {/* REMOVED LEFTOVER WIREFRAME DIV HERE */}

          {/* About Me */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  About Me
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  Who I am and what I do.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                <User className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="relative h-[270px] w-[155px] rounded-[32px] border border-zinc-800/80 bg-gradient-to-b from-zinc-800/40 to-zinc-950/30 p-3">
                <div className="mx-auto mt-1 h-4 w-20 rounded-full bg-zinc-900/80" />
                <div className="mt-5 overflow-hidden rounded-2xl bg-zinc-900/60">
                  <div className="aspect-[3/4] w-full bg-gradient-to-b from-zinc-700/30 to-zinc-950/30" />
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={
                        "h-6 w-6 rounded-full " +
                        (i % 4 === 0
                          ? "bg-orange-500/80"
                          : i % 4 === 1
                            ? "bg-fuchsia-500/80"
                            : i % 4 === 2
                              ? "bg-sky-500/80"
                              : "bg-emerald-500/80")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Tools */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  Skills & Tools
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  Creating websites with modern design.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                <Wrench className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">
              <div className="grid grid-cols-6 gap-3">
                {[
                  "bg-orange-500",
                  "bg-sky-500",
                  "bg-emerald-500",
                  "bg-violet-500",
                  "bg-rose-500",
                  "bg-amber-500",
                  "bg-zinc-200 text-zinc-900",
                  "bg-zinc-700",
                  "bg-indigo-500",
                  "bg-cyan-500",
                  "bg-lime-500",
                  "bg-fuchsia-500",
                ].map((c, i) => (
                  <div
                    key={i}
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-full " +
                      c
                    }
                  >
                    <span className="text-xs font-semibold">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tutorials */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  Tutorials
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  Step-by-step guides and learning.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                <BookOpen className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">
              <div className="h-24 rounded-lg bg-gradient-to-b from-zinc-800/60 to-zinc-950/20" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-zinc-800/60" />
                <div className="h-12 rounded-lg bg-zinc-800/40" />
                <div className="h-12 rounded-lg bg-zinc-800/60" />
              </div>
            </div>
          </div>

          {/* Chat Room */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  Chat Room
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  Open space to talk and collaborate.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                <MessageSquare className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">
              <div className="h-3 w-20 rounded bg-zinc-700/70" />
              <div className="mt-2 h-3 w-32 rounded bg-zinc-800/70" />
              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Resume Chats
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/20 p-5 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={"text-sm font-semibold text-zinc-100 " + fadeTextClass}>
                  Services
                </p>
                <p className={"mt-1 text-xs text-zinc-400 " + fadeTextClass}>
                  Building creative web, software, and design solutions.
                </p>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-800/80 bg-zinc-900/40">
                <Monitor className="h-4 w-4 text-zinc-200" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 h-[142px] rounded-xl border border-zinc-800/70 bg-zinc-900/40" />

            <div className="pointer-events-none absolute bottom-4 right-4 rounded-xl border border-zinc-700/60 bg-zinc-950/20 px-3 py-2 text-xs font-semibold tracking-wider text-zinc-200">
              GUI
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}