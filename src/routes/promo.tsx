import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/reveal";
import { PromoGenerator } from "@/components/site/PromoGenerator";
import promo1 from "@/assets/promo-1-square.jpg";
import promo2 from "@/assets/promo-2-square.jpg";
import promo3 from "@/assets/promo-3-story.jpg";
import promo4 from "@/assets/promo-4-story.jpg";
import promo5 from "@/assets/promo-5-banner.jpg";
import promo6 from "@/assets/promo-6-banner.jpg";

const title = "Рекламные кадры Like Pack для соцсетей — like-pack.qz";
const description =
  "Готовые рекламные кадры Like Pack со стаканами «Qazaqstan»: квадратные посты, вертикальные сториз и широкие баннеры — скачивайте и публикуйте.";

export const Route = createFileRoute("/promo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Promo,
});

const shots = [
  { src: promo1, label: "Пост 1:1", note: "Три стакана, витрина ассортимента", ratio: "aspect-square" },
  { src: promo2, label: "Пост 1:1", note: "Макро «Qazaqstan», конденсат", ratio: "aspect-square" },
  { src: promo3, label: "Сториз 9:16", note: "Стакан на подиуме, крупный логотип", ratio: "aspect-[9/16]" },
  { src: promo4, label: "Сториз 9:16", note: "Вечерний город, стакан в руке", ratio: "aspect-[9/16]" },
  { src: promo5, label: "Баннер 16:9", note: "Линейка стаканов для рекламы", ratio: "aspect-video" },
  { src: promo6, label: "Баннер 16:9", note: "Производственная линия", ratio: "aspect-video" },
];

function Promo() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Медиа-кит</span>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,6vw,3.6rem)] font-bold leading-[1.04]">
            Рекламные кадры <span className="text-lime-gradient">Like Pack</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            Кадры в стиле первого экрана: графит, лаймовые акценты и стаканы «Qazaqstan». Форматы для
            постов, сториз и рекламных баннеров — нажмите «Скачать» и публикуйте.
          </p>
        </Reveal>

        <Reveal>
          <PromoGenerator />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 70}>
              <figure className="glass overflow-hidden rounded-[2rem]">
                <div className={`${s.ratio} overflow-hidden bg-secondary`}>
                  <img
                    src={s.src}
                    alt={`${s.label} — ${s.note}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.18em] text-primary">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{s.note}</span>
                  </div>
                  <a
                    href={s.src}
                    download
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/50 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4" /> Скачать
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
