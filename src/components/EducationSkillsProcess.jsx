import { Code2, GraduationCap, Sparkles, Target, Wrench } from "lucide-react"
import Lanyard from "../Lanyard"

const educationItems = [
  {
    title: "University of Caloocan City",
    subtitle: "Bachelor of Science in Information Technology",
    meta: "3rd year • 2023 - Present",
  },
  {
    title: "Core Focus",
    subtitle: "Web development, IoT, software engineering, and applied research",
    meta: "Hands-on learning",
  },
]

const skillGroups = [
  {
    label: "Web",
    items: ["React", "Node.js", "PHP", "Supabase"],
  },
  {
    label: "Mobile",
    items: ["Flutter", "Firebase", "Cross-platform UI"],
  },
  {
    label: "Research",
    items: ["Python", "Cybersecurity", "Data Privacy", "IoT"],
  },
]

const processSteps = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understanding goals, audience, and project requirements.",
    icon: Target,
  },
  {
    number: "02",
    title: "IDEATE",
    description: "Planning the structure, flow, and solution direction.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Crafting visual design with a focus on user experience.",
    icon: Code2,
  },
  {
    number: "04",
    title: "DEVELOP",
    description: "Building fast, responsive, and maintainable interfaces.",
    icon: Wrench,
  },
  {
    number: "05",
    title: "DELIVER",
    description: "Testing, refining, and shipping with polish.",
    icon: GraduationCap,
  },
]

function EducationSkillsProcess() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-yellow-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.06),transparent_22%),radial-gradient(circle_at_95%_20%,rgba(250,204,21,0.08),transparent_20%),linear-gradient(180deg,rgba(0,0,0,0.96),rgba(0,0,0,1))]" />
        <div className="absolute inset-y-0 left-1/3 w-px bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent" />
      </div>

      <div className="pointer-events-none absolute right-2 z-99999 h-[clamp(10rem,22vw,16rem)] w-[clamp(10rem,22vw,16rem)] sm:right-1 sm:top-6 lg:right-0 lg:top-0">
        <div className="pointer-events-auto h-full w-full">
          <Lanyard size={300} theme="dark" />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1800px] lg:grid-cols-[1.05fr_0.95fr_0.78fr]">
        <div className="flex h-full flex-col justify-between border-b border-yellow-400/15 px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r lg:px-10">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-yellow-300/90">Education & Skills</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-yellow-100 sm:text-4xl lg:text-5xl">
                Education & Skills
              </h2>
            </div>

            <div className="space-y-5">
              {educationItems.map((item) => (
                <article key={item.title} className="border-l border-yellow-400/20 pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow-300/70">
                    {item.meta}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-yellow-50 sm:text-base">{item.title}</p>
                  <p className="mt-1 max-w-md text-sm leading-6 text-yellow-100/72">{item.subtitle}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-yellow-400/15 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.34em] text-yellow-300/80">Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {skillGroups.flatMap((group) =>
                group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-yellow-400/20 bg-yellow-400/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-100/85"
                  >
                    {skill}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col border-b border-yellow-400/15 px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r lg:px-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-yellow-300/90">Work Process</p>
            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-yellow-100 sm:text-4xl">
              Work Process
            </h2>
          </div>

          <div className="mt-8 flex-1">
            <div className="relative pl-2">
              <div className="absolute left-[1.05rem] top-2 bottom-2 w-px bg-gradient-to-b from-yellow-400/35 via-yellow-300/25 to-transparent" />
              <div className="space-y-5">
                {processSteps.map((step) => {
                  const StepIcon = step.icon
                  return (
                    <article
                      key={step.number}
                      className="relative flex gap-4"
                    >
                      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-yellow-300/35 bg-black text-yellow-300 shadow-[0_0_0_1px_rgba(250,204,21,0.12),0_0_18px_rgba(250,204,21,0.14)]">
                        <StepIcon className="h-4 w-4" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 pt-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-yellow-300/70">
                          {step.number}
                        </p>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-50">
                          {step.title}
                        </p>
                        <p className="mt-1.5 max-w-md text-sm leading-6 text-yellow-100/72">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex h-full flex-col justify-between bg-gradient-to-b from-yellow-950/55 via-black to-yellow-900/45 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="text-yellow-400/90">
            <p className="text-5xl leading-none">“</p>
          </div>

          <div className="space-y-6">
            <p className="max-w-sm text-2xl font-medium leading-[1.35] text-yellow-50 sm:text-3xl">
              Good design is not just how it looks, but how clearly it works.
            </p>
            <div className="space-y-2 text-yellow-200/80">
              <p className="text-lg font-semibold italic">Jeffrey C. Bonina</p>
              <p className="max-w-xs text-sm leading-6 uppercase tracking-[0.22em] text-yellow-300/65">
                Let’s create something great together.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-yellow-400/20 pt-5">
            <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-300/70">
              <span>Visual process</span>
              <span>Yellow theme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSkillsProcess
