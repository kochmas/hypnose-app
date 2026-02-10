import type { Metadata } from "next";

import { LEGAL_DOCUMENT_VERSIONS } from "@/server/legal/versions";

import { SiteLegalLinks } from "../_components/SiteLegalLinks";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Vorlaeufige DSGVO-Informationen fuer das MVP.",
};

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <header>
        <h1 className="text-2xl font-semibold">Datenschutz (vorlaeufig)</h1>
        <p className="mt-1 text-sm text-black/70">
          Version: {LEGAL_DOCUMENT_VERSIONS.privacyPolicy}
        </p>
      </header>

      <section className="rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="text-base font-semibold">Verarbeitung fuer KI-Generierung</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-black/80">
          <li>
            Eingaben koennen zur Skript- oder Audio-Erstellung an KI-Dienstleister
            uebertragen werden.
          </li>
          <li>
            Bitte keine sensiblen Daten und keine Daten Dritter ohne
            Rechtsgrundlage eingeben.
          </li>
          <li>
            Vor Launch werden Zwecke, Rechtsgrundlagen, Empfaenger,
            Drittlandtransfer und Speicherdauer final juristisch geprueft.
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="text-base font-semibold">Betroffenenrechte (Platzhalter)</h2>
        <p className="mt-2 text-black/80">
          Das MVP wird auf Export- und Loeschprozesse vorbereitet. Finale Inhalte
          und Kontaktkanaele werden vor Launch ergaenzt.
        </p>
      </section>

      <footer className="mt-auto flex flex-col gap-2 text-xs text-black/60">
        <SiteLegalLinks />
      </footer>
    </div>
  );
}
