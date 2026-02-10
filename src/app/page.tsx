import { LEGAL_DOCUMENT_VERSIONS } from "@/server/legal/versions";

import { SiteLegalLinks } from "./_components/SiteLegalLinks";
import { SleepJobDemo } from "./_components/SleepJobDemo";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <header>
        <h1 className="text-2xl font-semibold">Hypnose-App (MVP)</h1>
        <p className="mt-1 text-sm text-black/70">
          Erster Produkt-Slice: rechtliche Baseline + KI-Transparenz im
          Generierungs-Flow.
        </p>
      </header>

      <SleepJobDemo
        aiTransferNoticeVersion={LEGAL_DOCUMENT_VERSIONS.aiTransferNotice}
      />

      <footer className="mt-auto flex flex-col gap-2 text-xs text-black/60">
        <SiteLegalLinks />
        <p>
          Planung: <code>planung/</code> · Agent-Tasks: <code>agents/tasks/</code>
        </p>
      </footer>
    </div>
  );
}
