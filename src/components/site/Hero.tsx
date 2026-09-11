import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowRight, Clock, MouseIcon, Palette, Printer } from "lucide-react";
import { Reveal } from "./reveal";
import heroCup from "@/assets/hero-cup-closeup.jpg.asset.json";
import cupsTrio from "@/assets/cups-trio-qazaqstan.jpg.asset.json";
import cupHandCity from "@/assets/cup-hand-city.jpg.asset.json";
import cupCollage from "@/assets/cup-collage.jpg.asset.json";
import cupsLifestyle from "@/assets/cups-lifestyle.jpg.asset.json";

const CupScene = lazy(() => import("./CupScene"));

const strip = [
  { src: heroCup.url, alt: "Стакан «Qazaqstan» 500 мл крупным планом" },
  { src: cupsTrio.url, alt: "Серия стаканов «Qazaqstan», «Love» и матовый" },
  { src: cupHandCity.url, alt: "Стакан «Qazaqstan» в руке" },
  { src: cupCollage.url, alt: "Национальный орнамент на стакане" },
  { src: cupsLifestyle.url, alt: "Стаканы «Qazaqstan» в использовании" },
];

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
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      progress.current = p;
      setScrolled(p > 0.06);
      setSpin(Math.round(p * 360));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="top" ref={wrapRef} className="relative h-[260vh]">
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
          <div className="h-[62vh] w-full max-w-[520px] sm:h-[70vh]">
            <ClientOnly fallback={null}>
              <Suspense fallback={null}>
                <CupScene progress={progress} />
              </Suspense>
            </ClientOnly>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-5 pt-24 pb-32 text-center lg:px-8">
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
            <p className="mx-auto mt-[38vh] max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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

        {/* фото стаканов Qazaqstan, поворачиваются вместе с 3D-стаканом */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-3 [perspective:1000px] sm:gap-4">
          {strip.map((img, i) => (
            <a
              key={img.alt}
              href="#gallery"
              title={img.alt}
              className="block h-14 w-10 shrink-0 overflow-hidden rounded-xl border border-border transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] sm:h-20 sm:w-14"
              style={{
                transform: `rotateY(${spin + i * 12}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.35s linear",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </a>
          ))}
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
