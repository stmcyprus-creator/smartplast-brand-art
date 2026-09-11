import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/reveal";
import { EMAIL, PHONE_MOBILE, PHONE_MOBILE_TEL, WHATSAPP_URL } from "@/lib/contacts";
import { leadMailtoUrl, leadWhatsappUrl, saveLead, type Lead } from "@/lib/leads";

const title = "Заявка на заказ стаканов — like-pack.qz";
const description =
  "Оформите заявку на матовые стаканы 500 мл: выберите модель, количество и оставьте контакт — заявка уйдёт на hmd_kz@mail.ru.";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>) => ({
    model: typeof search.model === "string" ? search.model : undefined,
  }),
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
  component: Order,
});

const models = [
  "Стакан матовый 500 мл (без печати)",
  "Стакан матовый 500 мл с печатью «Qazakstan»",
  "Стакан матовый 500 мл с праздничной печатью",
  "Стакан матовый 500 мл с печатью «сердечки»",
  "Стакан матовый 500 мл с печатью по моему макету",
];

const quantities = [
  "10 000 – 30 000 стаканов",
  "30 000 – 100 000 стаканов",
  "100 000 – 500 000 стаканов",
  "более 500 000 стаканов",
];

const terms = ["Срочно — до 14 дней", "14–21 день", "21–30 дней", "Плановые поставки"];

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const SUBJECT = "Заявка на заказ стаканов — like-pack.qz";

function Order() {
  const { model: presetModel } = Route.useSearch();
  const [lead, setLead] = useState<Lead | null>(null);

  const defaultModel = presetModel && models.includes(presetModel) ? presetModel : "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();

    const saved = saveLead({
      source: "Страница заявки",
      model: v("model"),
      quantity: v("quantity"),
      term: v("term"),
      company: v("company"),
      name: v("name"),
      phone: v("phone"),
      email: v("email"),
      city: v("city"),
      comment: v("comment"),
    });

    window.location.href = leadMailtoUrl(saved, SUBJECT);
    setLead(saved);
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Заявка на заказ</span>
          <h1 className="mt-4 text-[clamp(2.1rem,6vw,3.6rem)] font-bold leading-[1.04]">
            Оформите заказ <span className="text-lime-gradient">стаканов 500 мл</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            Выберите модель и количество — заявка уйдёт на {EMAIL}, сохранится в панели заявок и её
            можно сразу продублировать в WhatsApp.
          </p>
          <Link to="/catalog" className="mt-4 inline-flex text-sm font-semibold text-primary">
            Посмотреть каталог моделей →
          </Link>
        </Reveal>

        <Reveal delay={100}>
          {lead ? (
            <div className="glass mt-12 flex flex-col items-center rounded-[2rem] p-10 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary">
                <Check className="h-8 w-8 text-primary-foreground" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold">Заявка отправлена</h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Письмо с заявкой сформировано и отправляется на {EMAIL}. Продублируйте заявку в
                WhatsApp — так менеджер увидит её быстрее. Или позвоните {PHONE_MOBILE}.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href={leadWhatsappUrl(lead, SUBJECT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" /> Отправить в WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_MOBILE_TEL}`}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Позвонить
                </a>
                <button
                  type="button"
                  onClick={() => setLead(null)}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Новая заявка
                </button>
              </div>
              <Link to="/leads" className="mt-6 text-sm text-primary hover:underline">
                Открыть панель заявок
              </Link>
              <Link to="/" className="mt-3 text-sm text-muted-foreground hover:text-primary">
                Вернуться на главную
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass mt-12 space-y-4 rounded-[2rem] p-6 sm:p-10">
              <select required name="model" defaultValue={defaultModel} className={fieldClass}>
                <option value="" disabled>
                  Модель стакана
                </option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <div className="grid gap-4 sm:grid-cols-2">
                <select required name="quantity" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Количество
                  </option>
                  {quantities.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <select required name="term" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Срок поставки
                  </option>
                  {terms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input maxLength={120} name="company" placeholder="Компания" className={fieldClass} />
                <input
                  required
                  maxLength={100}
                  name="name"
                  placeholder="Контактное лицо"
                  className={fieldClass}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  maxLength={30}
                  name="phone"
                  type="tel"
                  placeholder="Телефон"
                  className={fieldClass}
                />
                <input
                  required
                  maxLength={255}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={fieldClass}
                />
              </div>
              <input maxLength={120} name="city" placeholder="Город доставки" className={fieldClass} />
              <textarea
                name="comment"
                rows={3}
                maxLength={1000}
                placeholder="Комментарий: макет, цвета, особые требования"
                className={`${fieldClass} resize-none`}
              />
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                <input
                  required
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--lime)]"
                />
                Я согласен с обработкой персональных данных
              </label>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                Отправить заявку
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
