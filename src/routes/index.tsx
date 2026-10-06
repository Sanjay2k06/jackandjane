import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import { Star, Cloud, Balloon, Block, Puzzle, Plane } from "@/components/Toys";
import { CentresMap } from "@/components/CentresMap";
import {
  HeroCartoons,
  AboutCartoons,
  ServicesCartoons,
  ProgramsCartoons,
  ApproachCartoons,
  CentresCartoons,
  ContactCartoons,
} from "@/components/FloatingCartoons";
import { ScrollReveal } from "@/components/ScrollReveal";

const TITLE = "Jack & Jane Developmental Centre — Palavakkam & Neelankarai";
const DESC =
  "Specialized support and developmental programs for children to help them reach their full potential. Palavakkam · Neelankarai.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

const PHONE = "73972 71374";
const TEL = "tel:+917397271374";
const WHATSAPP_URL = "https://wa.me/917397271374";
const HOURS = "2:00 PM – 8:00 PM";

const SERVICES = [
  "Behaviour Modification",
  "IQ Boosting Program",
  "Early Intervention Program",
  "Speech & Communication Support",
  "Sensory Integration",
  "School Readiness Program",
  "Social Skills Training",
  "Play Therapy & Group Therapy",
  "Parent Counseling & Guidance",
];
const TINTS = ["var(--color-peach)", "var(--color-sky)", "var(--color-sage)", "var(--color-butter)", "var(--color-blush)"];

type ProgramItem = {
  t: string;
  s: string[];
  img?: string;
  alt?: string;
};

const PROGRAMS: ProgramItem[] = [
  {
    t: "Early Development",
    s: ["Early Intervention Program", "Sensory Integration"],
    img: "/assets/images/sensory-integration.jpeg",
    alt: "Child exploring sensory rice bowls during tactile integration session",
  },
  {
    t: "Communication",
    s: ["Speech & Communication Support"],
    img: "/assets/images/speech-therapy.jpeg",
    alt: "Child training with oral motor breathing spirometer during speech support",
  },
  {
    t: "Learning",
    s: ["IQ Boosting Program", "School Readiness Program"],
    img: "/assets/images/learning-program.jpeg",
    alt: "School readiness and cognitive skill enhancement sessions",
  },
  {
    t: "Social & Behavioural Development",
    s: ["Behaviour Modification", "Social Skills Training"],
    img: "/assets/images/motor-skills.jpeg",
    alt: "Child practicing balance and coordination on movement and agility mat",
  },
  {
    t: "Play & Connection",
    s: ["Play Therapy & Group Therapy"],
    img: "/assets/images/art-activities.jpeg",
    alt: "Children proudly showing creative drawings during group play therapy",
  },
  {
    t: "Parent Support",
    s: ["Parent Counseling & Guidance"],
    img: "/assets/images/parent-support.jpeg",
    alt: "Parent counseling and family guidance collaborative session",
  },
];
const STAGES = ["Understand", "Support", "Develop", "Grow"];
const NAV: [string, string][] = [
  ["About", "about"],
  ["Services", "services"],
  ["Programs", "programs"],
  ["Our Approach", "approach"],
  ["Our Centres", "centres"],
  ["Contact", "contact"],
];

let lenis: Lenis | null = null;
const go = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  lenis ? lenis.scrollTo(el, { offset: 0 }) : el.scrollIntoView({ behavior: "smooth" });
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function Index() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    // On mobile / touch devices, native momentum scrolling is 120Hz/60Hz hardware accelerated.
    // Disabling Lenis virtual loop on touch screens eliminates touch-scroll stutter and vibration completely!
    if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    let id = 0;
    const raf = (t: number) => {
      lenis?.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduce]);

  return (
    <div className="relative overflow-x-clip">
      <Ribbon />
      <Nav />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <Programs />
        <Approach />
        <Centres />
        <Contact />
      </main>
    </div>
  );
}

/* ---------- Global ribbon ---------- */
function Ribbon() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const len = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M88 20 C 60 40, 20 50, 30 90 S 90 130, 75 180 S 10 220, 18 290 S 85 340, 82 420 S 15 470, 12 540 S 90 600, 86 670 S 20 720, 22 790 S 80 850, 70 900 S 30 960, 50 995"
        fill="none"
        stroke="var(--color-primary)"
        strokeOpacity={0.55}
        strokeWidth={10}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: isMobile ? scrollYProgress : len }}
      />
    </svg>
  );
}

/* ---------- Navigation ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const pick = (id: string) => {
    setOpen(false);
    setTimeout(() => go(id), 150);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-border/50 bg-background shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 md:px-10">
        <button onClick={() => pick("hero")} className="group flex items-center gap-2 sm:gap-3 text-left" aria-label="Back to top">
          <img
            src="/assets/images/logo.jpeg"
            alt="Jack and Jane Developmental Centre Logo"
            onError={(e) => {
              const current = e.currentTarget.src;
              if (current.includes("/assets/images/")) {
                e.currentTarget.src = current.replace("/assets/images/", "/images/");
              } else if (current.includes("/images/")) {
                e.currentTarget.src = current.replace("/images/", "/assets/images/");
              }
            }}
            className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.12)] ring-1 ring-foreground/20 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="leading-tight">
            <span className="block font-display text-sm sm:text-lg font-semibold">Jack & Jane</span>
            <span className="block text-[0.5rem] sm:text-[0.6rem] font-extrabold tracking-[0.16em] sm:tracking-[0.2em] text-muted-foreground">DEVELOPMENTAL CENTRE</span>
          </span>
        </button>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-primary text-primary-foreground text-[11px] sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2.5 inline-flex items-center gap-1 sm:gap-1.5 shadow-sm hover:opacity-95"
            aria-label="Admissions Open - Chat on WhatsApp"
          >
            <span>Admissions Open</span>
            <span className="hidden md:inline font-normal opacity-90">— Get Started</span>
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="btn border-2 border-foreground bg-card/90 backdrop-blur p-2 sm:px-3 sm:py-2 flex items-center justify-center text-foreground hover:bg-card shadow-[2px_2px_0_var(--color-foreground)] transition-all active:translate-x-[1px] active:translate-y-[1px]"
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 -z-10 bg-foreground/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              className="fixed right-0 top-0 -z-[5] flex h-svh w-full max-w-md flex-col justify-center gap-2 bg-secondary px-10 text-secondary-foreground"
            >
              {NAV.map(([label, id], i) => (
                <motion.button
                  key={id}
                  onClick={() => pick(id)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                  className="group flex items-baseline gap-4 text-left font-display text-4xl hover:text-primary"
                >
                  <span className="font-sans text-xs font-bold opacity-60">0{i + 1}</span>
                  {label}
                </motion.button>
              ))}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="btn mt-8 self-start bg-primary text-primary-foreground text-base shadow-[4px_4px_0_var(--color-foreground)] inline-flex items-center gap-2"
              >
                Admissions Open — Get Started
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- helpers ---------- */
function useMouse() {
  const x = useMotionValue(0), y = useMotionValue(0);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const m = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return { x: useSpring(x, { stiffness: 50, damping: 15 }), y: useSpring(y, { stiffness: 50, damping: 15 }) };
}

function Float({ m, depth, className, children }: { m: ReturnType<typeof useMouse>; depth: number; className: string; children: ReactNode }) {
  const isMobile = useIsMobile();
  const effDepth = isMobile ? depth * 0.5 : depth;
  const x = useTransform(m.x, (v) => v * effDepth);
  const y = useTransform(m.y, (v) => v * effDepth);
  return (
    <motion.div style={{ x, y }} className={`pointer-events-none absolute ${className}`}>
      <div className="drift" style={{ animationDelay: `${depth % 5}s` }}>{children}</div>
    </motion.div>
  );
}

function Reveal({ text, className }: { text: string; className?: string }) {
  const isMobile = useIsMobile();
  return (
    <motion.span className={className} initial="h" whileInView="v" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: isMobile ? 0.04 : 0.07 }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              h: { y: isMobile ? "60%" : "110%", rotate: isMobile ? 3 : 6, opacity: 0 },
              v: { y: 0, rotate: 0, opacity: 1 },
            }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function useSticky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return { ref, p: scrollYProgress };
}

function useIndex(p: MotionValue<number>, n: number) {
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => setI(Math.min(n - 1, Math.round(v * (n - 1)))));
  return i;
}

/* ---------- 1. Hero ---------- */
function Hero() {
  const m = useMouse();
  return (
    <section id="hero" className="relative flex min-h-svh flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24">
      <HeroCartoons />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 md:gap-10 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <h1 className="text-3.5xl font-semibold leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <Reveal text="Helping Children Reach" />
            <br />
            <Reveal text="Their Full" />
            <em className="text-primary">Potential.</em>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Specialized support and developmental programs designed to help every child learn, grow and thrive.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
            <button onClick={() => go("about")} className="btn bg-secondary text-secondary-foreground text-xs sm:text-sm px-4 py-2.5 justify-center text-center">Explore Our Centre</button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 text-xs sm:text-sm px-4 py-2.5 text-center"
            >
              Admissions Open — Get Started
            </a>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-sm sm:text-base font-bold text-foreground">
            <span className="font-extrabold text-foreground">Palavakkam · Neelankarai</span>
            <span className="font-bold text-foreground">
              Hours: <strong className="font-extrabold text-foreground">{HOURS}</strong>
            </span>
            <a
              href={TEL}
              className="font-extrabold text-primary underline decoration-primary decoration-2 underline-offset-4 hover:opacity-85 transition-opacity"
            >
              {PHONE}
            </a>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-md sm:max-w-lg items-center justify-center lg:max-w-xl">
          <div className="relative w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border-2 border-foreground bg-card shadow-[6px_6px_0_var(--color-foreground)] sm:shadow-[8px_8px_0_var(--color-foreground)] transition-transform duration-300 hover:-translate-y-1">
            <img
              src="/assets/images/hero_image.jpeg"
              alt="Jack & Jane Developmental Centre Children Learning & Growth"
              onError={(e) => {
                const current = e.currentTarget.src;
                if (current.includes("/assets/images/")) {
                  e.currentTarget.src = current.replace("/assets/images/", "/images/");
                } else if (current.includes("/images/")) {
                  e.currentTarget.src = current.replace("/images/", "/assets/images/");
                }
              }}
              className="h-auto w-full max-h-[300px] sm:max-h-[380px] md:max-h-[460px] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const GALLERY_ITEMS = [
  {
    src: "/assets/images/art-activities.jpeg",
    title: "Creative Art & Group Play",
    desc: "Children celebrating their artwork together, building social confidence and peer interaction.",
    badge: "Group Therapy",
    tint: "var(--color-peach)",
  },
  {
    src: "/assets/images/speech-therapy.jpeg",
    title: "Speech & Oral-Motor Care",
    desc: "Targeted breath flow and articulation exercises using specialized clinical instruments.",
    badge: "Speech Support",
    tint: "var(--color-sky)",
  },
  {
    src: "/assets/images/sensory-integration.jpeg",
    title: "Sensory Integration",
    desc: "Tactile exploration with sensory rice bins supporting sensory regulation and motor focus.",
    badge: "Sensory Therapy",
    tint: "var(--color-sage)",
  },
  {
    src: "/assets/images/motor-skills.jpeg",
    title: "Motor Skills & Agility",
    desc: "Interactive balance and spatial coordination activities on structured movement mats.",
    badge: "Active Growth",
    tint: "var(--color-butter)",
  },
  {
    src: "/assets/images/parent-support.jpeg",
    title: "Parent Guidance & Counseling",
    desc: "Collaborative counseling empowering families with home routines and developmental milestones.",
    badge: "Parent Support",
    tint: "var(--color-blush)",
  },
  {
    src: "/assets/images/learning-program.jpeg",
    title: "School Readiness & IQ Boosting",
    desc: "Structured cognitive milestones and foundational learning for academic and social confidence.",
    badge: "School Readiness",
    tint: "var(--color-sky)",
  },
];

/* ---------- 2. About ---------- */
function About() {
  const m = useMouse();
  const isMobile = useIsMobile();
  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-36">
      <AboutCartoons />
      <Float m={m} depth={40} className="right-[8%] top-16 w-12 sm:w-16 md:w-24 hidden sm:block"><Puzzle /></Float>
      <Float m={m} depth={25} className="bottom-12 left-[6%] w-16 sm:w-20 md:w-28 hidden sm:block"><Plane /></Float>
      <Float m={m} depth={55} className="right-[22%] bottom-10 w-8 sm:w-10 md:w-14 hidden sm:block"><Star /></Float>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p className="eyebrow font-black text-xs sm:text-sm tracking-[0.24em]">
          <strong className="font-black">About Jack & Jane</strong>
        </p>
        <ScrollReveal
          as="h2"
          containerClassName="mt-3 sm:mt-5 text-center"
          textClassName="text-2.5xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold text-foreground font-display"
          baseOpacity={0.15}
          enableBlur={true}
          baseRotation={2}
          blurStrength={3}
        >
          Helping Children Grow With Confidence
        </ScrollReveal>
        <ScrollReveal
          as="p"
          containerClassName="mx-auto mt-4 sm:mt-6 max-w-xl text-center"
          textClassName="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
          baseOpacity={0.15}
          enableBlur={true}
          baseRotation={2}
          blurStrength={3}
        >
          We provide specialized support and developmental programs for children to help them reach their full potential.
        </ScrollReveal>
      </div>

      <div className="relative mx-auto mt-10 sm:mt-16 max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: isMobile ? 16 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * (isMobile ? 0.08 : 0.12), duration: 0.6 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] border-2 border-foreground bg-card shadow-[6px_6px_0_var(--color-foreground)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-foreground bg-muted">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={(e) => {
                    const current = e.currentTarget.src;
                    if (current.includes("/assets/images/")) {
                      e.currentTarget.src = current.replace("/assets/images/", "/images/");
                    } else if (current.includes("/images/")) {
                      e.currentTarget.src = current.replace("/images/", "/assets/images/");
                    }
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <span
                  style={{ background: item.tint }}
                  className="absolute left-3 top-3 rounded-full border border-foreground px-3 py-1 text-xs font-bold text-foreground shadow-[2px_2px_0_var(--color-foreground)]"
                >
                  {item.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Services ---------- */
function ServiceCard({ p, i, n }: { p: MotionValue<number>; i: number; n: number }) {
  const isMobile = useIsMobile();
  const d = useTransform(p, (v) => v * (n - 1) - i); // <0 upcoming, 0 active, >0 passed
  const rotVal = isMobile ? 1.5 : 3;
  const y = useTransform(d, [-1, 0, 1], isMobile ? ["102%", "0%", "-3.5%"] : ["105%", "0%", "-6%"]);
  const scale = useTransform(d, [-1, 0, 1, 3], isMobile ? [1, 1, 0.95, 0.90] : [1, 1, 0.92, 0.84]);
  const rotate = useTransform(d, [0, 1], [0, i % 2 ? rotVal : -rotVal]);
  const opacity = useTransform(d, [-1.2, -0.9, 0, 1.8, 2.5], [0, 1, 1, 0.5, 0]);
  return (
    <motion.article
      style={{ y, scale, rotate, opacity, zIndex: i, background: TINTS[i % TINTS.length]! }}
      className="absolute inset-0 flex flex-col justify-between rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem] border-2 border-foreground p-4 sm:p-7 md:p-12 shadow-[4px_4px_0_var(--color-foreground)] sm:shadow-[6px_6px_0_var(--color-foreground)] md:shadow-[8px_8px_0_var(--color-foreground)] select-none"
    >
      <span className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold leading-none">{String(i + 1).padStart(2, "0")}</span>
      <h3 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">{SERVICES[i]}</h3>
    </motion.article>
  );
}

function Services() {
  const { ref, p } = useSticky();
  const n = SERVICES.length;
  return (
    <section id="services" ref={ref} className="relative w-full max-w-full box-border" style={{ height: `${n * 55}vh` }}>
      <div className="sticky top-0 flex h-svh items-center">
        <ServicesCartoons />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-4 sm:gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] md:px-10">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-6xl leading-tight">Support Designed Around Every Child</h2>
            <Counter p={p} n={n} />
          </div>
          <div className="relative mx-auto h-[32svh] sm:h-[42svh] md:h-[52svh] min-h-[200px] sm:min-h-[270px] md:min-h-[360px] w-full max-w-[92vw] sm:max-w-md md:max-w-lg">
            {SERVICES.map((_, i) => <ServiceCard key={i} p={p} i={i} n={n} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ p, n }: { p: MotionValue<number>; n: number }) {
  const i = useIndex(p, n);
  return (
    <div className="mt-4 sm:mt-8 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
      <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
      <span className="h-0.5 w-24 sm:w-32 overflow-hidden rounded bg-border">
        <motion.span className="block h-full origin-left bg-primary" style={{ scaleX: p }} />
      </span>
    </div>
  );
}

/* ---------- 4. Programs ---------- */
const PROGRAM_ART = [
  <Block key="a" letter="A" color="var(--color-peach)" />,
  <Plane key="b" />,
  <Block key="c" letter="B" color="var(--color-sky)" />,
  <Puzzle key="d" />,
  <Balloon key="e" color="var(--color-blush)" />,
  <Star key="f" />,
];

function ProgramSlide({ p, i, n }: { p: MotionValue<number>; i: number; n: number }) {
  const isMobile = useIsMobile();
  const d = useTransform(p, (v) => v * (n - 1) - i);
  const rotYVal = isMobile ? 16 : 35;
  const zVal = isMobile ? -140 : -300;
  const xVal = isMobile ? ["28%", "0%", "-28%"] : ["60%", "0%", "-60%"];
  const scaleVal = isMobile ? [0.91, 1, 0.91] : [0.8, 1, 0.8];

  const rotateY = useTransform(d, [-1, 0, 1], [-rotYVal, 0, rotYVal]);
  const x = useTransform(d, [-1, 0, 1], xVal);
  const z = useTransform(d, [-1, 0, 1], [zVal, 0, zVal]);
  const scale = useTransform(d, [-1, 0, 1], scaleVal);
  const opacity = useTransform(d, [-1, -0.6, 0, 0.6, 1], [0, 0.45, 1, 0.45, 0]);
  const prog = PROGRAMS[i]!;
  return (
    <motion.article
      style={{ rotateY, x, z, scale, opacity }}
      className="absolute inset-0 grid grid-cols-[1.15fr_0.85fr] sm:grid-cols-[1.2fr_1fr] items-center gap-3 sm:gap-6 overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2rem] border-2 border-foreground bg-card p-3.5 sm:p-6 md:p-8 lg:p-10 shadow-[4px_4px_0_var(--color-foreground)] sm:shadow-[6px_6px_0_var(--color-foreground)] md:shadow-[8px_8px_0_var(--color-foreground)] select-none"
    >
      <div className="flex flex-col justify-center min-w-0">
        <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mt-0.5 sm:mt-2 text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight line-clamp-2">{prog.t}</h3>
        <ul className="mt-1 sm:mt-3 space-y-1 sm:space-y-2 md:mt-5">
          {prog.s.map((s) => (
            <li key={s} className="flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm font-semibold leading-snug">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-primary" />
              <span className="truncate">{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto flex h-full max-h-[140px] sm:max-h-[220px] md:max-h-[280px] w-full items-center justify-center">
        {prog.img ? (
          <div className="relative h-full max-h-[130px] sm:max-h-[200px] md:max-h-[260px] w-auto aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-foreground bg-muted shadow-[3px_3px_0_var(--color-foreground)] sm:shadow-[5px_5px_0_var(--color-foreground)]">
            <img
              src={prog.img}
              alt={prog.alt ?? prog.t}
              onError={(e) => {
                const current = e.currentTarget.src;
                if (current.includes("/assets/images/")) {
                  e.currentTarget.src = current.replace("/assets/images/", "/images/");
                } else if (current.includes("/images/")) {
                  e.currentTarget.src = current.replace("/images/", "/assets/images/");
                }
              }}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        ) : (
          <div className="mx-auto flex max-h-[130px] sm:max-h-[200px] md:max-h-[260px] w-24 sm:w-32 md:w-44 items-center justify-center" style={{ filter: "drop-shadow(4px 4px 0 var(--color-accent))" }}>
            {PROGRAM_ART[i]}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function Programs() {
  const { ref, p } = useSticky();
  const n = PROGRAMS.length;
  return (
    <section id="programs" ref={ref} className="relative w-full max-w-full box-border" style={{ height: `${n * 60}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-3 sm:gap-6 px-4 sm:px-6 md:gap-8 md:px-10">
        <ProgramsCartoons />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="eyebrow">Our Programs</p>
          <div className="mt-1 sm:mt-2 flex flex-wrap items-end justify-between gap-2 sm:gap-3 md:mt-3">
            <ScrollReveal
              as="h2"
              containerClassName="max-w-xl"
              textClassName="text-2xl sm:text-3xl md:text-5xl leading-tight font-semibold text-foreground font-display"
              baseOpacity={0.15}
              enableBlur={true}
              baseRotation={2}
              blurStrength={3}
            >
              Every Child Has Their Own Journey
            </ScrollReveal>
            <Counter p={p} n={n} />
          </div>
          <ScrollReveal
            as="p"
            containerClassName="mt-1 sm:mt-2 max-w-lg"
            textClassName="text-xs sm:text-sm md:text-base text-muted-foreground"
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={2}
            blurStrength={3}
          >
            Our specialized services are organized into focused pathways to support each child's development.
          </ScrollReveal>
        </div>
        <div className="relative mx-auto h-[32svh] sm:h-[42svh] md:h-[48svh] min-h-[210px] sm:min-h-[320px] max-h-[460px] w-full max-w-5xl [perspective:900px] md:[perspective:1200px]">
          {PROGRAMS.map((_, i) => <ProgramSlide key={i} p={p} i={i} n={n} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Approach ---------- */
const STAGE_BG = ["var(--color-sky)", "var(--color-peach)", "var(--color-sage)", "var(--color-butter)"];

function Stage({ p, i }: { p: MotionValue<number>; i: number }) {
  const isMobile = useIsMobile();
  const d = useTransform(p, (v) => v * 3 - i);
  const opacity = useTransform(d, [-0.6, 0, 0.6], [0, 1, 0]);
  const scale = useTransform(d, [-0.6, 0, 0.6], isMobile ? [0.88, 1, 1.10] : [0.7, 1, 1.25]);
  const y = useTransform(d, [-0.6, 0, 0.6], isMobile ? [25, 0, -25] : [60, 0, -60]);
  return (
    <motion.h3
      style={{ opacity, scale, y }}
      className="absolute text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-semibold text-center tracking-tight px-4"
    >
      {STAGES[i]}
    </motion.h3>
  );
}

function Approach() {
  const { ref, p } = useSticky();
  const bg = useTransform(p, [0, 0.33, 0.66, 1], STAGE_BG);
  const clip = useTransform(p, [0, 0.15], ["circle(18% at 50% 55%)", "circle(75% at 50% 55%)"]);

  return (
    <section id="approach" ref={ref} className="relative h-[320vh] w-full max-w-full box-border">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <ApproachCartoons />
        <motion.div style={{ background: bg, clipPath: clip, opacity: 0.55 }} className="absolute inset-0 pointer-events-none" />
        <div className="absolute top-14 sm:top-20 md:top-24 text-center px-4 z-10">
          <p className="eyebrow">Our Approach</p>
          <h2 className="mt-1 sm:mt-2 text-2.5xl sm:text-3xl md:text-4xl font-semibold">Our Approach</h2>
        </div>
        <div className="relative grid h-40 sm:h-48 w-full place-items-center z-10">
          {STAGES.map((_, i) => <Stage key={i} p={p} i={i} />)}
        </div>
        <div className="absolute bottom-14 sm:bottom-16 flex flex-wrap justify-center items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-bold z-10 px-4">
          {STAGES.map((s, i) => (
            <StageDot key={s} p={p} i={i} label={s} />
          ))}
        </div>
        <ApproachCount p={p} />
      </div>
    </section>
  );
}
function StageDot({ p, i, label }: { p: MotionValue<number>; i: number; label: string }) {
  const o = useTransform(p, (v) => (Math.round(v * 3) >= i ? 1 : 0.35));
  return <motion.span style={{ opacity: o }} className="inline">{label}{i < 3 && " →"}</motion.span>;
}
function ApproachCount({ p }: { p: MotionValue<number> }) {
  const i = useIndex(p, 4);
  return <span className="absolute bottom-6 sm:bottom-8 text-xs font-bold tracking-widest z-10">0{i + 1} / 04</span>;
}

/* ---------- 6. Centres + Admissions ---------- */
const seq = (i: number, isMobile = false) => ({
  initial: {
    opacity: 0,
    y: isMobile ? 15 : 30,
    filter: isMobile ? "blur(3px)" : "blur(6px)",
  },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.3 },
  transition: { delay: i * (isMobile ? 0.1 : 0.18), duration: 0.7 },
});

function Centres() {
  return (
    <section id="centres" className="relative pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16">
      <CentresCartoons />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <ScrollReveal
            as="p"
            containerClassName="inline-block"
            textClassName="eyebrow block"
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={2}
            blurStrength={3}
          >
            Our Centres
          </ScrollReveal>
          <div className="mt-2 sm:mt-3 flex flex-wrap items-end justify-between gap-3 sm:gap-4">
            <h2 className="max-w-2xl text-2.5xl sm:text-4xl md:text-5xl leading-tight font-semibold">
              Palavakkam & Neelankarai
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
              Hours: <span className="text-foreground font-bold">{HOURS}</span> · Phone:{" "}
              <a href={TEL} className="underline decoration-primary underline-offset-4 text-foreground font-bold">
                {PHONE}
              </a>
            </p>
          </div>
        </div>

        {/* Editorial Split Layout Map & Location Selector */}
        <CentresMap />
      </div>
    </section>
  );
}

/* ---------- 7. Contact + Footer ---------- */
function Contact() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" className="relative pt-12 md:pt-16">
      <ContactCartoons />
      <motion.div {...seq(0, isMobile)} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <ScrollReveal
          as="h2"
          containerClassName="block"
          textClassName="text-3xl sm:text-4xl md:text-6xl font-semibold text-foreground font-display"
          baseOpacity={0.15}
          enableBlur={true}
          baseRotation={2}
          blurStrength={3}
        >
          Get In Touch
        </ScrollReveal>
        <a href={TEL} className="mt-4 sm:mt-6 block font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-primary break-all sm:break-normal">{PHONE}</a>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground">
          Palavakkam · Neelankarai <span className="font-extrabold text-foreground">— Hours: {HOURS}</span>
        </p>
      </motion.div>
      <motion.footer {...seq(1, isMobile)} className="relative z-10 mx-auto mt-16 sm:mt-20 flex max-w-6xl flex-col sm:flex-row flex-wrap items-start sm:items-end justify-between gap-6 border-t-2 border-foreground px-4 sm:px-6 md:px-10 py-8 sm:py-10 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/logo.jpeg"
            alt="Jack and Jane Developmental Centre Logo"
            onError={(e) => {
              const current = e.currentTarget.src;
              if (current.includes("/assets/images/")) {
                e.currentTarget.src = current.replace("/assets/images/", "/images/");
              } else if (current.includes("/images/")) {
                e.currentTarget.src = current.replace("/images/", "/assets/images/");
              }
            }}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-1 ring-foreground/20 shadow-xs"
          />
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold">JACK & JANE</p>
            <p className="text-[0.6rem] sm:text-[0.65rem] font-extrabold tracking-[0.2em] text-muted-foreground">DEVELOPMENTAL CENTRE</p>
          </div>
        </div>
        <p className="font-bold text-foreground">Palavakkam · Neelankarai · Hours: {HOURS} · {PHONE}</p>
        <p className="w-full text-muted-foreground">© {new Date().getFullYear()} Jack & Jane Developmental Centre</p>
      </motion.footer>
    </section>
  );
}
