import type { Metadata } from "next";

import { LEGAL_DOCUMENT_VERSIONS } from "@/server/legal/versions";

import { SiteLegalLinks } from "../_components/SiteLegalLinks";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Vorlaeufige Anbieterkennzeichnung fuer das MVP.",
};

export default function ImpressumPage() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <header>
        <h1 className="text-2xl font-semibold">Impressum (vorlaeufig)</h1>
        <p className="mt-1 text-sm text-black/70">
          Version: {LEGAL_DOCUMENT_VERSIONS.imprint}
        </p>
      </header>

      <section className="rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="text-base font-semibold">Anbieterkennzeichnung</h2>
        <p className="mt-2 text-black/80">
          Dieses Impressum ist ein Platzhalter fuer das MVP und wird vor dem
          oeffentlichen Launch mit den finalen Pflichtangaben juristisch geprueft.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-black/80">
          <li>Name/Firma</li>
          <li>vollstaendige Anschrift</li>
          <li>Kontakt (E-Mail, ggf. Telefon)</li>
          <li>Vertretungsberechtigte Person</li>
          <li>Registerangaben und USt-ID (falls vorhanden)</li>
        </ul>
      </section>

      <footer className="mt-auto flex flex-col gap-2 text-xs text-black/60">
        <SiteLegalLinks />
      </footer>
    </div>
  );
}
