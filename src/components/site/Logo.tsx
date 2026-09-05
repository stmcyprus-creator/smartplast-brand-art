import logoAsset from "@/assets/like-pack-logo.webp.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-3">
      <span className="grid place-items-center rounded-xl bg-foreground/95 p-1.5 transition-transform duration-300 group-hover:scale-105">
        <img
          src={logoAsset.url}
          alt="Like Pack"
          width={132}
          height={56}
          className="h-7 w-auto sm:h-8"
        />
      </span>
      {!compact && (
        <span className="hidden text-[10px] uppercase leading-tight tracking-[0.18em] text-muted-foreground sm:block">
          Производство упаковки
          <br />в Казахстане
        </span>
      )}
    </a>
  );
}
