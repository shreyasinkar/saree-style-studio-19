export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl text-primary">
          Saree<span className="text-gold">Studio</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Try sarees virtually — see before you wear. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
