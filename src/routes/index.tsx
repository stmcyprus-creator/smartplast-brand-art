import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About, Delivery, Process, Products, Stats, Why } from "@/components/site/Sections";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "СмартПласт — брендированная одноразовая посуда под заказ";
const description =
  "Производим одноразовую посуду и упаковку с вашим логотипом: дизайн, образец, тираж от 10 000 шт. за 14 дней. Собственное производство в Московской области.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <Products />
        <Process />
        <Why />
        <Delivery />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
