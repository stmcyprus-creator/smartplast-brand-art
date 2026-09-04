import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CupSoda,
  Cpu,
  Factory,
  Handshake,
  Layers,
  LifeBuoy,
  Package,
  Palette,
  Recycle,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import plant from "@/assets/kz-plant.jpg";
import engineer from "@/assets/kz-engineer.jpg";
import cups from "@/assets/kz-cups.jpg";
import containers from "@/assets/kz-containers.jpg";
import lids from "@/assets/kz-lids.jpg";
import food from "@/assets/kz-food.jpg";
import retail from "@/assets/kz-retail.jpg";
import branded from "@/assets/kz-branded.jpg";
import { Reveal } from "./reveal";
import { PrintCompare } from "./PrintCompare";

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
      <h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.08]">
        {title}
      </h2>
      {text && <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">{text}</p>}
    </Reveal>
  );
}

const stats = [
  { value: "6", label: "цветов офсетной печати" },
  { value: "CMYK", label: "+ PANTONE" },
  { value: "100%", label: "роботизированные основные процессы" },
  { value: "PP", label: "полипропилен — безопасный материал" },
  { value: "24/7", label: "прямые поставки оборудования и запчастей" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] lg:grid-cols-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="group h-full px-6 py-9 transition-colors duration-500 hover:bg-secondary/60 sm:px-7 sm:py-11">
              <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
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

const aboutPoints = [
  { icon: Factory, t: "Современное производство" },
  { icon: Flag2, t: "Национальная производственная база" },
  { icon: BadgeCheck, t: "Высокие потребительские свойства" },
  { icon: Handshake, t: "Гибкие условия для партнёров" },
];

function Flag2(props: React.ComponentProps<typeof Factory>) {
  return <Warehouse {...props} />;
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
                like-pack.qz — качество,
                <br />
                которому <span className="text-accent-gradient">доверяют</span>
              </>
            }
            text="Торговая марка like-pack.qz стала стандартом качества на рынке Республики Казахстан. Компания ТОО «ХВАМДА МАШИНЕРИ KZ» объединяет современное производство, инженерную экспертизу и глубокое понимание задач пищевой промышленности и розничной торговли."
          />
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
              Мы создаём упаковку, которая соответствует ожиданиям отраслей переработки и
              потребления, обеспечивает удобство использования и помогает продукту выглядеть
              современно на полке.
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {aboutPoints.map((p) => (
                <div
                  key={p.t}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary/50"
                >
                  <p.icon className="h-5 w-5 shrink-0 text-primary" />
                  {p.t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/12 blur-3xl" />
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={plant}
                alt="Роботизированная линия производства упаковки like-pack.qz"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const mission = [
  {
    icon: ShieldCheck,
    title: "Безопасность",
    text: "Используем полипропилен как нейтральный и безопасный для человека материал.",
  },
  {
    icon: Recycle,
    title: "Ответственность",
    text: "Учитываем интересы национальных потребителей и возможности химической промышленности Казахстана.",
  },
  {
    icon: Scale,
    title: "Баланс",
    text: "Добиваемся оптимального соотношения качества продукции и ожиданий бизнеса.",
  },
];

export function Mission() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="glow-bg pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Наша миссия</span>
          <p className="mt-6 max-w-4xl text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-[1.15] font-display">
            «Производить современную упаковку с{" "}
            <span className="text-accent-gradient">высокими потребительскими свойствами</span> для
            пищевой промышленности и розничной продажи»
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {mission.map((m, i) => (
            <Reveal key={m.title} delay={i * 90}>
              <div className="glass group h-full rounded-[1.75rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 transition-colors duration-500 group-hover:bg-primary">
                  <m.icon className="h-6 w-6 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
                </span>
                <h3 className="mt-7 font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    title: "Пластиковые стаканы",
    text: "Полипропиленовые стаканы разных объёмов с шестицветной офсетной печатью.",
    img: cups,
    icon: CupSoda,
  },
  {
    title: "Контейнеры",
    text: "Прочные контейнеры для фасовки, хранения и транспортировки продуктов.",
    img: containers,
    icon: Boxes,
  },
  {
    title: "Крышки",
    text: "Плоские и купольные крышки с точной геометрией и надёжной посадкой.",
    img: lids,
    icon: Layers,
  },
  {
    title: "Упаковка для пищевой промышленности",
    text: "Решения для молочной, кондитерской и готовой продукции на автоматических линиях.",
    img: food,
    icon: Factory,
  },
  {
    title: "Упаковка для розничной продажи",
    text: "Форматы, которые выигрышно выглядят на полке и удобны покупателю.",
    img: retail,
    icon: ShoppingBag,
  },
  {
    title: "Брендированная упаковка",
    text: "Фирменный дизайн с точной цветопередачей CMYK и PANTONE.",
    img: branded,
    icon: Palette,
  },
];

export function Products() {
  return (
    <section id="products" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <SectionTitle
        kicker="Продукция"
        title="Что мы производим"
        text="Полный ассортимент полипропиленовой упаковки — от стандартных позиций до индивидуальных решений под тираж заказчика."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <span className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl">
                  <p.icon className="h-5 w-5 text-primary" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                >
                  Подробнее <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const productionAdvantages = [
  { icon: Cpu, t: "Роботизированные основные процессы" },
  { icon: Zap, t: "Минимизация человеческого фактора" },
  { icon: ShieldCheck, t: "Отсутствие контакта продукции с человеком" },
  { icon: Factory, t: "Современная экспериментальная площадка" },
  { icon: Warehouse, t: "Собственное складирование и логистика" },
];

const cycle = ["Сырьё", "Литьё", "Печать", "Контроль качества", "Склад", "Отгрузка"];

export function Production() {
  return (
    <section id="production" className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionTitle
              kicker="Производственная база"
              title="Технологии, которые работают на результат"
              text="Производственную базу составляет полный перечень оборудования для приёма сырья, переработки, складирования готовой продукции и отгрузки покупателю."
            />
            <Reveal delay={110}>
              <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
                Для инжекционного литья под давлением используются машины одного из лидеров тяжёлого
                машиностроения Китая — NINGBO HWAMDA MACHINERY.
              </p>
              <div className="mt-9 grid gap-3">
                {productionAdvantages.map((a) => (
                  <div
                    key={a.t}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 px-5 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary/50"
                  >
                    <a.icon className="h-5 w-5 shrink-0 text-primary" />
                    {a.t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={plant}
                alt="Оборудование инжекционного литья NINGBO HWAMDA MACHINERY"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border sm:grid-cols-3 lg:grid-cols-6">
          {cycle.map((c, i) => (
            <Reveal key={c} delay={i * 80}>
              <div className="group relative h-full bg-surface p-6 transition-colors duration-500 hover:bg-surface-2">
                <span className="font-display text-2xl font-bold text-primary/35 transition-colors duration-500 group-hover:text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{c}</h3>
                <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const printFeatures = ["CMYK", "PANTONE", "Высокая цветопередача", "Сложные фирменные дизайны", "Стабильное качество от тиража к тиражу"];

export function Printing() {
  return (
    <section id="tech" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
      <SectionTitle
        kicker="Шестицветная печать"
        title="Печать, которая передаёт бренд точно"
        text="Используем шестицветную офсетную печать на стаканах. Это позволяет выполнять сложные задачи, добиваться высокой детализации и максимально точно передавать цветовую гамму оригинального изображения."
      />
      <Reveal delay={110}>
        <div className="mt-9 flex flex-wrap gap-3">
          {printFeatures.map((f) => (
            <span
              key={f}
              className="rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-14">
          <PrintCompare />
        </div>
      </Reveal>
    </section>
  );
}

const engineering = [
  { icon: BadgeCheck, t: "Официальная инженерная поддержка" },
  { icon: Truck, t: "Прямые поставки запасных частей" },
  { icon: Wrench, t: "Обслуживание оборудования" },
  { icon: Zap, t: "Быстрое решение технических задач" },
  { icon: LifeBuoy, t: "Бесперебойная работа производства" },
];

export function Engineering() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2.5rem] border border-border">
              <img
                src={engineer}
                alt="Инженер обслуживает оборудование производства упаковки"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionTitle
              kicker="Инженерная поддержка"
              title="Производство под контролем инженеров"
              text="Полную инжиниринговую поддержку оказывает ТОО «ХВАМДА МАШИНЕРИ KZ» — официальный представитель и дилер NINGBO HWAMDA MACHINERY в Республике Казахстан."
            />
            <Reveal delay={110}>
              <p className="mt-5 text-muted-foreground sm:text-lg">
                Обслуживание и эксплуатация оборудования производится совместно с сотрудниками ТОО
                «ХВАМДА МАШИНЕРИ KZ». Это обеспечивает бесперебойную работу производства и
                своевременное техническое обслуживание.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {engineering.map((e) => (
                  <div
                    key={e.t}
                    className="glass flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-colors duration-300 hover:border-primary/40"
                  >
                    <e.icon className="h-5 w-5 shrink-0 text-primary" />
                    {e.t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section id="partners" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="glass tech-grid relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16">
        <div className="relative">
          <SectionTitle
            kicker="Партнёрам"
            title="Производим упаковку под задачи вашего бизнеса"
            text="Наша компания открыта для совместной работы. Мы готовы предложить оптимальные условия для производства оптимальной упаковки и гибкие условия для доверенных компаний."
          />
          <Reveal delay={120}>
            <p className="mt-12 max-w-3xl font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-[1.12]">
              Знание, доверие и репутация —
              <br />
              <span className="text-accent-gradient">гарантия нашего успеха</span>
            </p>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              Обсудить сотрудничество
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <Package className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-primary/5" />
      </div>
    </section>
  );
}
