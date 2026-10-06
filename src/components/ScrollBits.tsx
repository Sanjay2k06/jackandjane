import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

/* ScrollReveal — word-by-word, scroll-linked opacity + blur + rotation correction */
function Word({ p, i, n, w, blur }: { p: MotionValue<number>; i: number; n: number; w: string; blur: number }) {
  const a = i / n, b = Math.min(1, a + 1.5 / n + 0.15);
  const opacity = useTransform(p, [a, b], [0.1, 1]);
  const filter = useTransform(p, [a, b], [`blur(${blur}px)`, "blur(0px)"]);
  return <motion.span style={{ opacity, filter }} className="inline-block">{w}&nbsp;</motion.span>;
}
export function ScrollReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const rotate = useTransform(p, [0, 1], [reduce ? 0 : 2, 0]);
  const words = text.split(" ");
  return (
    <motion.span ref={ref} style={{ rotate, transformOrigin: "0% 50%" }} className={`inline-block ${className ?? ""}`}>
      {words.map((w, i) => <Word key={i} p={p} i={i} n={words.length} w={w} blur={reduce ? 0 : 3} />)}
    </motion.span>
  );
}

/* FlowingMenu — hover a row, a marquee layer slides in from the nearest edge */
export function FlowingMenu({ items, art }: { items: string[]; art: ReactNode[] }) {
  const enter = (e: React.MouseEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.dataset.from = e.clientY - r.top < r.height / 2 ? "top" : "bottom";
  };
  return (
    <ul className="border-t border-border">
      {items.map((t, i) => (
        <li key={t} onMouseEnter={enter} onMouseLeave={enter} className="flow-row group relative overflow-hidden border-b border-border">
          <div className="flex items-center gap-5 py-5 md:py-6">
            <span className="w-8 text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-2xl md:text-4xl">{t}</span>
          </div>
          <div className="flow-marquee pointer-events-none absolute inset-0 hidden items-center bg-primary text-primary-foreground md:flex" aria-hidden>
            <div className="flow-track flex shrink-0 items-center gap-8 whitespace-nowrap">
              {[0, 1, 2, 3, 0, 1, 2, 3].map((k, j) => (
                <span key={j} className="flex items-center gap-8 font-display text-3xl md:text-4xl">
                  {t}<span className="inline-block w-10">{art[(i + k) % art.length]}</span>
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ScrollStack — sticky cards that stack and scale as you scroll */
function StackItem({ p, i, n, children }: { p: MotionValue<number>; i: number; n: number; children: ReactNode }) {
  const target = 0.88 + i * 0.025;
  const scale = useTransform(p, [i / n, 1], [1, Math.min(1, target)]);
  return (
    <motion.div style={{ scale, top: `calc(14svh + ${i * 28}px)` }} className="sticky mb-20 origin-top last:mb-0">
      {children}
    </motion.div>
  );
}
export function ScrollStack({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="pb-[10svh]">
      {children.map((c, i) => <StackItem key={i} p={p} i={i} n={children.length}>{c}</StackItem>)}
    </div>
  );
}
