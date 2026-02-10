import Link from "next/link";

export function SiteLegalLinks() {
  return (
    <nav aria-label="Rechtliche Seiten" className="flex flex-wrap gap-3 text-xs">
      <Link href="/impressum" className="underline underline-offset-2">
        Impressum
      </Link>
      <Link href="/datenschutz" className="underline underline-offset-2">
        Datenschutz
      </Link>
      <Link href="/agb" className="underline underline-offset-2">
        AGB
      </Link>
    </nav>
  );
}
