"use client";

import { useState } from "react";
import { Loader2, Search, Lock } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanResults } from "@/components/scan-results";
import type { ScanResult } from "@/lib/types";

type ScanState = "idle" | "scanning" | "complete" | "error" | "gated";

const EXAMPLE_URLS = ["github.com", "stripe.com", "amazon.com"];

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isDemoSite(raw: string): boolean {
  const host = normalizeUrl(raw).replace(/^https?:\/\//, "").split("/")[0];
  return EXAMPLE_URLS.some((d) => host === d || host.endsWith(`.${d}`));
}

export function ScanForm() {
  const { isSignedIn } = useAuth();
  const [url, setUrl] = useState("");
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>("");

  async function runScan(rawUrl: string) {
    const normalized = normalizeUrl(rawUrl);
    if (!normalized) {
      setState("error");
      setError("Please enter a URL to scan.");
      return;
    }

    try {
      // eslint-disable-next-line no-new
      new URL(normalized);
    } catch {
      setState("error");
      setError("That doesn't look like a valid URL.");
      return;
    }

    if (!isSignedIn && !isDemoSite(rawUrl)) {
      setState("gated");
      return;
    }

    setState("scanning");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setError(data?.error ?? "Scan failed. Please try again.");
        return;
      }

      setResult(data as ScanResult);
      setState("complete");
    } catch {
      setState("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runScan(url);
  }

  function handleExample(example: string) {
    setUrl(example);
    runScan(example);
  }

  const scanning = state === "scanning";

  return (
    <div className="w-full space-y-10">
      <div className="space-y-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <label htmlFor="scan-url" className="sr-only">
              Website URL to scan
            </label>
            <Input
              id="scan-url"
              type="text"
              inputMode="url"
              placeholder="Enter a URL — e.g. stripe.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (state === "gated") setState("idle");
              }}
              disabled={scanning}
              aria-invalid={state === "error" || undefined}
              aria-describedby={state === "error" ? "scan-error" : undefined}
              className="h-13 w-full rounded-xl border-white/10 bg-white/8 px-4 text-base text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/20 backdrop-blur-sm"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={scanning}
            className="h-13 rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground hover:opacity-90 sm:w-auto"
          >
            {scanning ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Scanning…
              </>
            ) : (
              <>
                <Search className="size-4" aria-hidden="true" />
                Scan
              </>
            )}
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/40">
          <span>Try:</span>
          {EXAMPLE_URLS.map((example) => (
            <button
              key={example}
              type="button"
              disabled={scanning}
              onClick={() => handleExample(example)}
              className="text-white/60 underline-offset-2 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>

        {state === "error" ? (
          <p
            id="scan-error"
            role="alert"
            className="text-sm font-medium text-red-400"
          >
            {error}
          </p>
        ) : null}

        {state === "gated" ? (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Lock className="size-4 shrink-0 text-white/30" aria-hidden="true" />
              <span>
                Sign in to scan any website — or try one of the examples above (github.com, stripe.com, amazon.com).
              </span>
            </div>
            <SignInButton mode="modal">
              <button
                type="button"
                className="btn-premium shrink-0 whitespace-nowrap px-5 py-2 text-sm"
              >
                Sign in
              </button>
            </SignInButton>
          </div>
        ) : null}
      </div>

      {state === "complete" && result ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6">
          <ScanResults result={result} />
        </div>
      ) : null}
    </div>
  );
}
