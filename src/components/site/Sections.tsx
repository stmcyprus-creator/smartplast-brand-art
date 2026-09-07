import {
  BadgeCheck,
  CupSoda,
  Factory,
  Gauge,
  Handshake,
  Package,
  Palette,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";
import brandDetail from "@/assets/about-cup.jpg.asset.json";
import aboutCup from "@/assets/about-cup.jpg.asset.json";
import heroCups from "@/assets/hero-cups.png.asset.json";
import prodLine from "@/assets/prod-line.jpg.asset.json";
import prodMachine from "@/assets/prod-machine.jpg.asset.json";
import catCups from "@/assets/cat-cups.jpg";
import { Reveal } from "./reveal";

function SectionTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: string;
}) {
  return (
    <Reveal>
      <span className="text-xs uppercase tracking-[0.22em] text-primary">{kicker}</span>
      <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.08]">
        {title}
      </h2>
      {text && <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">{text}</p>}
    </Reveal>
  );
}

const stats = [
  { value: "15+", label: "лет в производстве" },
  { value: "200+", label: "реализованных проектов" },
  { value: "14", label: "дней от макета до тиража" },
  { value: "100%", label: "контроль качества" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="group h-full px-6 py-9 transition-colors duration-500 hover:bg-secondary/60 sm:px-8 sm:py-12">
              <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                {s.value}
              </div>
              <p className="mt-3 text-sm leading-snug text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionTitle
            kicker="О компании"
            title={
              <>
                Торговая марка like-pack.qz —
                <br />
                <span className="text-lime-gradient">стандарт качества</span> в Казахстане
              </>
            }
            text='Продукцию под маркой like-pack.qz выпускает компания ТОО «ХВАМДА МАШИНЕРИ KZ» (сокращённое наименование — ТОО «ХМД»).'
          />
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
              Мы производим современную упаковку с высокими потребительскими свойствами для пищевой
              промышленности и розничной продажи, опираясь на интересы национальных потребителей и
              возможности национальной химической промышленности.
            </p>
            <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
              Основной материал — полипропилен: самый нейтральный для человека и максимально
              отвечающий требованиям безопасности людей и природы. Наша цель — оптимальное
              соотношение качества продукции и ожиданий отраслей переработки и потребления.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Полипропилен", "Роботизированное производство", "Офсетная печать в 6 цветов"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/15 blur-3xl" />
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={brandDetail.url}
                alt="Пластиковый стакан с брендированной печатью крупным планом"
                loading="lazy"
                width={1200}
                height={1408}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const products = [
  {
    title: "Стакан матовый 500 мл",
    text: "Базовая модель из полипропилена без печати — готова к отгрузке со склада.",
    img: catCups,
    icon: CupSoda,
  },
  {
    title: "Стакан матовый 500 мл с печатью «Qazaqstan»",
    text: "Национальная серия: офсетная печать в шесть цветов.",
    img: aboutCup.url,
    icon: CupSoda,
  },
  {
    title: "Стакан матовый 500 мл с праздничной печатью",
    text: "Сезонная и праздничная серия для розницы и HoReCa.",
    img: heroCups.url,
    icon: CupSoda,
  },
  {
    title: "Стакан матовый 500 мл с печатью «сердечки»",
    text: "Яркий узор, стойкие краски CMYK и Pantone.",
    img: prodLine.url,
    icon: CupSoda,
  },
];

export function Products() {
  return (
    <section id="products" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <SectionTitle
        kicker="Продукция"
        title="Что мы брендируем"
        text="Печатаем на любой позиции ассортимента — можно собрать полный комплект в едином стиле."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <span className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl">
                  <p.icon className="h-5 w-5 text-primary" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <span className="mt-5 inline-block h-px w-10 bg-primary transition-all duration-500 group-hover:w-20" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Обсуждаем задачу", text: "Уточняем тираж, позиции, сроки и бюджет." },
  { n: "02", title: "Создаём дизайн", text: "Адаптируем логотип под форму изделия." },
  { n: "03", title: "Согласовываем образец", text: "Печатаем пробник и показываем цвета." },
  { n: "04", title: "Запускаем производство", text: "Печать и контроль качества на каждом этапе." },
  { n: "05", title: "Доставляем тираж", text: "Отправляем по России и в страны СНГ." },
];

export function Process() {
  return (
    <section id="branding" className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle kicker="Процесс" title="Как это работает" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border md:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group relative h-full bg-surface p-7 transition-colors duration-500 hover:bg-surface-2">
                <span className="font-display text-3xl font-bold text-primary/35 transition-colors duration-500 group-hover:text-primary">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const advantages = [
  { icon: Sparkles, title: "Яркая и точная печать", text: "Цвет по Pantone, стойкость к влаге и нагреву." },
  { icon: Factory, title: "Собственное производство", text: "Полный цикл без посредников и наценок." },
  { icon: Gauge, title: "Быстрые сроки", text: "Стандартный тираж — 14 дней, срочный — быстрее." },
  { icon: Palette, title: "Индивидуальный подход", text: "Дизайнер помогает довести макет до печати." },
  { icon: BadgeCheck, title: "Стабильное качество", text: "Контроль на каждой партии и сертификаты." },
  { icon: Wallet, title: "Выгодные цены", text: "Прогрессивные скидки для оптовых заказчиков." },
];

export function Why() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <SectionTitle kicker="Преимущества" title="Почему выбирают Like Pack" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((a, i) => (
          <Reveal key={a.title} delay={i * 70}>
            <div className="glass group h-full rounded-[1.5rem] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 transition-colors duration-500 group-hover:bg-primary">
                <a.icon className="h-6 w-6 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
              </span>
              <h3 className="mt-6 font-display text-base font-bold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Delivery() {
  return (
    <section id="delivery" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="glass grid gap-8 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <SectionTitle
            kicker="Доставка"
            title="Привозим тираж туда, где он нужен"
            text="Доставляем по Москве и Московской области собственным транспортом, по России и СНГ — транспортными компаниями. Возможна отгрузка со склада самовывозом."
          />
        </div>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Truck, t: "Москва и МО", s: "1–2 дня" },
              { icon: Package, t: "Россия и СНГ", s: "ТК на выбор" },
              { icon: Handshake, t: "Самовывоз", s: "склад в Ногинске" },
            ].map((d) => (
              <div key={d.t} className="rounded-2xl border border-border bg-surface p-5 sm:min-w-44">
                <d.icon className="h-5 w-5 text-primary" />
                <div className="mt-4 text-sm font-bold">{d.t}</div>
                <div className="text-xs text-muted-foreground">{d.s}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const blocks = [
  {
    icon: Factory,
    kicker: "Производственная база",
    items: [
      "Производственную базу составляет весь необходимый перечень оборудования. Для инжекционного литья под давлением используются инжекционно-литьевые машины одного из лидеров тяжёлого машиностроения Китая — компании NINGBO HWAMDA MACHINERY.",
      "Все основные процессы роботизированы, что исключает человеческий фактор и контакт с продукцией. Наша площадка служит экспериментальной базой для внедрения новых технических решений, и мы гордимся своей передовой оснащённостью.",
      "Производство обеспечено всем необходимым вспомогательным оборудованием для приёма сырья, переработки, складирования готовой продукции и отгрузки покупателю.",
    ],
  },
  {
    icon: Palette,
    kicker: "Печать",
    items: [
      "Используется шестицветная офсетная печать на стаканах — это позволяет выполнять сложные задачи и гарантировать очень высокое качество печати.",
      "Максимальное соответствие цветовой гаммы оригиналу изображения обеспечивают краски CMYK и Pantone.",
    ],
  },
  {
    icon: BadgeCheck,
    kicker: "Инженерный персонал",
    items: [
      "Полную инжиниринговую поддержку оказывает ТОО «ХВАМДА МАШИНЕРИ KZ» (HWAMDA MACHINERY KZ) — официальный представитель в Республике Казахстан и дилер производителя инжекционно-литьевых машин NINGBO HWAMDA MACHINERY.",
      "Обслуживание и эксплуатация оборудования выполняются совместно с сотрудниками ТОО «ХВАМДА МАШИНЕРИ KZ». Так обеспечивается бесперебойная работа и своевременный сервис, а запасные части поставляются напрямую со склада поставщика оборудования.",
    ],
  },
];

export function Production() {
  return (
    <section id="production" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <SectionTitle
        kicker="Производство"
        title="Оборудование, роботы и точная печать"
        text="Полный цикл производства упаковки из полипропилена — от приёма сырья до отгрузки готового тиража."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {blocks.map((b, i) => (
          <Reveal key={b.kicker} delay={i * 90}>
            <div className="glass h-full rounded-[1.75rem] p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12">
                <b.icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold">{b.kicker}</h3>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {b.items.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            { src: prodLine.url, alt: "Линия офсетной печати: стаканы с печатью «сердечки»" },
            { src: prodMachine.url, alt: "Инжекционно-литьевая машина NINGBO HWAMDA MACHINERY" },
          ].map((ph) => (
            <div
              key={ph.alt}
              className="grain overflow-hidden rounded-[1.75rem] border border-border"
            >
              <img
                src={ph.src}
                alt={ph.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="glass mt-6 grid gap-6 rounded-[1.75rem] p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/12">
            <Handshake className="h-7 w-7 text-primary" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold">Предложения партнёрам</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Наша компания открыта для совместной работы. Мы готовы предложить оптимальные условия
              для производства упаковки и гибкие условия для доверенных компаний. Знание, доверие и
              репутация — гарантия нашего успеха!
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
