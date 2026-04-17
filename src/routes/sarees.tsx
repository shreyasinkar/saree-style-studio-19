import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SAREES } from "@/lib/sarees";

export const Route = createFileRoute("/sarees")({
  head: () => ({
    meta: [
      { title: "Saree Collection — SareeStudio" },
      { name: "description", content: "Browse our curated saree collection — silk, georgette, chanderi and more. Try any of them virtually." },
      { property: "og:title", content: "Saree Collection — SareeStudio" },
      { property: "og:description", content: "Browse our curated saree collection and try any of them virtually." },
    ],
  }),
  component: SareesPage,
});

function SareesPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">The Collection</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary">
            Discover your drape
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Click any saree to try it on with your photo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SAREES.map((s) => (
            <Link
              key={s.id}
              to="/try-on"
              search={{ saree: s.id }}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-soft group-hover:shadow-elegant transition-all">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="font-display text-lg font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {s.fabric} · {s.color}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
