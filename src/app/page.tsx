import { SleepJobDemo } from "./_components/SleepJobDemo";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10 font-sans">
      <header>
        <h1 className="text-2xl font-semibold">Hypnose-App (MVP)</h1>
        <p className="mt-1 text-sm text-black/70">
          Repo-Bootstrap: Next.js + Postgres + Prisma + Worker Skeleton.
        </p>
      </header>

      <SleepJobDemo />

      <footer className="mt-auto text-xs text-black/50">
        Planung: <code>planung/</code> · Agent-Tasks: <code>agents/tasks/</code>
      </footer>
    </div>
  );
}
