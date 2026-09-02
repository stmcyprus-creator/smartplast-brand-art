import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import gal4 from "@/assets/gal-4.jpg";
import heroMockup from "@/assets/hero-mockup.jpg";
import brandDetail from "@/assets/brand-detail.jpg";
import catCups from "@/assets/cat-cups.jpg";
import catLids from "@/assets/cat-lids.jpg";
import catPackaging from "@/assets/cat-packaging.jpg";
import { Reveal } from "./reveal";

const images = [
  { src: gal1, alt: "Брендированный кофейный стакан в кофейне" },
  { src: gal2, alt: "Комплект брендированной посуды для доставки" },
  { src: brandDetail, alt: "Чёрные стаканы с лаймовым логотипом" },
  { src: catCups, alt: "Пластиковые стаканы с печатью" },
  { src: gal3, alt: "Производственная линия" },
  { src: heroMockup, alt: "Мокап брендированной посуды" },
  { src: gal4, alt: "Десертные стаканчики с логотипом" },
  { src: catLids, alt: "Крышки с брендированием" },
  { src: catPackaging, alt: "Упаковка в фирменном стиле" },
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const move = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
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

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.22em] text-primary">Портфолио</span>
        <h2 className="mt-4 text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.08]">
          Проекты, которые видно
        </h2>
      </Reveal>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((img, i) => (
          <Reveal key={img.alt} delay={(i % 3) * 80}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-border"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="glass absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 text-primary" /> Открыть
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
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
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-5xl">
            <img
              src={images[index]?.src}
              alt={images[index]?.alt ?? ""}
              className="max-h-[78vh] w-auto rounded-[1.5rem] border border-border object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {images[index]?.alt} — {index + 1} / {images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Вперёд"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
