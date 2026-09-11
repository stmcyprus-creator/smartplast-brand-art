import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./reveal";

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);

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
                Расскажите о задаче — подготовим решение, предложим материалы и рассчитаем стоимость
                проекта
              </p>
              <div className="mt-10 space-y-2 text-sm">
                <a
                  href="tel:+77005303141"
                  className="block font-display text-2xl font-bold transition-colors hover:text-primary"
                >
                  +7 700 530-31-41
                </a>
                <a
                  href="tel:+77213303141"
                  className="block font-semibold transition-colors hover:text-primary"
                >
                  8 7213 303-141
                </a>
                <a
                  href="mailto:hmd_kz@mail.ru"
                  className="block text-muted-foreground transition-colors hover:text-primary"
                >
                  hmd_kz@mail.ru
                </a>
              </div>
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
                  Спасибо! Менеджер свяжется с вами в течение рабочего дня и подготовит расчёт по
                  вашему проекту.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setAgree(false);
                  }}
                  className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required name="name" placeholder="Имя" className={fieldClass} />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    className={fieldClass}
                  />
                </div>
                <input required name="email" type="email" placeholder="Email" className={fieldClass} />
                <textarea
                  name="comment"
                  rows={4}
                  placeholder="Комментарий: позиции, тираж, сроки"
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
                  Получить предложение
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
