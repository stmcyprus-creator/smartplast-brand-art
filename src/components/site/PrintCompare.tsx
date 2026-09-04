import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import mockup from "@/assets/kz-mockup.jpg";
import final from "@/assets/kz-final.jpg";

export function PrintCompare() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
      <div
        ref={ref}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        <img
          src={final}
          alt="Готовая упаковка с шестицветной печатью"
          loading="lazy"
          width={1000}
          height={700}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img
            src={mockup}
            alt="Печатный макет упаковки"
            loading="lazy"
            width={1000}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="glass absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
          Макет
        </span>
        <span className="glass absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
          Готовая упаковка
        </span>

        <div
          className="absolute inset-y-0 w-px bg-primary"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <MoveHorizontal className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Потяните ползунок, чтобы сравнить исходный макет и готовую упаковку
        </p>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Сравнение макета и готовой упаковки"
          onChange={(e) => setPos(Number(e.target.value))}
          className="w-full accent-[var(--primary)] sm:w-56"
        />
      </div>
    </div>
  );
}
