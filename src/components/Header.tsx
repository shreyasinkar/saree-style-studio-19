import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            Saree<span className="text-gold">Studio</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
          >
            Home
          </Link>
          <Link
            to="/try-on"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Try On
          </Link>
          <Link
            to="/sarees"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            Collection
          </Link>
          <Link
            to="/try-on"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-95 transition-opacity"
          >
            Start Draping
          </Link>
        </nav>
      </div>
    </header>
  );
}
