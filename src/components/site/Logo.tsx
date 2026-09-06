export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
        <span className="font-display text-sm font-bold">С</span>
      </span>
      <span className="font-display text-base font-bold tracking-tight sm:text-lg">
        Смарт<span className="text-primary">Пласт</span>
      </span>
      {!compact && (
        <span className="ml-1 hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:inline">
          branding
        </span>
      )}
    </a>
  );
}
