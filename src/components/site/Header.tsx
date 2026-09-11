import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { label: "О компании", href: "#about" },
  { label: "Производство", href: "#production" },
  { label: "Продукция", href: "#products" },
  { label: "Брендирование", href: "#branding" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-2.5" : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+77005303141"
            className="hidden items-center gap-2 text-sm font-semibold transition-colors hover:text-primary md:flex"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            +7 700 530-31-41
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)] sm:inline-flex"
          >
            Обсудить проект
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-5 mt-3 rounded-3xl p-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="tel:+77005303141"
            className="mt-3 flex items-center gap-2 px-3 text-sm font-semibold text-primary"
          >
            <Phone className="h-4 w-4" /> +7 700 530-31-41
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Обсудить проект
          </a>
        </div>
      )}
    </header>
  );
}
