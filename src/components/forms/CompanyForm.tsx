"use client";

import * as React from "react";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
        {label}
      </div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/40",
        "focus:outline-none focus:ring-2 focus:ring-black/15",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black",
        "focus:outline-none focus:ring-2 focus:ring-black/15",
      ].join(" ")}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/40",
        "focus:outline-none focus:ring-2 focus:ring-black/15",
      ].join(" ")}
    />
  );
}

function SubmitRow({ onDone }: { onDone: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="submit"
        className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onDone}
        className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/70 hover:border-black/25 hover:text-black"
      >
        Cancel
      </button>
    </div>
  );
}

export default function CompanyForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to an API route / form provider
        onDone();
      }}
      className="grid gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input required placeholder="Your name" />
        </Field>
        <Field label="Phone Number">
          <Input required placeholder="+234..." />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City / Area">
          <Input required placeholder="Warri, Effurun..." />
        </Field>
        <Field label="Age Range (optional)">
          <Select defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Under 18</option>
            <option>18–24</option>
            <option>25–34</option>
            <option>35–44</option>
            <option>45+</option>
          </Select>
        </Field>
      </div>

      <Field label="Company Type (optional)">
        <Select defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Men’s Company</option>
          <option>Women’s Company</option>
          <option>Young Professionals</option>
          <option>Campus / Students</option>
        </Select>
      </Field>

      <Field label="Notes (optional)">
        <Textarea rows={4} placeholder="Anything specific you're looking for..." />
      </Field>

      <SubmitRow onDone={onDone} />
    </form>
  );
}
