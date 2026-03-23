import { useEffect, useMemo, useRef, useState } from "react"

function clampNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

/**
 * LogoLoop
 * - `logos`: array of { node?: ReactNode, src?: string, alt?: string, title?: string, href?: string }
 * - `speed`: pixels per second
 */
export default function LogoLoop({
  logos = [],
  speed = 200,
  direction = "left",
  logoHeight = 60,
  gap = 100,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#ffffff",
  ariaLabel = "Logo loop",
}) {
  const firstSetRef = useRef(null)
  const [durationSeconds, setDurationSeconds] = useState(20)
  const [isHovered, setIsHovered] = useState(false)

  const items = useMemo(() => {
    return Array.isArray(logos) ? logos.filter(Boolean) : []
  }, [logos])

  useEffect(() => {
    const el = firstSetRef.current
    if (!el) return

    const update = () => {
      const pxPerSecond = clampNumber(speed, 100)
      const distance = el.scrollWidth
      if (!distance || !pxPerSecond) return
      setDurationSeconds(Math.max(1, distance / pxPerSecond))
    }

    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)

    return () => ro.disconnect()
  }, [speed, gap, logoHeight, items.length])

  const shouldPauseOnHover = hoverSpeed === 0

  const animationDirection = direction === "right" ? "reverse" : "normal"
  const playState = isHovered && shouldPauseOnHover ? "paused" : "running"

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: `${logoHeight}px` }}
    >
      <style>{"@keyframes logoLoopScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>

      {fadeOut ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, rgba(255,255,255,0))`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, rgba(255,255,255,0))`,
            }}
          />
        </>
      ) : null}

      <div
        className="flex w-max"
        style={{
          gap: `${gap}px`,
          animationName: "logoLoopScroll",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDuration: `${durationSeconds}s`,
          animationDirection,
          animationPlayState: playState,
        }}
      >
        <div ref={firstSetRef} className="flex w-max" style={{ gap: `${gap}px` }}>
          {items.map((logo, index) => (
            <LogoItem
              key={`a-${index}-${logo?.title ?? logo?.alt ?? "logo"}`}
              logo={logo}
              logoHeight={logoHeight}
              scaleOnHover={scaleOnHover}
            />
          ))}
        </div>

        <div className="flex w-max" style={{ gap: `${gap}px` }} aria-hidden="true">
          {items.map((logo, index) => (
            <LogoItem
              key={`b-${index}-${logo?.title ?? logo?.alt ?? "logo"}`}
              logo={logo}
              logoHeight={logoHeight}
              scaleOnHover={scaleOnHover}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LogoItem({ logo, logoHeight, scaleOnHover }) {
  const content = logo?.node ? (
    <span
      className={
        "grid place-items-center text-zinc-100 " +
        (scaleOnHover
          ? "transition-transform duration-200 hover:scale-110"
          : "")
      }
      style={{ height: `${logoHeight}px` }}
      title={logo?.title}
    >
      {logo.node}
    </span>
  ) : (
    <img
      src={logo?.src}
      alt={logo?.alt ?? logo?.title ?? "logo"}
      className={
        "block object-contain " +
        (scaleOnHover
          ? "transition-transform duration-200 hover:scale-110"
          : "")
      }
      style={{ height: `${logoHeight}px` }}
      title={logo?.title}
      loading="lazy"
      decoding="async"
    />
  )

  if (logo?.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center"
        aria-label={logo?.title ?? logo?.alt ?? "logo"}
      >
        {content}
      </a>
    )
  }

  return <div className="inline-flex items-center justify-center">{content}</div>
}
