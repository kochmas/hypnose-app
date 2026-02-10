import type { Metadata } from "next";

import { LEGAL_DOCUMENT_VERSIONS } from "@/server/legal/versions";

import { SiteLegalLinks } from "../_components/SiteLegalLinks";

export const metadata: Metadata = {
  title: "AGB",
  description: "Vorlaeufige Allgemeine Geschaeftsbedingungen fuer das MVP.",
};

export default function AgbPage() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <header>
        <h1 className="text-2xl font-semibold">AGB (vorlaeufig)</h1>
        <p className="mt-1 text-sm text-black/70">
          Version: {LEGAL_DOCUMENT_VERSIONS.termsOfService}
        </p>
      </header>

      <section className="rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="text-base font-semibold">Leistungsrahmen</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-black/80">
          <li>
            Die App liefert KI-gestuetzte Texte und Audio-Dateien fuer
            Wellness-Anwendungen.
          </li>
          <li>
            Kein Ersatz fuer Therapie, Diagnose oder medizinische Behandlung.
          </li>
          <li>
            Fuer die Leistungserbringung koennen externe KI-Dienstleister genutzt
            werden.
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="text-base font-semibold">Nutzerpflichten (Platzhalter)</h2>
        <p className="mt-2 text-black/80">
          Vor Launch werden Credits, Haftungsrahmen, Rueckerstattung und
          Nutzungsregeln final juristisch abgestimmt und versioniert.
        </p>
      </section>

      <footer className="mt-auto flex flex-col gap-2 text-xs text-black/60">
        <SiteLegalLinks />
      </footer>
    </div>
  );
}
