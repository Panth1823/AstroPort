import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ModeToggle } from "@/components/mode-toggle";
import NowPlaying from "@/components/spotify-now-playing";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Download, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import type { ReactNode } from "react";

const BLUR_FADE_DELAY = 0.04;

const sections = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  { label: "Work entries", value: DATA.work.length.toString() },
  { label: "Projects", value: DATA.projects.length.toString() },
  { label: "Hackathons", value: DATA.hackathons.length.toString() },
  { label: "Skills", value: DATA.skills.length.toString() },
];

const socials = Object.values(DATA.contact.social).filter((social) => social.navbar);

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {index} / {title}
      </span>
      <div className="h-px flex-1 bg-border/70" />
    </div>
  );
}

function CardFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-border/70 bg-card/70 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.55)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-4 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-30 mb-8 rounded-[1.5rem] border border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-card text-xs font-semibold tracking-[0.35em] text-foreground">
                {DATA.initials}
              </div>
            </div>

            <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 px-2 py-1 text-xs font-medium text-muted-foreground md:flex">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="rounded-full px-3 py-1 transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  {section.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button asChild variant="outline" className="rounded-full border-border/70 bg-card/70">
                <Link href={`mailto:${DATA.contact.email}`}>
                  <Mail className="mr-2 size-4" />
                  Email
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end xl:gap-12">
          <div className="space-y-6">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="size-3.5 text-primary" />
                Front-end developer building thoughtful products
              </div>
            </BlurFade>

            <BlurFadeText
              delay={BLUR_FADE_DELAY + 0.05}
              yOffset={10}
              className="block max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              text={DATA.name}
            />

            <BlurFade delay={BLUR_FADE_DELAY + 0.08}>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY + 0.1}>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5">
                  <Link href={`mailto:${DATA.contact.email}`}>
                    <Mail className="mr-2 size-4" />
                    Get in touch
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border/70 bg-card/60 px-5">
                  <a href="/api/resume" download>
                    <Download className="mr-2 size-4" />
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border/70 bg-card/60 px-5">
                  <Link href={DATA.contact.social.GitHub.url} target="_blank" rel="noreferrer">
                    View GitHub
                    <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full px-5 text-muted-foreground">
                  <Link href="#projects">See selected work</Link>
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY + 0.14}>
              <CardFrame className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                    Spotify
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    now playing
                  </p>
                </div>
                <NowPlaying />
              </CardFrame>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY + 0.08}>
            <CardFrame className="p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-muted/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
                <Avatar className="h-[28rem] w-full rounded-[1.5rem]">
                  <AvatarImage
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-[1.5rem] text-3xl font-semibold">
                    {DATA.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                        based in
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
                        <MapPin className="size-4 text-white/70" />
                        {DATA.location}
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
                      Available
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex h-full min-h-28 flex-col items-center justify-center rounded-2xl border border-border/60 bg-background/60 px-3 py-4 text-center"
                  >
                    <p className="text-lg font-semibold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardFrame>
          </BlurFade>
        </section>

        <div className="mt-16 space-y-20 lg:mt-20">
          <section id="about" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <SectionLabel index="01" title="about" />
            </BlurFade>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <CardFrame className="p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight">About</h2>
                  <Markdown className="prose prose-invert mt-4 max-w-none text-sm leading-7 text-muted-foreground sm:text-base">
                    {DATA.summary}
                  </Markdown>
                </CardFrame>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
                <CardFrame className="p-6 sm:p-8">
                  <h3 className="text-sm font-mono uppercase tracking-[0.35em] text-muted-foreground">
                    Quick facts
                  </h3>
                  <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <MapPin className="size-4 text-primary" />
                      <span>{DATA.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="size-4 text-primary" />
                      <a className="hover:text-foreground" href={`mailto:${DATA.contact.email}`}>
                        {DATA.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="size-4 text-primary" />
                      <a className="hover:text-foreground" href={`tel:${DATA.contact.tel}`}>
                        {DATA.contact.tel}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <Button key={social.name} asChild variant="outline" size="sm" className="rounded-full border-border/70 bg-background/60">
                        <Link href={social.url} target="_blank" rel="noreferrer">
                          <social.icon className="mr-2 size-4" />
                          {social.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardFrame>
              </BlurFade>
            </div>
          </section>

          <section id="work" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <SectionLabel index="02" title="work" />
            </BlurFade>
            <div className="space-y-4">
              {DATA.work.map((work, index) => (
                <BlurFade key={`${work.company}-${work.start}`} delay={BLUR_FADE_DELAY * 4.5 + index * 0.05}>
                  <CardFrame className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold tracking-tight">{work.title}</h3>
                          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                            {work.company}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{work.location}</p>
                      </div>
                      <div className="text-sm text-muted-foreground lg:text-right">
                        <p>
                          {work.start} - {work.end ?? "Present"}
                        </p>
                        {work.href && work.href !== "#" && (
                          <Link
                            href={work.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground"
                          >
                            Visit
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardFrame>
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="education" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <SectionLabel index="03" title="education" />
            </BlurFade>
            <div className="grid gap-4 lg:grid-cols-2">
              {DATA.education.map((education, index) => (
                <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 5.5 + index * 0.05}>
                  <CardFrame className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{education.school}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{education.degree}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {education.start} - {education.end}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span className="h-px flex-1 bg-border/70" />
                      Study
                      <span className="h-px flex-1 bg-border/70" />
                    </div>
                  </CardFrame>
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="skills" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <SectionLabel index="04" title="skills" />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6.3}>
              <CardFrame className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {DATA.skills.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant={index % 2 === 0 ? "secondary" : "outline"}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardFrame>
            </BlurFade>
          </section>

          <section id="projects" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <SectionLabel index="05" title="projects" />
            </BlurFade>
            <div className="grid gap-4 xl:grid-cols-2">
              {DATA.projects.map((project, index) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 7.5 + index * 0.05}>
                  <CardFrame className="h-full p-5 sm:p-6">
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                            {project.active && (
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                Live
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{project.dates}</p>
                        </div>
                        {project.href && project.href !== "#" && (
                          <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                              <ArrowUpRight className="size-4" />
                            </Link>
                          </Button>
                        )}
                      </div>

                      <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <Badge key={technology} variant="outline" className="rounded-full px-3 py-1.5 text-[11px] font-medium">
                            {technology}
                          </Badge>
                        ))}
                      </div>

                      {project.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.links.map((link) => (
                            <Button key={link.href} asChild variant="outline" size="sm" className="rounded-full border-border/70 bg-background/60">
                              <Link href={link.href} target="_blank" rel="noreferrer">
                                {link.icon}
                                <span className="ml-2">{link.type}</span>
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardFrame>
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="hackathons" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <SectionLabel index="06" title="hackathons" />
            </BlurFade>
            <CardFrame className="p-6 sm:p-8">
              <div className="space-y-4">
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  I’ve participated in {DATA.hackathons.length}+ hackathons and
                  use them as a fast lane for collaboration, experimentation, and shipping under pressure.
                </p>
                <div className="space-y-4">
                  {DATA.hackathons.map((hackathon, index) => (
                    <BlurFade key={`${hackathon.title}-${hackathon.dates}`} delay={BLUR_FADE_DELAY * 8.4 + index * 0.04}>
                      <div className="rounded-2xl border border-border/60 bg-background/60 p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-base font-semibold tracking-tight">{hackathon.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{hackathon.location}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{hackathon.dates}</p>
                        </div>
                        {hackathon.description && (
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">{hackathon.description}</p>
                        )}
                        {hackathon.links.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {hackathon.links.map((link, linkIndex) => (
                              <Button key={`${link.href}-${linkIndex}`} asChild variant="outline" size="sm" className="rounded-full border-border/70 bg-card/60">
                                <Link href={link.href} target="_blank" rel="noreferrer">
                                  {link.icon}
                                  <span className="ml-2">{link.title || "Open"}</span>
                                </Link>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </CardFrame>
          </section>

          <section id="contact" className="space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <SectionLabel index="07" title="contact" />
            </BlurFade>
            <CardFrame className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s build something useful.</h2>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    Open to front-end, product, and AI automation work. If you want to compare notes on design systems,
                    no-code workflows, or useful experiments, reach out.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild className="rounded-full px-5">
                    <Link href={`mailto:${DATA.contact.email}`}>
                      <Mail className="mr-2 size-4" />
                      {DATA.contact.email}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-border/70 bg-background/60 px-5">
                    <Link href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noreferrer">
                      LinkedIn
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardFrame>
          </section>
        </div>

        <footer className="mt-16 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>Built from your current portfolio content, reworked into a cooked-folio style layout.</p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.3em]">
              <span>Next.js</span>
              <span>Tailwind</span>
              <span>Framer Motion</span>
              <span>TypeScript</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}