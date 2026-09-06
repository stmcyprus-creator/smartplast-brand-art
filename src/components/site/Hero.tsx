import { ArrowRight, Clock, Palette, Printer } from "lucide-react";
import heroCups from "@/assets/hero-cups.png.asset.json";
import { Reveal } from "./reveal";

const floating = [
  { icon: Printer, text: "Печать от 10 000 шт.", pos: "left-0 top-8 sm:-left-6" },
  { icon: Clock, text: "Срок производства от 14 дней", pos: "right-0 top-1/2 sm:-right-4" },
  { icon: Palette, text: "100% под ваш дизайн", pos: "bottom-6 left-4 sm:left-2" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-28">
      <div className="glow-bg pointer-events-none absolute inset-x-0 -top-40 h-[520px]" />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[16vw] font-bold leading-none text-foreground/[0.035] lg:top-16"
      >
        SMART BRANDING
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Производство и брендирование
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.4rem,7vw,4.75rem)] font-bold leading-[1.02]">
              Посуда, которая
              <br />
              <span className="text-lime-gradient">работает на бренд</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Производим одноразовую посуду с вашим логотипом — от идеи и дизайна до готового
              тиража
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                Получить расчёт
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                Смотреть примеры
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute inset-8 rounded-full bg-primary/25 blur-3xl" />
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={heroCups.url}
                alt="Брендированные пластиковые стаканы с печатью логотипа"
                width={972}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            {floating.map(({ icon: Icon, text, pos }, i) => (
              <div
                key={text}
                className={`glass animate-float absolute ${pos} flex max-w-[190px] items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold leading-snug`}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                {text}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
