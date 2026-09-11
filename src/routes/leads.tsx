import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/reveal";
import { EMAIL } from "@/lib/contacts";
import {
  clearLeads,
  leadMailtoUrl,
  leadWhatsappUrl,
  leadsToCsv,
  listLeads,
  removeLead,
  setLeadStatus,
  type Lead,
} from "@/lib/leads";

const title = "Заявки клиентов — like-pack.qz";
const description =
  "Список заявок, оформленных на сайте like-pack.qz: модель, тираж, срок и контакты клиента, выгрузка в CSV и отправка в WhatsApp.";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leads,
});

const statusLabel: Record<Lead["status"], string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Завершена",
};

const statusOrder: Lead["status"][] = ["new", "in_progress", "done"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
}

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | Lead["status"]>("all");

  useEffect(() => {
    const sync = () => setLeads(listLeads());
    sync();
    window.addEventListener("likepack-leads", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("likepack-leads", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const exportCsv = () => {
    const blob = new Blob([`\uFEFF${leadsToCsv(leads)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zayavki-like-pack-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.22em] text-primary">Панель заявок</span>
          <h1 className="mt-4 text-[clamp(2.1rem,6vw,3.6rem)] font-bold leading-[1.04]">
            Заявки <span className="text-lime-gradient">клиентов</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            Здесь сохраняются все заявки, оформленные с этого устройства. Каждая заявка также уходит
            письмом на {EMAIL} и дублируется в WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {(["all", ...statusOrder] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  filter === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {s === "all" ? `Все (${leads.length})` : `${statusLabel[s]} (${leads.filter((l) => l.status === s).length})`}
              </button>
            ))}
            <span className="ml-auto flex gap-3">
              <button
                type="button"
                onClick={exportCsv}
                disabled={!leads.length}
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
              >
                <Download className="h-4 w-4" /> CSV
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Удалить все заявки из списка?")) clearLeads();
                }}
                disabled={!leads.length}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-40"
              >
                Очистить
              </button>
            </span>
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <Reveal delay={120}>
            <div className="glass mt-10 rounded-[2rem] p-12 text-center">
              <h2 className="font-display text-xl font-bold">Заявок пока нет</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Как только клиент отправит форму на сайте, заявка появится в этом списке.
              </p>
              <Link
                to="/order"
                className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Открыть форму заявки
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 space-y-5">
            {visible.map((l) => (
              <article key={l.id} className="glass rounded-[2rem] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {formatDate(l.createdAt)} · {l.source}
                    </span>
                    <h2 className="mt-2 font-display text-lg font-bold">
                      {l.name}
                      {l.company ? ` — ${l.company}` : ""}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {statusOrder.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setLeadStatus(l.id, s)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                          l.status === s
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {statusLabel[s]}
                      </button>
                    ))}
                    <button
                      type="button"
                      aria-label="Удалить заявку"
                      onClick={() => removeLead(l.id)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Модель", l.model],
                    ["Количество", l.quantity],
                    ["Печать", l.print],
                    ["Срок", l.term],
                    ["Город", l.city],
                    ["Комментарий", l.comment],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k as string}>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                        <dd className="mt-1">{v}</dd>
                      </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${l.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-primary" /> {l.phone}
                  </a>
                  {l.email && (
                    <a
                      href={`mailto:${l.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                    >
                      <Mail className="h-4 w-4 text-primary" /> {l.email}
                    </a>
                  )}
                  <a
                    href={leadWhatsappUrl(l, "Заявка like-pack.qz")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <MessageCircle className="h-4 w-4" /> В WhatsApp
                  </a>
                  <a
                    href={leadMailtoUrl(l, "Заявка like-pack.qz")}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    <Mail className="h-4 w-4" /> Переслать на почту
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
