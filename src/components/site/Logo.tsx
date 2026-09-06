export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
        <span className="font-display text-sm font-bold">lp</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight sm:text-lg">
          like-pack<span className="text-primary">.qz</span>
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
            Производство упаковки в Казахстане
          </span>
        )}
      </span>
    </a>
  );
}
