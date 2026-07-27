import InfiniteMenu from "./InfiniteMenu/InfiniteMenu"

const aboutItems = [
  {
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.facebook.com/",
    title: "Jeffrey C. Bonina",
    description: "3rd-year BSIT student at the University of Caloocan City.",
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.linkedin.com/",
    title: "My Role",
    description: "Full-stack developer and technical researcher.",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    link: "https://react.dev/",
    title: "Tech Stack",
    description: "React, Flutter, Node.js, PHP, Python, Firebase, and Supabase.",
  },
  {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.raspberrypi.com/",
    title: "Specialties",
    description: "Mobile and web applications, IoT integration, and serverless backend architectures.",
  },
  {
    image: "https://images.unsplash.com/photo-1510511233900-1982d92bd835?auto=format&fit=crop&w=1200&q=80",
    link: "https://owasp.org/",
    title: "Focus Areas",
    description: "Developing safety and security systems, and prioritizing strong data privacy measures.",
  },
]

const aboutMenuItems = [...aboutItems, ...aboutItems]

function AboutInfiniteMenu() {
  return (
    <section className="about-fullscreen relative min-h-[100svh] w-full overflow-hidden bg-black">
      <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center">
        <InfiniteMenu items={aboutMenuItems} scale={1.0} />
      </div>
    </section>
  )
}

export default AboutInfiniteMenu
