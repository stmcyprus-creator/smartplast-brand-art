import { useState } from "react";
import { Download, Loader2, Sparkles } from "lucide-react";
import { streamImage } from "@/lib/streamImage";

const formats = [
  { id: "square", label: "Пост 1:1", ratio: "aspect-square", hint: "square 1:1 composition, 1080x1080" },
  {
    id: "story",
    label: "Сториз 9:16",
    ratio: "aspect-[9/16]",
    hint: "vertical 9:16 composition, 1080x1920",
  },
  {
    id: "banner",
    label: "Баннер 16:9",
    ratio: "aspect-video",
    hint: "wide 16:9 composition, 1920x1080",
  },
] as const;

const STYLE =
  "Premium cinematic product photography for the brand Like Pack: matte graphite dark background, " +
  "lime green rim light and soft glow, subtle grain, glossy reflections, shallow depth of field, " +
  "high-end advertising look, no text artifacts, no watermarks.";

const presets = [
  "Три матовых стакана 500 мл с золотым орнаментом и надписью Qazaqstan на подиуме",
  "Макро одного матового стакана с лаймовой подсветкой и логотипом Like Pack",
  "Стакан в руке на фоне вечернего города, лаймовые неоновые отблески",
];

export function PromoGenerator() {
  const [prompt, setPrompt] = useState(presets[0]);
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("square");
  const [src, setSrc] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const active = formats.find((f) => f.id === format)!;

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setSrc(null);
    setIsFinal(false);
    try {
      await streamImage(
        "/api/generate-image",
        `${prompt.trim()}. ${active.hint}. ${STYLE}`,
        (dataUrl, final) => {
          setSrc(dataUrl);
          if (final) setIsFinal(true);
        },
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось создать кадр");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass mt-16 rounded-[2rem] p-6 sm:p-8 lg:p-10">
      <span className="text-xs uppercase tracking-[0.22em] text-primary">Генератор кадров</span>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Создайте кадр из текста</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Опишите, как должны выглядеть стаканы и сцена — кадр появится в фирменном стиле Like Pack и
        будет готов к публикации.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <label htmlFor="promo-prompt" className="text-sm font-semibold">
            Описание кадра
          </label>
          <textarea
            id="promo-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-2xl border border-border bg-background/60 p-4 text-sm outline-none transition-colors focus:border-primary"
            placeholder="Например: два матовых стакана с праздничной печатью на фоне гирлянд"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrompt(p)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {p.slice(0, 34)}…
              </button>
            ))}
          </div>

          <div className="mt-6">
            <span className="text-sm font-semibold">Формат</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    format === f.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Создаём кадр…" : "Создать кадр"}
          </button>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </div>

        <div>
          <div
            className={`${active.ratio} grid w-full place-items-center overflow-hidden rounded-[1.5rem] border border-border bg-secondary`}
          >
            {src ? (
              <img
                src={src}
                alt={prompt}
                className={`h-full w-full object-cover transition-[filter] duration-500 ${
                  isFinal ? "blur-0" : "blur-2xl"
                }`}
              />
            ) : (
              <p className="p-6 text-center text-sm text-muted-foreground">
                {loading ? "Кадр создаётся…" : "Здесь появится ваш кадр"}
              </p>
            )}
          </div>

          {src && isFinal && (
            <a
              href={src}
              download={`like-pack-${format}.png`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="h-4 w-4" /> Скачать кадр
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
