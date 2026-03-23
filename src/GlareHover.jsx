import { useMemo, useRef, useState } from "react"

function clampNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

export default function GlareHover({
  glareColor = "#ffffff",
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  children,
  className,
  style,
}) {
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const durationMs = clampNumber(transitionDuration, 800)
  const opacity = clampNumber(glareOpacity, 0.3)
  const size = clampNumber(glareSize, 300)
  const angle = clampNumber(glareAngle, -30)

  const overlayStyle = useMemo(() => {
    return {
      opacity: isActive ? opacity : 0,
      transition: `opacity ${durationMs}ms ease`,
      background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${glareColor} 0%, rgba(255,255,255,0) ${size}px)`,
      transform: `rotate(${angle}deg)`,
    }
  }, [angle, durationMs, glareColor, isActive, opacity, pos.x, pos.y, size])

  const handleMove = (event) => {
    if (playOnce && hasPlayed) return

    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    })
  }

  const handleEnter = () => {
    if (playOnce && hasPlayed) return
    setIsActive(true)
  }

  const handleLeave = () => {
    if (playOnce && !hasPlayed) setHasPlayed(true)
    setIsActive(false)
  }

  return (
    <div
      ref={containerRef}
      className={
        "relative h-full w-full overflow-hidden" +
        (className ? ` ${className}` : "")
      }
      style={style}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={overlayStyle}
      />
    </div>
  )
}
