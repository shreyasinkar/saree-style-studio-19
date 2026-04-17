import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Camera, Wand2, Download } from "lucide-react";
import heroImage from "@/assets/hero-saree.jpg";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SAREES } from "@/lib/sarees";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SareeStudio — Try Sarees Virtually with AI" },
      {
        name: "description",
        content:
          "Upload your photo and see how any saree looks on you with AI-powered virtual draping. Realistic, instant, beautiful.",
      },
      { property: "og:title", content: "SareeStudio — Virtual Saree Try-On" },
      {
        property: "og:description",
        content: "AI virtual saree draping. Upload your photo and try on sarees in seconds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-16 lg:py-24 items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Draping
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-primary">
              Try Sarees <span className="text-gold italic">Virtually</span>
              <br />
              See Before You Wear
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload a photo of yourself and our AI will drape any saree on you — realistically,
              with proper pleats, pallu, and lighting. No sticker overlays, just magic.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/try-on"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95 transition-all hover:-translate-y-0.5"
              >
                <Camera className="h-4 w-4" /> Upload Your Photo
              </Link>
              <Link
                to="/sarees"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-7 py-3.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                Explore Sarees
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-6 text-sm text-muted-foreground">
              <div>
                <p className="font-display text-2xl font-bold text-primary">10s</p>
                <p>Avg. generation</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-primary">50+</p>
                <p>Saree designs</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-primary">4K</p>
                <p>Photo quality</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={heroImage}
                alt="Woman wearing an elegant maroon and gold silk saree"
                className="w-full h-auto object-cover"
                width={1536}
                height={1024}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-soft hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AI Draping</p>
                <p className="text-sm font-medium text-foreground">Photorealistic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm uppercase tracking-widest text-gold mb-3">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Three simple steps to your perfect drape
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Upload your photo",
                desc: "A clear, well-lit full body or upper body photo works best.",
                step: "01",
              },
              {
                icon: Wand2,
                title: "Pick a saree",
                desc: "Choose from our curated catalog or upload your own saree image.",
                step: "02",
              },
              {
                icon: Download,
                title: "Get your look",
                desc: "AI drapes the saree on you in seconds. Download or share.",
                step: "03",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group relative rounded-3xl border border-border bg-card p-8 hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <span className="absolute top-6 right-6 font-display text-5xl text-gold/30 group-hover:text-gold/60 transition-colors">
                  {s.step}
                </span>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured collection */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold mb-3">Featured</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
                Curated saree collection
              </h2>
            </div>
            <Link
              to="/sarees"
              className="hidden md:inline-flex text-sm font-medium text-primary hover:text-gold transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {SAREES.slice(0, 6).map((s) => (
              <Link
                key={s.id}
                to="/try-on"
                search={{ saree: s.id }}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-soft hover:shadow-elegant transition-all"
              >
                <img
                  src={s.image}
                  alt={`${s.name} saree`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <p className="font-display text-xl font-semibold">{s.name}</p>
                  <p className="text-xs opacity-80">{s.fabric} · {s.color}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-royal p-12 md:p-16 text-center shadow-elegant">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.78 0.13 80) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.78 0.13 80) 0%, transparent 40%)",
            }} />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to find your perfect saree?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Stop guessing. See exactly how every saree looks on you before you commit.
              </p>
              <Link
                to="/try-on"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-gold-foreground shadow-gold hover:opacity-95 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> Start Draping Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
