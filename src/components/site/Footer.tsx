import { Logo } from "./Logo";

const nav = [
  { label: "О компании", href: "#about" },
  { label: "Продукция", href: "#products" },
  { label: "Брендирование", href: "#branding" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo compact />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Производство и брендирование одноразовой посуды и упаковки с 2011 года.
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
          <a href="tel:+74951362374" className="text-sm font-semibold transition-colors hover:text-primary">
            +7 (495) 136-23-74
          </a>
          <a
            href="mailto:info@smartplast.org"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            info@smartplast.org
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Московская обл., ГО Ногинск, пос. Затишье, тер. Технопарк Успенский
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Мы в сети</span>
          <div className="flex gap-3">
            {["TG", "VK", "WA"].map((s) => (
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
          <span>© {new Date().getFullYear()} СмартПласт. Все права защищены.</span>
          <span>Одноразовая посуда с брендированием под заказ</span>
        </div>
      </div>
    </footer>
  );
}
