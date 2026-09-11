import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import heroCup from "@/assets/hero-cup-closeup.jpg.asset.json";
import cupsTrio from "@/assets/cups-trio-qazaqstan.jpg.asset.json";
import cupHandCity from "@/assets/cup-hand-city.jpg.asset.json";
import cupCollage from "@/assets/cup-collage.jpg.asset.json";
import cupsLifestyle from "@/assets/cups-lifestyle.jpg.asset.json";
import prodLine from "@/assets/prod-line.jpg.asset.json";
import catCups from "@/assets/cat-cups.jpg";
import { Reveal } from "./reveal";

type Shot = { src: string; title: string; desc: string };

export const shots: Shot[] = [
  {
    src: heroCup.url,
    title: "Стакан «Qazaqstan» 500 мл",
    desc: "Матовый полипропиленовый стакан 500 мл: золотой национальный орнамент двумя поясами и бирюзовая надпись «Qazaqstan». Печать в шесть цветов, крышка и трубочка в комплекте.",
  },
  {
    src: cupsTrio.url,
    title: "Серия: «Qazaqstan», «Love», матовый",
    desc: "Три готовые позиции тиража — стакан с национальным орнаментом, праздничный «Love» с сердечками и матовый стакан без печати. Один и тот же корпус 500 мл, разные макеты.",
  },
  {
    src: cupHandCity.url,
    title: "Стакан в руке",
    desc: "Как выглядит брендированный стакан в реальной сцене: печать читается с расстояния, матовая поверхность не оставляет отпечатков.",
  },
  {
    src: cupCollage.url,
    title: "Национальный орнамент",
    desc: "Детализация орнамента и леттеринга. Точность приводки печати позволяет использовать тонкие линии и мелкие элементы.",
  },
  {
    src: cupsLifestyle.url,
    title: "Стаканы в использовании",
    desc: "Сценарии применения в кофейнях, фастфуде и на мероприятиях — стакан работает как носитель бренда.",
  },
  {
    src: catCups,
    title: "Матовый стакан 500 мл",
    desc: "Базовая позиция без печати: полипропилен, безопасный для холодных и горячих напитков, всегда в наличии.",
  },
  {
    src: prodLine.url,
    title: "Печать на линии",
    desc: "Стаканы с печатью на роботизированной линии производства в Республике Казахстан.",
  },
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const move = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, move]);

  const active = index === null ? null : shots[index];

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.22em] text-primary">Портфолио</span>
        <h2 className="mt-4 text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.08]">
          Проекты, которые видно
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Нажмите на стакан — откроется полноэкранный просмотр с описанием тиража и печати
        </p>
      </Reveal>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {shots.map((img, i) => (
          <Reveal key={img.title} delay={(i % 3) * 80}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-border"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="glass absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 text-primary" /> {img.title}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl"
          onClick={close}
        >
          <div className="glow-bg pointer-events-none absolute inset-x-0 -top-32 h-[520px]" />
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Назад"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[88vh] w-full max-w-6xl items-center gap-8 overflow-y-auto px-4 lg:grid-cols-[1.05fr_1fr] lg:px-12"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-8 rounded-full bg-primary/25 blur-3xl" />
              <img
                src={active.src}
                alt={active.title}
                className="grain relative max-h-[62vh] w-full rounded-[2rem] border border-border object-contain"
              />
            </div>
            <div className="text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.22em] text-primary">
                Портфолио · {index + 1} / {shots.length}
              </span>
              <h3 className="mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.05]">
                {active.title}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {active.desc}
              </p>
              <a
                href="#contact"
                onClick={close}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                Рассчитать такой тираж
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-label="Вперёд"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
