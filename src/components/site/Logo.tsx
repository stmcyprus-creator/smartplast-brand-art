import logoLime from "@/assets/logo-lime-h.svg";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex shrink-0 items-center">
      <img
        src={logoLime}
        alt="Like Pack"
        width={350}
        height={100}
        className={`w-auto transition-transform duration-300 group-hover:scale-[1.03] ${
          compact ? "h-11" : "h-14 lg:h-16"
        }`}
      />
    </a>
  );
}
