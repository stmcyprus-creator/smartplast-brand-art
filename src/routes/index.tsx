import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import {
  About,
  Engineering,
  Mission,
  Partners,
  Printing,
  Production,
  Products,
  Stats,
} from "@/components/site/Sections";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Like Pack — современная упаковка Made in Kazakhstan";
const description =
  "Производство полипропиленовой упаковки для пищевой промышленности и розничной торговли. Высокое качество, роботизированное производство и шести цветная печать.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://smartplast-brand-art.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://smartplast-brand-art.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ТОО «ХВАМДА МАШИНЕРИ KZ»",
          alternateName: "Like Pack",
          url: "https://smartplast-brand-art.lovable.app/",
          address: { "@type": "PostalAddress", addressCountry: "KZ" },
          description,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Mission />
        <Products />
        <Production />
        <Printing />
        <Engineering />
        <Gallery />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
