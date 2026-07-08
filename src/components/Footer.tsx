export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} Electronics & Telecommunication Engineering, CUET.
        </p>
        <p className="text-sm text-muted-foreground">Built with curiosity, circuits, and light.</p>
      </div>
    </footer>
  );
}
