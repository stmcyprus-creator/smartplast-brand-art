import logoLime from "@/assets/logo-lime.svg";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-2.5">
      <img
        src={logoLime}
        alt="Like Pack"
        width={2550}
        height={1500}
        className={`w-auto transition-transform duration-300 group-hover:scale-[1.03] ${
          compact ? "h-11" : "h-11"
        }`}
      />
    </a>
  );
}
