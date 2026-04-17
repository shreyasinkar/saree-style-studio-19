import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Upload, Sparkles, Download, RotateCcw, Loader2, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SAREES, type Saree } from "@/lib/sarees";
import { drapeSaree } from "@/server/drape-saree";
import { toast } from "sonner";

type Search = { saree?: string };

export const Route = createFileRoute("/try-on")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    saree: typeof search.saree === "string" ? search.saree : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Virtual Try-On — SareeStudio" },
      { name: "description", content: "Upload your photo, pick a saree, and let AI drape it on you in seconds." },
      { property: "og:title", content: "Virtual Saree Try-On" },
      { property: "og:description", content: "Upload your photo and let AI drape any saree on you." },
    ],
  }),
  component: TryOnPage,
});

type Step = 1 | 2 | 3 | 4;

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function urlToDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function TryOnPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState<Step>(1);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(
    search.saree ? SAREES.find((s) => s.id === search.saree) ?? null : null,
  );
  const [customSaree, setCustomSaree] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const userInputRef = useRef<HTMLInputElement>(null);
  const sareeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedSaree && step === 1 && !userImage) setStep(1);
  }, [selectedSaree, step, userImage]);

  const handleUserUpload = async (file?: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image too large. Please use one under 10MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setUserImage(dataUrl);
    setStep(2);
  };

  const handleSareeUpload = async (file?: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Saree image too large. Please use one under 10MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setCustomSaree(dataUrl);
    setSelectedSaree(null);
  };

  const handleGenerate = async () => {
    if (!userImage) {
      toast.error("Please upload your photo first");
      setStep(1);
      return;
    }
    const sareeData = customSaree ?? (selectedSaree ? await urlToDataUrl(selectedSaree.image) : null);
    if (!sareeData) {
      toast.error("Please select or upload a saree");
      setStep(2);
      return;
    }

    setLoading(true);
    setStep(3);
    try {
      const res = await drapeSaree({ data: { userImage, sareeImage: sareeData } });
      setResult(res.image);
      setStep(4);
      toast.success("Your drape is ready!");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setStep(2);
  };

  const startOver = () => {
    setUserImage(null);
    setSelectedSaree(null);
    setCustomSaree(null);
    setResult(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Stepper step={step} />

        <div className="mt-10">
          {step === 1 && (
            <UploadStep
              userImage={userImage}
              onPick={() => userInputRef.current?.click()}
              onContinue={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <SareeStep
              userImage={userImage}
              selectedSaree={selectedSaree}
              customSaree={customSaree}
              onSelect={(s) => { setSelectedSaree(s); setCustomSaree(null); }}
              onUploadSaree={() => sareeInputRef.current?.click()}
              onBack={() => setStep(1)}
              onGenerate={handleGenerate}
            />
          )}

          {step === 3 && <GeneratingStep />}

          {step === 4 && result && (
            <ResultStep
              image={result}
              onTryAnother={reset}
              onStartOver={startOver}
            />
          )}
        </div>

        <input
          ref={userInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUserUpload(e.target.files?.[0])}
        />
        <input
          ref={sareeInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleSareeUpload(e.target.files?.[0])}
        />

        {loading && step !== 3 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const items = [
    { n: 1, label: "Upload" },
    { n: 2, label: "Select" },
    { n: 3, label: "Generate" },
    { n: 4, label: "Download" },
  ] as const;
  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        return (
          <div key={it.n} className="flex items-center gap-3 md:gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                  ${done ? "bg-gold text-gold-foreground" : active ? "bg-primary text-primary-foreground shadow-elegant scale-110" : "bg-muted text-muted-foreground"}`}
              >
                {done ? <Check className="h-5 w-5" /> : it.n}
              </div>
              <span className={`mt-2 text-xs font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {it.label}
              </span>
            </div>
            {i < items.length - 1 && (
              <div className={`h-px w-8 md:w-16 ${step > it.n ? "bg-gold" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function UploadStep({ userImage, onPick, onContinue }: {
  userImage: string | null;
  onPick: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          Upload your photo
        </h1>
        <p className="mt-3 text-muted-foreground">
          For best results, use a clear, well-lit photo with your full body or upper body visible.
        </p>
      </div>
      <div
        onClick={onPick}
        className="cursor-pointer rounded-3xl border-2 border-dashed border-border bg-card p-10 text-center hover:border-primary hover:bg-primary/5 transition-all"
      >
        {userImage ? (
          <div className="space-y-4">
            <img
              src={userImage}
              alt="Your photo"
              className="mx-auto max-h-80 rounded-2xl shadow-soft"
            />
            <p className="text-sm text-muted-foreground">Click to change photo</p>
          </div>
        ) : (
          <div className="space-y-4 py-6">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-foreground">
                Click to upload your photo
              </p>
              <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        )}
      </div>
      {userImage && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95 transition-opacity"
          >
            Continue <Sparkles className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function SareeStep({
  userImage, selectedSaree, customSaree, onSelect, onUploadSaree, onBack, onGenerate,
}: {
  userImage: string | null;
  selectedSaree: Saree | null;
  customSaree: string | null;
  onSelect: (s: Saree) => void;
  onUploadSaree: () => void;
  onBack: () => void;
  onGenerate: () => void;
}) {
  const canGo = !!userImage && (!!selectedSaree || !!customSaree);
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          Choose your saree
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick from our collection or upload your own saree image.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={onUploadSaree}
          className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all
            ${customSaree ? "border-gold bg-gold/10" : "border-border bg-card hover:border-primary hover:bg-primary/5"}`}
        >
          {customSaree ? (
            <img src={customSaree} alt="Custom saree" className="h-full w-full object-cover rounded-2xl" />
          ) : (
            <>
              <Upload className="h-7 w-7 text-primary" />
              <span className="text-sm font-medium text-foreground">Upload saree</span>
            </>
          )}
        </button>

        {SAREES.map((s) => {
          const active = selectedSaree?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted transition-all
                ${active ? "ring-4 ring-gold shadow-gold scale-[0.98]" : "shadow-soft hover:shadow-elegant"}`}
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-3 text-left">
                <p className="font-display text-sm font-semibold text-primary-foreground">{s.name}</p>
                <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider">
                  {s.fabric}
                </p>
              </div>
              {active && (
                <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-gold flex items-center justify-center">
                  <Check className="h-4 w-4 text-gold-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
        >
          ← Change photo
        </button>
        <button
          disabled={!canGo}
          onClick={onGenerate}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="h-4 w-4" /> Drape this saree
        </button>
      </div>
    </div>
  );
}

function GeneratingStep() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="relative mx-auto h-24 w-24 mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-gold animate-ping opacity-50" />
        <div className="relative h-24 w-24 rounded-full bg-gradient-royal flex items-center justify-center shadow-elegant">
          <Sparkles className="h-10 w-10 text-gold animate-pulse" />
        </div>
      </div>
      <h2 className="font-display text-3xl font-bold text-primary">
        Draping your saree...
      </h2>
      <p className="mt-3 text-muted-foreground">
        Our AI is carefully aligning pleats, draping the pallu, and matching the lighting.
        This usually takes 10–20 seconds.
      </p>
    </div>
  );
}

function ResultStep({ image, onTryAnother, onStartOver }: {
  image: string;
  onTryAnother: () => void;
  onStartOver: () => void;
}) {
  const download = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = `saree-drape-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-gold mb-2">Your look</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
          Stunning, isn't it?
        </h2>
      </div>
      <div className="relative rounded-3xl overflow-hidden shadow-elegant bg-card">
        <img src={image} alt="You wearing the saree" className="w-full h-auto" />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={download}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95 transition-opacity"
        >
          <Download className="h-4 w-4" /> Download image
        </button>
        <button
          onClick={onTryAnother}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
        >
          <Sparkles className="h-4 w-4" /> Try another saree
        </button>
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
      </div>
    </div>
  );
}
