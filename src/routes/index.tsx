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

const PROGRAMS = [
  { t: "Early Development", s: ["Early Intervention Program", "Sensory Integration"] },
  { t: "Communication", s: ["Speech & Communication Support"] },
  { t: "Learning", s: ["IQ Boosting Program", "School Readiness Program"] },
  { t: "Social & Behavioural Development", s: ["Behaviour Modification", "Social Skills Training"] },
  { t: "Play & Connection", s: ["Play Therapy & Group Therapy"] },
  { t: "Parent Support", s: ["Parent Counseling & Guidance"] },
];
const STAGES = ["Understand", "Support", "Develop", "Grow"];
const NAV = [
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

function Index() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    lenis = new Lenis({ lerp: 0.09 });
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
    <div className="relative">
      <Ribbon />
      <Nav />
      <main className="relative z-10">
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
        style={{ pathLength: len }}
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
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button onClick={() => pick("hero")} className="flex items-center gap-3 text-left" aria-label="Back to top">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground">
            J&J
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">Jack & Jane</span>
            <span className="block text-[0.6rem] font-extrabold tracking-[0.2em] text-muted-foreground">DEVELOPMENTAL CENTRE</span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => pick("centres")} className="btn hidden bg-primary text-primary-foreground sm:inline-flex">
            Admissions Open
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="btn border border-foreground/20 bg-card/80 backdrop-blur"
          >
            {open ? "CLOSE" : "MENU"}
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
              <motion.button
                onClick={() => pick("centres")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="btn mt-8 self-start bg-primary text-primary-foreground"
              >
                Admissions Open
              </motion.button>
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
  const x = useTransform(m.x, (v) => v * depth);
  const y = useTransform(m.y, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`pointer-events-none absolute ${className}`}>
      <div className="drift" style={{ animationDelay: `${depth % 5}s` }}>{children}</div>
    </motion.div>
  );
}

function Reveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} initial="h" whileInView="v" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: 0.07 }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={{ h: { y: "110%", rotate: 6, opacity: 0 }, v: { y: 0, rotate: 0, opacity: 1 } }}
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
    <section id="hero" className="relative flex min-h-svh items-center pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-[5.5rem]">
            <Reveal text="Helping Children Reach" />
            <br />
            <Reveal text="Their Full" />
            <em className="text-primary">Potential.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Specialized support and developmental programs designed to help every child learn, grow and thrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => go("about")} className="btn bg-secondary text-secondary-foreground">Explore Our Centre</button>
            <button onClick={() => go("centres")} className="btn bg-primary text-primary-foreground">Admissions Open</button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <span>Palavakkam · Neelankarai</span>
            <span className="text-muted-foreground">Hours: {HOURS}</span>
            <a href={TEL} className="underline decoration-primary decoration-2 underline-offset-4">{PHONE}</a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Float m={m} depth={30} className="left-[18%] top-[38%] w-[32%]"><Block letter="J" color="var(--color-peach)" /></Float>
          <Float m={m} depth={45} className="left-[50%] top-[46%] w-[30%]"><Block letter="&" color="var(--color-sky)" /></Float>
          <Float m={m} depth={20} className="left-[34%] top-[12%] w-[30%]"><Block letter="J" color="var(--color-sage)" /></Float>
          <Float m={m} depth={60} className="right-0 top-0 w-[18%]"><Balloon /></Float>
          <Float m={m} depth={70} className="left-0 top-[5%] w-[14%]"><Balloon color="var(--color-sky)" /></Float>
          <Float m={m} depth={25} className="bottom-[4%] right-[8%] w-[16%]"><Star /></Float>
          <Float m={m} depth={50} className="bottom-[10%] left-[4%] w-[28%]"><Cloud /></Float>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. About ---------- */
function About() {
  const m = useMouse();
  return (
    <section id="about" className="relative py-28 md:py-40">
      <Float m={m} depth={40} className="right-[8%] top-16 w-16 md:w-24"><Puzzle /></Float>
      <Float m={m} depth={25} className="bottom-12 left-[6%] w-20 md:w-28"><Plane /></Float>
      <Float m={m} depth={55} className="right-[22%] bottom-10 w-10 md:w-14"><Star /></Float>
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="eyebrow">About Jack & Jane</p>
        <h2 className="mt-5 text-4xl leading-tight md:text-6xl">
          <Reveal text="Helping Children Grow With Confidence" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          We provide specialized support and developmental programs for children to help them reach their full potential.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- 3. Services ---------- */
function ServiceCard({ p, i, n }: { p: MotionValue<number>; i: number; n: number }) {
  const d = useTransform(p, (v) => v * (n - 1) - i); // <0 upcoming, 0 active, >0 passed
  const y = useTransform(d, [-1, 0, 1], ["105%", "0%", "-6%"]);
  const scale = useTransform(d, [-1, 0, 1, 3], [1, 1, 0.92, 0.84]);
  const rotate = useTransform(d, [0, 1], [0, i % 2 ? 3 : -3]);
  const opacity = useTransform(d, [-1.2, -0.9, 0, 2, 3], [0, 1, 1, 0.6, 0]);
  return (
    <motion.article
      style={{ y, scale, rotate, opacity, zIndex: i, background: TINTS[i % TINTS.length] }}
      className="absolute inset-0 flex flex-col justify-between rounded-[2rem] border-2 border-foreground p-8 shadow-[8px_8px_0_var(--color-foreground)] md:p-12"
    >
      <span className="font-display text-7xl md:text-9xl">{String(i + 1).padStart(2, "0")}</span>
      <h3 className="text-3xl leading-tight md:text-5xl">{SERVICES[i]}</h3>
    </motion.article>
  );
}

function Services() {
  const { ref, p } = useSticky();
  const n = SERVICES.length;
  return (
    <section id="services" ref={ref} className="relative" style={{ height: `${n * 55}vh` }}>
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 md:grid-cols-[1fr_1.1fr] md:px-10">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Support Designed Around Every Child</h2>
            <Counter p={p} n={n} />
          </div>
          <div className="relative mx-auto h-[42svh] w-full max-w-lg md:h-[52svh]">
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
    <div className="mt-8 flex items-center gap-4 text-sm font-bold">
      <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
      <span className="h-0.5 w-32 overflow-hidden rounded bg-border">
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
  const d = useTransform(p, (v) => v * (n - 1) - i);
  const rotateY = useTransform(d, [-1, 0, 1], [-35, 0, 35]);
  const x = useTransform(d, [-1, 0, 1], ["60%", "0%", "-60%"]);
  const z = useTransform(d, [-1, 0, 1], [-300, 0, -300]);
  const scale = useTransform(d, [-1, 0, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(d, [-1, -0.5, 0, 0.5, 1], [0, 0.4, 1, 0.4, 0]);
  const prog = PROGRAMS[i];
  return (
    <motion.article
      style={{ rotateY, x, z, scale, opacity }}
      className="absolute inset-0 grid items-center gap-6 rounded-[2rem] border-2 border-foreground bg-card p-8 md:grid-cols-[1.3fr_1fr] md:p-12"
    >
      <div>
        <span className="font-display text-6xl text-primary">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mt-2 text-3xl leading-tight md:text-4xl">{prog.t}</h3>
        <ul className="mt-6 space-y-2">
          {prog.s.map((s) => (
            <li key={s} className="flex items-center gap-3 font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary" />{s}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto hidden w-40 md:block md:w-52" style={{ filter: "drop-shadow(6px 6px 0 var(--color-accent))" }}>
        {PROGRAM_ART[i]}
      </div>
    </motion.article>
  );
}

function Programs() {
  const { ref, p } = useSticky();
  const n = PROGRAMS.length;
  return (
    <section id="programs" ref={ref} className="relative" style={{ height: `${n * 60}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-8 px-5 md:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <p className="eyebrow">Our Programs</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">Every Child Has Their Own Journey</h2>
            <Counter p={p} n={n} />
          </div>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Our specialized services are organized into focused pathways to support each child's development.
          </p>
        </div>
        <div className="relative mx-auto h-[44svh] w-full max-w-5xl [perspective:1200px] md:h-[40svh]">
          {PROGRAMS.map((_, i) => <ProgramSlide key={i} p={p} i={i} n={n} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Approach ---------- */
const STAGE_BG = ["var(--color-sky)", "var(--color-peach)", "var(--color-sage)", "var(--color-butter)"];

function Stage({ p, i }: { p: MotionValue<number>; i: number }) {
  const d = useTransform(p, (v) => v * 3 - i);
  const opacity = useTransform(d, [-0.6, 0, 0.6], [0, 1, 0]);
  const scale = useTransform(d, [-0.6, 0, 0.6], [0.7, 1, 1.25]);
  const y = useTransform(d, [-0.6, 0, 0.6], [60, 0, -60]);
  return (
    <motion.h3 style={{ opacity, scale, y }} className="absolute text-6xl font-semibold sm:text-8xl md:text-[10rem]">
      {STAGES[i]}
    </motion.h3>
  );
}

function Approach() {
  const { ref, p } = useSticky();
  const bg = useTransform(p, [0, 0.33, 0.66, 1], STAGE_BG);
  const clip = useTransform(p, [0, 0.15], ["circle(18% at 50% 55%)", "circle(75% at 50% 55%)"]);
  return (
    <section id="approach" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-5">
        <motion.div style={{ background: bg, clipPath: clip, opacity: 0.55 }} className="absolute inset-0" />
        <div className="absolute top-24 text-center">
          <p className="eyebrow">Our Approach</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Our Approach</h2>
        </div>
        <div className="relative grid h-48 w-full place-items-center">
          {STAGES.map((_, i) => <Stage key={i} p={p} i={i} />)}
        </div>
        <div className="absolute bottom-16 flex items-center gap-3 text-sm font-bold">
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
  return <motion.span style={{ opacity: o }} className="hidden sm:inline">{label}{i < 3 && " →"}</motion.span>;
}
function ApproachCount({ p }: { p: MotionValue<number> }) {
  const i = useIndex(p, 4);
  return <span className="absolute bottom-8 text-xs font-bold tracking-widest">0{i + 1} / 04</span>;
}

/* ---------- 6. Centres + Admissions ---------- */
const seq = (i: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.5 },
  transition: { delay: i * 0.18, duration: 0.7 },
});

function Centres() {
  return (
    <section id="centres" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <p className="eyebrow">Our Centres</p>
        <div className="mt-6 grid gap-x-10 border-t-2 border-foreground md:grid-cols-2">
          {["Palavakkam", "Neelankarai"].map((c, i) => (
            <motion.h3 key={c} {...seq(i)} className="border-b border-border py-6 text-5xl md:text-7xl">{c}</motion.h3>
          ))}
          <motion.p {...seq(2)} className="py-5 text-lg"><span className="eyebrow mr-3">Hours</span>{HOURS}</motion.p>
          <motion.p {...seq(3)} className="py-5 text-lg"><span className="eyebrow mr-3">Phone</span><a href={TEL}>{PHONE}</a></motion.p>
        </div>

        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
          className="relative mt-16 overflow-hidden rounded-[2rem] bg-secondary p-10 text-secondary-foreground md:p-16"
        >
          <Star className="absolute right-8 top-8 w-14 md:w-20" />
          <p className="eyebrow">Admissions Open</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight md:text-6xl">
            Begin Your Child's <em className="text-primary">Journey</em>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={TEL} className="btn bg-primary text-primary-foreground">Enquire About Admissions</a>
            <a href={TEL} className="btn border border-secondary-foreground/30">Call {PHONE}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 7. Contact + Footer ---------- */
function Contact() {
  return (
    <section id="contact" className="relative pt-20">
      <motion.div {...seq(0)} className="mx-auto max-w-6xl px-5 md:px-10">
        <h2 className="text-4xl md:text-6xl">Get In Touch</h2>
        <a href={TEL} className="mt-6 block font-display text-5xl text-primary md:text-8xl">{PHONE}</a>
        <p className="mt-4 text-lg font-semibold">Palavakkam · Neelankarai <span className="text-muted-foreground">— {HOURS}</span></p>
      </motion.div>
      <motion.footer {...seq(1)} className="mx-auto mt-20 flex max-w-6xl flex-wrap items-end justify-between gap-6 border-t-2 border-foreground px-5 py-10 text-sm md:px-10">
        <div>
          <p className="font-display text-2xl font-semibold">JACK & JANE</p>
          <p className="text-[0.65rem] font-extrabold tracking-[0.2em] text-muted-foreground">DEVELOPMENTAL CENTRE</p>
        </div>
        <p className="font-semibold">Palavakkam · Neelankarai · {HOURS} · {PHONE}</p>
        <p className="w-full text-muted-foreground">© {new Date().getFullYear()} Jack & Jane Developmental Centre</p>
      </motion.footer>
    </section>
  );
}
