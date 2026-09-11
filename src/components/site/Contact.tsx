import { useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Reveal } from "./reveal";
import {
  EMAIL,
  PHONE_CITY,
  PHONE_CITY_TEL,
  PHONE_MOBILE,
  PHONE_MOBILE_TEL,
  WHATSAPP_URL,
} from "@/lib/contacts";

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const quantities = [
  "10 000 – 30 000 стаканов",
  "30 000 – 100 000 стаканов",
  "100 000 – 500 000 стаканов",
  "более 500 000 стаканов",
];

const prints = [
  "Без печати (матовый стакан 500 мл)",
  "Логотип в 1–2 цвета",
  "Полноцветная печать (CMYK)",
  "Печать Pantone / фирменные цвета",
  "Печать в шесть цветов",
];

const terms = ["Срочно — до 14 дней", "14–21 день", "21–30 дней", "Плановые поставки"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const body = [
      `Имя: ${v("name")}`,
      `Телефон: ${v("phone")}`,
      `Email: ${v("email")}`,
      `Количество стаканов: ${v("quantity")}`,
      `Печать: ${v("print")}`,
      `Срок поставки: ${v("term")}`,
      "",
      `Комментарий: ${v("comment") || "—"}`,
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Заявка с сайта like-pack.qz",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-28">
      <div className="glow-bg pointer-events-none absolute inset-x-0 bottom-0 h-[460px] rotate-180" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="glass grid gap-12 rounded-[2.5rem] p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:p-16">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.22em] text-primary">
                Обсудить проект
              </span>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,3rem)] font-bold leading-[1.08]">
                Давайте сделаем ваш бренд <span className="text-lime-gradient">заметнее</span>
              </h2>
              <p className="mt-6 max-w-lg text-muted-foreground sm:text-lg">
                Укажите количество стаканов, вид печати и желаемый срок поставки — подготовим расчёт
                и предложим решение
              </p>
              <div className="mt-10 space-y-2 text-sm">
                <a
                  href={`tel:${PHONE_MOBILE_TEL}`}
                  className="block font-display text-2xl font-bold transition-colors hover:text-primary"
                >
                  {PHONE_MOBILE}
                </a>
                <a
                  href={`tel:${PHONE_CITY_TEL}`}
                  className="block font-semibold transition-colors hover:text-primary"
                >
                  {PHONE_CITY}
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Написать в WhatsApp
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-primary/40 bg-primary/8 p-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary">
                  <Check className="h-8 w-8 text-primary-foreground" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">Заявка отправлена</h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Заявка ушла на {EMAIL}. Менеджер свяжется с вами в течение рабочего дня и
                  подготовит расчёт.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" /> Ускорить в WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setAgree(false);
                  }}
                  className="mt-4 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    maxLength={100}
                    name="name"
                    placeholder="Имя"
                    className={fieldClass}
                  />
                  <input
                    required
                    maxLength={30}
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    className={fieldClass}
                  />
                </div>
                <input
                  required
                  maxLength={255}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={fieldClass}
                />
                <select required name="quantity" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Количество стаканов
                  </option>
                  {quantities.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <select required name="print" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Печать
                  </option>
                  {prints.map((p) => (
                    <option key={p} value={p}>
                      {p}
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
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={1000}
                  placeholder="Комментарий: макет, цвета, адрес доставки"
                  className={`${fieldClass} resize-none`}
                />
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                  <input
                    required
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--lime)]"
                  />
                  Я согласен с обработкой персональных данных и политикой конфиденциальности
                </label>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
                >
                  Отправить заявку на {EMAIL}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
