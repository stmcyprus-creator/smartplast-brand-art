import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Boxes, Handshake, MessageCircle, Percent, Phone, Truck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/reveal";
import {
  EMAIL,
  PHONE_CITY,
  PHONE_CITY_TEL,
  PHONE_MOBILE,
  PHONE_MOBILE_TEL,
  WHATSAPP_URL,
} from "@/lib/contacts";

const title = "Партнёрам — условия сотрудничества | like-pack.qz";
const description =
  "Условия сотрудничества с ТОО «ХВАМДА МАШИНЕРИ KZ»: оптовые цены, гибкие условия для доверенных компаний, собственное производство матовых стаканов 500 мл и доставка по Казахстану.";

export const Route = createFileRoute("/partners")({
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
  component: Partners,
});

const terms = [
  {
    icon: Percent,
    title: "Прогрессивные скидки",
    text: "Цена зависит от тиража и регулярности заказов. Для постоянных партнёров — индивидуальный прайс.",
  },
  {
    icon: Boxes,
    title: "Тираж от 10 000 стаканов",
    text: "Матовые стаканы 500 мл без печати и с офсетной печатью в шесть цветов (CMYK, Pantone).",
  },
  {
    icon: BadgeCheck,
    title: "Гибкие условия для доверенных компаний",
    text: "Возможна отсрочка платежа и плановые поставки по графику после согласования.",
  },
  {
    icon: Truck,
    title: "Доставка до адреса",
    text: "Привозим тираж в любой город Республики Казахстан, доступен самовывоз со склада.",
  },
];

const steps = [
  "Присылаете задачу: позиция, тираж, печать, желаемый срок.",
  "Получаете расчёт и коммерческое предложение в течение рабочего дня.",
  "Согласовываем макет и печатаем образец.",
  "Подписываем договор и запускаем производство.",
  "Доставляем тираж и закрепляем условия на следующие поставки.",
];

function Partners() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Партнёрам</span>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,6vw,4rem)] font-bold leading-[1.02]">
            Условия сотрудничества с <span className="text-lime-gradient">like-pack.qz</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
            Наша компания открыта для совместной работы. Мы готовы предложить оптимальные условия
            для производства упаковки и гибкие условия для доверенных компаний. Знание, доверие и
            репутация — гарантия нашего успеха.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {terms.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <div className="glass h-full rounded-[1.75rem] p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12">
                  <t.icon className="h-6 w-6 text-primary" />
                </span>
                <h2 className="mt-6 font-display text-lg font-bold">{t.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-16 rounded-[2rem] border border-border bg-surface p-8 sm:p-12">
            <h2 className="font-display text-2xl font-bold">Как оформить заявку</h2>
            <ol className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-display text-lg font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="sm:text-base">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/order" search={{ model: undefined }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                <Handshake className="h-4 w-4" /> Оформить заявку
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass mt-8 grid gap-6 rounded-[2rem] p-8 sm:grid-cols-3 sm:p-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary">Мобильный</span>
              <a
                href={`tel:${PHONE_MOBILE_TEL}`}
                className="mt-3 flex items-center gap-2 font-display text-xl font-bold transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" /> {PHONE_MOBILE}
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary">Городской</span>
              <a
                href={`tel:${PHONE_CITY_TEL}`}
                className="mt-3 block font-semibold transition-colors hover:text-primary"
              >
                {PHONE_CITY}
              </a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary">Почта</span>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block font-semibold transition-colors hover:text-primary"
              >
                {EMAIL}
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                ТОО «ХВАМДА МАШИНЕРИ KZ» — Республика Казахстан
              </p>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
