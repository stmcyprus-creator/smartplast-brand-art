import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle, Ruler } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/reveal";
import { EMAIL, PHONE_MOBILE, PHONE_MOBILE_TEL, WHATSAPP_URL } from "@/lib/contacts";
import heroCup from "@/assets/hero-cup-closeup.jpg.asset.json";
import cupsTrio from "@/assets/cups-trio-qazaqstan.jpg.asset.json";
import cupCollage from "@/assets/cup-collage.jpg.asset.json";
import catCups from "@/assets/cat-cups.jpg";

const title = "Каталог стаканов 500 мл — like-pack.qz";
const description =
  "Каталог матовых полипропиленовых стаканов 500 мл: модели без печати, «Qazaqstan», праздничная печать и «сердечки» — размеры, характеристики и цены по запросу.";

export const Route = createFileRoute("/catalog")({
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
  component: Catalog,
});

type Model = {
  code: string;
  name: string;
  img: string;
  desc: string;
  specs: string[];
  features: string[];
};

const models: Model[] = [
  {
    code: "LP-500",
    name: "Стакан матовый 500 мл",
    img: catCups,
    desc: "Базовая позиция без печати — всегда в наличии, подходит для холодных и горячих напитков.",
    specs: [
      "Объём: 500 мл",
      "Диаметр по венчику: 95 мм",
      "Высота: 140 мм",
      "Материал: полипропилен (PP)",
      "В коробке: 1 000 шт.",
    ],
    features: ["Матовая поверхность", "Совместим с крышкой и трубочкой", "Штабелируется"],
  },
  {
    code: "LP-500-QZ",
    name: "Стакан матовый 500 мл с печатью «Qazakstan»",
    img: heroCup.url,
    desc: "Золотой национальный орнамент двумя поясами и бирюзовая надпись «Qazaqstan». Готовый тираж.",
    specs: [
      "Объём: 500 мл",
      "Диаметр по венчику: 95 мм",
      "Высота: 140 мм",
      "Печать: офсет, до 6 цветов",
      "В коробке: 1 000 шт.",
    ],
    features: ["Печать в 6 цветов", "Тонкие линии орнамента", "Готов к отгрузке"],
  },
  {
    code: "LP-500-HOL",
    name: "Стакан матовый 500 мл с праздничной печатью",
    img: cupsTrio.url,
    desc: "Праздничная серия для сезонных акций, кофеен и мероприятий.",
    specs: [
      "Объём: 500 мл",
      "Диаметр по венчику: 95 мм",
      "Высота: 140 мм",
      "Печать: офсет, до 6 цветов",
      "В коробке: 1 000 шт.",
    ],
    features: ["Сезонные макеты", "Яркая печать", "Тираж от 10 000 шт."],
  },
  {
    code: "LP-500-LOVE",
    name: "Стакан матовый 500 мл с печатью «сердечки»",
    img: cupCollage.url,
    desc: "Серия «сердечки» — для кофеен, доставки напитков и подарочных наборов.",
    specs: [
      "Объём: 500 мл",
      "Диаметр по венчику: 95 мм",
      "Высота: 140 мм",
      "Печать: офсет, до 6 цветов",
      "В коробке: 1 000 шт.",
    ],
    features: ["Готовый макет", "Печать по кругу", "Тираж от 10 000 шт."],
  },
];

function Catalog() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Каталог моделей</span>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,6vw,3.6rem)] font-bold leading-[1.04]">
            Стаканы <span className="text-lime-gradient">500 мл</span> — выберите модель
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            Четыре готовые позиции к реализации. Размеры и характеристики одинаковые — отличается
            печать. Цены рассчитываем по запросу: они зависят от тиража и количества цветов.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {models.map((m, i) => (
            <Reveal key={m.code} delay={i * 80}>
              <article className="glass flex h-full flex-col overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold tracking-wide text-primary backdrop-blur">
                    {m.code}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-xl font-bold leading-snug">{m.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>

                  <ul className="mt-6 space-y-2">
                    {m.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        <Check className="h-3.5 w-3.5 text-primary" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
                    <div>
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Цена
                      </span>
                      <span className="font-display text-lg font-bold text-primary">по запросу</span>
                    </div>
                    <Link
                      to="/order"
                      search={{ model: m.name }}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
                    >
                      Выбрать модель
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="glass mt-14 flex flex-col items-start gap-6 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Нужен свой макет?</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Печатаем в шесть цветов по вашему дизайну. Пришлите макет или идею — подготовим
                расчёт и образец. Пишите на {EMAIL} или звоните {PHONE_MOBILE}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`tel:${PHONE_MOBILE_TEL}`}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Позвонить
              </a>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
