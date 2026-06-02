"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

type Props = {
  documentId: string;
};

export default function DocumentButton({ documentId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openDocument() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/ebenezer-grant/documents/${documentId}/signed-url`
      );
      const data = await response.json();

      if (!response.ok || !data?.ok || !data?.url) {
        setError(data?.error || "Could not open document.");
        return;
      }

      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={openDocument}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-black/90 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}
        View/Download
      </button>
      {error ? <span className="text-xs font-semibold text-red-700">{error}</span> : null}
    </div>
  );
}
