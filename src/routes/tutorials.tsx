import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, PlayCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/tutorials")({
  head: () => ({
    meta: [
      { title: "Saree Draping Tutorials — SareeStudio" },
      {
        name: "description",
        content:
          "Watch tutorials for Nauvari, Gujarati and Bengali saree draping styles, and try each one virtually on your photo.",
      },
      { property: "og:title", content: "Saree Draping Tutorials + Virtual Try-On" },
      {
        property: "og:description",
        content:
          "Learn traditional saree drapes with video tutorials and try them virtually on your own photo.",
      },
    ],
  }),
  component: TutorialsPage,
});

type Tutorial = {
  styleId: string;
  name: string;
  region: string;
  shortDescription: string;
  longDescription: string;
  youtubeId: string;
};

const TUTORIALS: Tutorial[] = [
  {
    styleId: "maharashtrian",
    name: "Nauvari (Maharashtrian)",
    region: "Maharashtra",
    shortDescription: "Nine-yard dhoti-style drape — agile, traditional, no petticoat.",
    longDescription:
      "The Nauvari is a 9-yard saree draped dhoti-style, tucked between the legs and pleated tightly across the chest. Historically worn by Marathi women warriors, it offers full freedom of movement.",
    youtubeId: "0xeRt6iIxPU",
  },
  {
    styleId: "gujarati",
    name: "Gujarati (Seedha Pallu)",
    region: "Gujarat / Rajasthan",
    shortDescription: "Front pallu spread wide across the chest — pleats at the waist.",
    longDescription:
      "In the Seedha Pallu style, the pallu is brought from the back over the right shoulder and spread across the chest like a front panel — perfect for showing off heavy zari or motif work.",
    youtubeId: "_cdLBHCWae8",
  },
  {
    styleId: "bengali",
    name: "Bengali (Atpoure)",
    region: "West Bengal",
    shortDescription: "No pleats, two pallu loops, signature key-bunch on the shoulder.",
    longDescription:
      "The Atpoure drape uses no waist pleats. The pallu is wrapped over the left shoulder, brought back under the right arm, and thrown over the left shoulder again — often with a key-bunch tassel as the finishing touch.",
    youtubeId: "0zWmloc6pZ4",
  },
];

function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Learn · Watch · Try
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
            Saree Draping Tutorials
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Watch how each traditional drape is done, then try it virtually on your own photo
            in seconds.
          </p>
        </div>

        <div className="space-y-10">
          {TUTORIALS.map((t, i) => (
            <article
              key={t.styleId}
              className="grid md:grid-cols-2 gap-8 items-center rounded-3xl bg-card p-6 md:p-8 shadow-soft border border-border/50"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-elegant">
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}`}
                    title={`${t.name} draping tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-xs uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" /> {t.region}
                </p>
                <h2 className="font-display text-3xl font-bold text-primary">{t.name}</h2>
                <p className="mt-3 text-foreground/80 font-medium">{t.shortDescription}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t.longDescription}
                </p>
                <div className="mt-6">
                  <Link
                    to="/try-on"
                    search={{ style: t.styleId }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95 transition-opacity"
                  >
                    <Sparkles className="h-4 w-4" /> Try This Style Virtually
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-royal p-10 text-center shadow-elegant">
          <h3 className="font-display text-3xl font-bold text-primary-foreground">
            Ready to see yourself draped?
          </h3>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
            Upload a full-body photo and let our AI handle the pleats, pallu and lighting.
          </p>
          <Link
            to="/try-on"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-gold-foreground shadow-gold hover:opacity-95 transition-opacity"
          >
            <Sparkles className="h-4 w-4" /> Start Virtual Try-On
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
