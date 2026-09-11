import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowRight, Clock, MouseIcon, Palette, Printer } from "lucide-react";
import { Reveal } from "./reveal";

const CupScene = lazy(() => import("./CupScene"));

const floating = [
  { icon: Printer, text: "Печать от 10 000 шт.", pos: "left-2 top-28 sm:left-6 lg:left-10" },
  {
    icon: Clock,
    text: "Срок производства от 14 дней",
    pos: "right-2 top-1/3 sm:right-6 lg:right-10",
  },
  { icon: Palette, text: "100% под ваш дизайн", pos: "bottom-32 left-4 sm:left-10 lg:left-20" },
];

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      progress.current = p;
      setScrolled(p > 0.06);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="top" ref={wrapRef} className="relative h-[185vh] sm:h-[260vh]">
      {/* pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="glow-bg pointer-events-none absolute inset-x-0 -top-40 h-[620px]" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[16vw] font-bold leading-none text-foreground/[0.035]"
        >
          SMART BRANDING
        </span>

        {/* 3D cup */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="hero-cup h-[42vh] w-full max-w-[300px] sm:h-[70vh] sm:max-w-[520px]">
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <CupScene progress={progress} />
              </Suspense>
            </ClientOnly>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-5 pt-32 pb-24 text-center sm:pb-36 lg:px-8">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Производство и брендирование
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[clamp(2.4rem,8vw,5.5rem)] font-bold leading-[0.98] drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
              Посуда, которая
              <br />
              <span className="text-lime-gradient">работает на бренд</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-[26vh] max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-[38vh] sm:text-lg">
              Производим одноразовую посуду с вашим логотипом — от идеи и дизайна до готового
              тиража
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                Получить расчёт
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#gallery"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:text-primary"
              >
                Смотреть примеры
              </a>
            </div>
          </Reveal>

          <div
            className={`mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
          >
            <MouseIcon className="h-4 w-4 text-primary" />
            Прокрутите — стакан повернётся
          </div>
        </div>

        {floating.map(({ icon: Icon, text, pos }, i) => (
          <div
            key={text}
            className={`glass animate-float absolute ${pos} hidden max-w-[190px] items-center gap-3 rounded-2xl px-4 py-3 text-left text-xs font-semibold leading-snug sm:flex`}
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" />
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
