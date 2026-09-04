import { Logo } from "./Logo";

const nav = [
  { label: "О компании", href: "#about" },
  { label: "Продукция", href: "#products" },
  { label: "Производство", href: "#production" },
  { label: "Технологии", href: "#tech" },
  { label: "Партнёрам", href: "#partners" },
  { label: "Контакты", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo compact />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            ТОО «ХВАМДА МАШИНЕРИ KZ» (ТОО «ХМД») — производство современной полипропиленовой
            упаковки в Республике Казахстан.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Навигация</span>
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Контакты</span>
          <a href="tel:+77000000000" className="text-sm font-semibold transition-colors hover:text-primary">
            +7 (700) 000-00-00
          </a>
          <a
            href="mailto:info@like-pack.qz"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            info@like-pack.qz
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Республика Казахстан
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Мы в сети</span>
          <div className="flex gap-3">
            {["TG", "IG", "WA"].map((s) => (
              <a
                key={s}
                href="#contact"
                aria-label={s}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-xs font-bold transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-4 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} like-pack.qz. Все права защищены.</span>
          <span>Упаковка Made in Kazakhstan</span>
        </div>
      </div>
    </footer>
  );
}
