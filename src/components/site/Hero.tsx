import { ArrowRight, Flag, Printer } from "lucide-react";
import heroMockup from "@/assets/kz-hero.jpg";
import { Reveal } from "./reveal";

const floating = [
  { icon: Flag, text: "Made in Kazakhstan", pos: "left-0 top-10 sm:-left-6" },
  { icon: Printer, text: "6 цветов офсетной печати", pos: "bottom-8 right-0 sm:-right-4" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-28">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-bg pointer-events-none absolute inset-x-0 -top-40 h-[520px]" />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[14vw] font-bold leading-none text-foreground/[0.035] lg:top-16"
      >
        LIKE-PACK.QZ
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              ТОО «ХВАМДА МАШИНЕРИ KZ»
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.3rem,6.6vw,4.6rem)] font-bold leading-[1.03]">
              Упаковка,
              <br />
              которая <span className="text-accent-gradient">задаёт стандарт</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Современная полипропиленовая упаковка для пищевой промышленности и розничной торговли
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/80 sm:text-base">
              Производим качественную упаковку на роботизированном оборудовании и обеспечиваем
              высокую точность печати под задачи вашего бизнеса
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                Стать партнёром
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                Смотреть продукцию
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={heroMockup}
                alt="Полипропиленовая упаковка like-pack.qz: стаканы, контейнеры и крышки"
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            {floating.map(({ icon: Icon, text, pos }, i) => (
              <div
                key={text}
                className={`glass animate-float absolute ${pos} flex max-w-[200px] items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold leading-snug`}
                style={{ animationDelay: `${i * 1.4}s` }}
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
