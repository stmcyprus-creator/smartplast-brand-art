import { EMAIL, LEAD_EMAIL_EXTRA, WHATSAPP_NUMBER } from "./contacts";

export type Lead = {
  id: string;
  createdAt: string;
  source: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  city?: string;
  model?: string;
  quantity?: string;
  print?: string;
  term?: string;
  comment?: string;
  status: "new" | "in_progress" | "done";
};

const KEY = "likepack.leads.v1";

export function listLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Lead[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(leads: Lead[]) {
  window.localStorage.setItem(KEY, JSON.stringify(leads));
  window.dispatchEvent(new Event("likepack-leads"));
}

export function saveLead(data: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const lead: Lead = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  if (typeof window !== "undefined") write([lead, ...listLeads()]);
  return lead;
}

export function setLeadStatus(id: string, status: Lead["status"]) {
  write(listLeads().map((l) => (l.id === id ? { ...l, status } : l)));
}

export function removeLead(id: string) {
  write(listLeads().filter((l) => l.id !== id));
}

export function clearLeads() {
  write([]);
}

const fields: [keyof Lead, string][] = [
  ["source", "Источник"],
  ["model", "Модель"],
  ["quantity", "Количество"],
  ["print", "Печать"],
  ["term", "Срок поставки"],
  ["company", "Компания"],
  ["name", "Контактное лицо"],
  ["phone", "Телефон"],
  ["email", "Email"],
  ["city", "Город доставки"],
  ["comment", "Комментарий"],
];

export function leadToText(lead: Lead): string {
  return fields
    .filter(([k]) => lead[k])
    .map(([k, label]) => `${label}: ${lead[k]}`)
    .join("\n");
}

/** Письмо уходит на основную почту, копия — на дополнительные адреса. */
export function leadMailtoUrl(lead: Lead, subject: string): string {
  const cc = LEAD_EMAIL_EXTRA.length ? `&cc=${encodeURIComponent(LEAD_EMAIL_EXTRA.join(","))}` : "";
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${cc}&body=${encodeURIComponent(
    leadToText(lead),
  )}`;
}

/** Дубль заявки в WhatsApp — второй канал доставки. */
export function leadWhatsappUrl(lead: Lead, subject: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${subject}\n\n${leadToText(lead)}`)}`;
}

export function leadsToCsv(leads: Lead[]): string {
  const cols: (keyof Lead)[] = [
    "createdAt",
    "status",
    "source",
    "model",
    "quantity",
    "print",
    "term",
    "company",
    "name",
    "phone",
    "email",
    "city",
    "comment",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(";"), ...leads.map((l) => cols.map((c) => esc(l[c])).join(";"))].join("\n");
}
