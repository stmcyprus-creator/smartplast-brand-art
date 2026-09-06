import logoAsset from "@/assets/logo-likepack.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="LikePack"
        width={960}
        height={480}
        className={`w-auto transition-transform duration-300 group-hover:scale-[1.03] ${
          compact ? "h-11" : "h-11"
        }`}
      />
      {!compact && (
        <span className="ml-1 hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:inline">
          branding
        </span>
      )}
    </a>
  );
}
