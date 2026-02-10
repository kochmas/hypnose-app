"use client";

import { useEffect, useMemo, useState } from "react";

type JobStatus = "queued" | "running" | "succeeded" | "failed";

type JobResponse = {
  id: string;
  type: string;
  status: JobStatus;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  lastError: string | null;
};

export function SleepJobDemo() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const isTerminal = useMemo(
    () => job?.status === "succeeded" || job?.status === "failed",
    [job?.status],
  );

  async function startJob() {
    setIsStarting(true);
    setError(null);
    setJob(null);

    try {
      const res = await fetch("/api/jobs/sleep", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ seconds: 5 }),
      });
      if (!res.ok) throw new Error(`start failed (${res.status})`);

      const data = (await res.json()) as { id: string };
      setJobId(data.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsStarting(false);
    }
  }

  useEffect(() => {
    if (!jobId) return;

    let canceled = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (!res.ok) throw new Error(`status failed (${res.status})`);
        const data = (await res.json()) as JobResponse;
        if (!canceled) setJob(data);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : String(e));
      }
    }, 1000);

    return () => {
      canceled = true;
      clearInterval(interval);
    };
  }, [jobId]);

  return (
    <section className="w-full rounded-lg border border-black/10 p-4">
      <h2 className="text-lg font-semibold">Worker Smoke Test</h2>
      <p className="text-sm text-black/70">
        Startet einen 5s-Job, der im Worker verarbeitet wird und dessen Status per
        Polling abgefragt wird.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={startJob}
          disabled={isStarting}
          className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isStarting ? "Starte…" : "Sleep-Job starten"}
        </button>

        {jobId ? (
          <span className="text-xs text-black/70">Job ID: {jobId}</span>
        ) : null}
      </div>

      {error ? (
        <pre className="mt-3 whitespace-pre-wrap rounded-md bg-red-50 p-3 text-xs text-red-900">
          {error}
        </pre>
      ) : null}

      {job ? (
        <pre className="mt-3 overflow-auto rounded-md bg-black/5 p-3 text-xs">
          {JSON.stringify(job, null, 2)}
        </pre>
      ) : null}

      {isTerminal ? (
        <p className="mt-2 text-xs text-black/70">
          Status ist terminal ({job?.status}). Polling kann später optimiert werden
          (DEC-023).
        </p>
      ) : null}
    </section>
  );
}

