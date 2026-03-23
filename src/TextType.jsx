import { useEffect, useMemo, useRef, useState } from "react"

function clampNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

function getRandomIntInclusive(min, max) {
  const minSafe = Math.ceil(min)
  const maxSafe = Math.floor(max)
  return Math.floor(Math.random() * (maxSafe - minSafe + 1)) + minSafe
}

export default function TextType({
  text,
  texts,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
  className,
}) {
  const items = useMemo(() => {
    const value = Array.isArray(texts) ? texts : Array.isArray(text) ? text : []
    return value.filter((t) => typeof t === "string" && t.length > 0)
  }, [text, texts])

  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const timeoutRef = useRef(null)

  const activeText = items.length > 0 ? items[textIndex % items.length] : ""
  const shownText = activeText.slice(0, charIndex)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!activeText) return

    const baseTypingSpeed = clampNumber(typingSpeed, 75)
    const baseDeletingSpeed = clampNumber(deletingSpeed, 50)
    const pauseMs = clampNumber(pauseDuration, 1500)

    const speed = (() => {
      if (variableSpeedEnabled) {
        const min = clampNumber(variableSpeedMin, 60)
        const max = clampNumber(variableSpeedMax, 120)
        return getRandomIntInclusive(Math.min(min, max), Math.max(min, max))
      }
      return isDeleting ? baseDeletingSpeed : baseTypingSpeed
    })()

    const tick = () => {
      if (!isDeleting) {
        if (charIndex < activeText.length) {
          setCharIndex((i) => i + 1)
          return
        }

        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, pauseMs)
        return
      }

      if (charIndex > 0) {
        setCharIndex((i) => i - 1)
        return
      }

      setIsDeleting(false)
      setTextIndex((i) => (items.length === 0 ? 0 : (i + 1) % items.length))
    }

    timeoutRef.current = setTimeout(tick, speed)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [
    activeText,
    charIndex,
    deletingSpeed,
    isDeleting,
    items.length,
    pauseDuration,
    textIndex,
    typingSpeed,
    variableSpeedEnabled,
    variableSpeedMax,
    variableSpeedMin,
  ])

  const cursorStyle =
    cursorBlinkDuration && cursorBlinkDuration > 0
      ? { animationDuration: `${cursorBlinkDuration}s` }
      : undefined

  return (
    <span className={className}>
      <span>{shownText}</span>
      {showCursor ? (
        <span className="texttype-cursor" style={cursorStyle}>
          {cursorCharacter}
        </span>
      ) : null}
    </span>
  )
}
