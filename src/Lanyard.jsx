import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function LanyardScene({
  cardUrl,
  strapUrl,
  onToggle,
  theme = "dark",
  pullThreshold = 40,
}) {
  const groupRef = useRef(null)
  const dragStartRef = useRef(null)
  const pulledRef = useRef(false)

  const [pullOffset, setPullOffset] = useState(0)

  const [strapTexture, setStrapTexture] = useState(null)
  useEffect(() => {
    if (!strapUrl) {
      setStrapTexture(null)
      return
    }

    let cancelled = false
    const loader = new THREE.TextureLoader()

    loader.load(
      strapUrl,
      (tex) => {
        if (cancelled) return
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(1, 1)
        tex.needsUpdate = true
        setStrapTexture(tex)
      },
      undefined,
      () => {
        if (cancelled) return
        setStrapTexture(null)
      },
    )

    return () => {
      cancelled = true
    }
  }, [strapUrl])

  const hasGlb = Boolean(cardUrl)

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return

    // Simple spring-back and gentle sway.
    const targetY = -pullOffset * 0.012
    g.position.y += (targetY - g.position.y) * clamp(delta * 10, 0, 1)

    g.rotation.z += (0 - g.rotation.z) * clamp(delta * 6, 0, 1)
    g.rotation.x += (0.05 - g.rotation.x) * clamp(delta * 3, 0, 1)
  })

  const onPointerDown = (e) => {
    e.stopPropagation()

    // Capture pointer so pulling continues even if the cursor/finger
    // leaves the mesh bounds.
    e.target?.setPointerCapture?.(e.pointerId)

    dragStartRef.current = { y: e.clientY }
    pulledRef.current = false
  }

  const onPointerMove = (e) => {
    const start = dragStartRef.current
    if (!start) return

    const delta = e.clientY - start.y
    const next = clamp(delta, 0, 140)
    setPullOffset(next)

    if (!pulledRef.current && next >= pullThreshold) {
      pulledRef.current = true
      onToggle?.()
    }
  }

  const onPointerUp = (e) => {
    e?.target?.releasePointerCapture?.(e.pointerId)
    dragStartRef.current = null
    setPullOffset(0)
  }

  return (
    <group ref={groupRef}>
      {/* Strap (simple textured plane) */}
      <mesh position={[0, 1.25, -0.2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.22, 2.9]} />
        <meshStandardMaterial
          map={strapTexture ?? undefined}
          color={theme === "light" ? "#1f2937" : "#e5e7eb"}
          metalness={0.05}
          roughness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Card */}
      <group
        position={[0, -0.25, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onToggle?.()
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1.1, 1.45, 0.06]} />
              <meshStandardMaterial
                color={theme === "light" ? "#111827" : "#f3f4f6"}
                roughness={0.35}
              />
              <Html center>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "6px 8px",
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.4)",
                    color: "white",
                    backdropFilter: "blur(6px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Pull to toggle
                </div>
              </Html>
            </mesh>
          }
        >
          {hasGlb ? <CardModel url={cardUrl} /> : <FallbackCard theme={theme} />}
        </Suspense>
      </group>
    </group>
  )
}

function FallbackCard({ theme }) {
  return (
    <mesh>
      <boxGeometry args={[1.1, 1.45, 0.06]} />
      <meshStandardMaterial
        color={theme === "light" ? "#111827" : "#f3f4f6"}
        roughness={0.35}
      />
      <Html center>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "6px 8px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.4)",
            color: "white",
            backdropFilter: "blur(6px)",
            whiteSpace: "nowrap",
          }}
        >
          Pull / click
        </div>
      </Html>
    </mesh>
  )
}

function CardModel({ url }) {
  const gltf = useGLTF(url)

  // Normalize scale a bit; card models vary.
  return (
    <primitive object={gltf.scene} scale={0.85} rotation={[0.05, 0.15, 0]} />
  )
}

export default function Lanyard({
  position = [0, 0, 0],
  gravity = [0, -40, 0],
  size = 120,
  small = true,
  onToggle,
  theme = "dark",
}) {
  // position/gravity are accepted to match the API you pasted,
  // but this lightweight implementation uses a simple drag threshold.
  const [cardUrl, setCardUrl] = useState(null)
  const [strapUrl, setStrapUrl] = useState(null)

  useEffect(() => {
    let cancelled = false
    const check = async (url, setter, isValidContentType) => {
      try {
        const res = await fetch(url, { method: "HEAD" })
        if (cancelled) return

        const contentType = res.headers.get("content-type") ?? ""
        const ok = res.ok && isValidContentType(contentType)

        setter(ok ? url : null)
      } catch {
        if (cancelled) return
        setter(null)
      }
    }

    check(
      "/lanyard/card.glb",
      setCardUrl,
      (contentType) =>
        // Missing assets or SPA fallbacks often return text/html.
        !contentType.toLowerCase().includes("text/html"),
    )
    check(
      "/lanyard/lanyard.png",
      setStrapUrl,
      (contentType) => contentType.toLowerCase().startsWith("image/"),
    )

    return () => {
      cancelled = true
    }
  }, [])

  const cameraPos = small ? [0, 0.3, 3.6] : [0, 0.3, 3.2]

  const [ready, setReady] = useState(false)
  useEffect(() => {
    // Avoid layout jank during hydration/initial load.
    const t = setTimeout(() => setReady(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!ready) return null

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: cameraPos, fov: 40 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={theme === "light" ? 1.0 : 0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <directionalLight position={[-3, 2, 2]} intensity={0.45} />

        <group position={position}>
          <LanyardScene
            cardUrl={cardUrl}
            strapUrl={strapUrl}
            onToggle={onToggle}
            theme={theme}
          />
        </group>

        {/* Keep interaction predictable; disable zoom/pan. */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
