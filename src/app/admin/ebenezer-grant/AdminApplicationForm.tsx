"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { GRANT_STATUSES, GrantStatus } from "@/lib/ebenezerGrant/types";

type Props = {
  applicationId: string;
  initialStatus: GrantStatus;
  initialNotes: string;
};

export default function AdminApplicationForm({
  applicationId,
  initialStatus,
  initialNotes,
}: Props) {
  const [status, setStatus] = useState<GrantStatus>(initialStatus);
  const [internalNotes, setInternalNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/ebenezer-grant/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internal_notes: internalNotes }),
      });
      const data = await response.json();

      if (!response.ok || !data?.ok) {
        setError(data?.error || "Could not save changes.");
        return;
      }

      setMessage("Changes saved.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-neutral-50 p-6">
      <h2 className="text-xl font-black">Admin Actions</h2>
      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-bold">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as GrantStatus)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/15"
          >
            {GRANT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="internal_notes" className="mb-2 block text-sm font-bold">
            Internal Notes
          </label>
          <textarea
            id="internal_notes"
            value={internalNotes}
            onChange={(event) => setInternalNotes(event.target.value)}
            rows={8}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/15"
          />
        </div>

        {message ? <p className="text-sm font-semibold text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/90 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
