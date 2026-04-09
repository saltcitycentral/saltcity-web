"use client";

import { useState } from "react";

// ─── Tiny helper ──────────────────────────────────────────────────────────────
function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-black/60">{label}</div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/40",
        "focus:outline-none focus:ring-2 focus:ring-black/15",
        props.className
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black",
        "focus:outline-none focus:ring-2 focus:ring-black/15"
      )}
    />
  );
}

function SubmitRow({ onDone, loading }: { onDone: () => void; loading?: boolean }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="submit"
        disabled={loading}
        className={cx(
          "rounded-full bg-black px-6 py-3 text-sm font-semibold text-white",
          loading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
        )}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button
        type="button"
        onClick={onDone}
        disabled={loading}
        className={cx(
          "rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/70",
          loading ? "cursor-not-allowed opacity-60" : "hover:border-black/25 hover:text-black"
        )}
      >
        Cancel
      </button>
    </div>
  );
}

// ─── Network Helper ───────────────────────────────────────────────────────────
async function submitToWebApp(payload: Record<string, any>) {
  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = JSON.parse(text);
  } catch {
    // ignore
  }

  if (!data?.ok) throw new Error(data?.error || "Submission failed");
}

// ─── Privacy Policy Modal ─────────────────────────────────────────────────────
function PrivacyPolicyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Privacy Policy"
    >
      <button
        aria-label="Close privacy policy"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <div className="relative flex max-h-[85vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-black/10 px-6 pb-4 pt-6">
          <div>
            <h3 className="text-lg font-black tracking-tight text-black">Privacy Policy</h3>
            <p className="mt-1 text-xs text-black/50">Salt City Church, Warri</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-semibold text-black/70 hover:bg-black/5 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="prose prose-sm max-w-none flex-1 space-y-5 overflow-y-auto px-6 py-6 leading-relaxed text-black/80">

  <p className="text-base font-bold text-black">
    Privacy Policy
  </p>

  <p>
    This Privacy Policy explains how SaltCity Church (the "Church") handles your information.
    We are committed to protecting your privacy in line with the Nigeria Data Protection Act, 2023.
  </p>

  <h4 className="font-semibold text-black">1. Who We Are</h4>
  <p>
    The Church is the "Data Controller," meaning we decide how and why your personal information is used.
  </p>
  <ul>
    <li>Address: 20, Okumagba Avenue, Delta State</li>
    <li>Contact: info@saltcitycentral.org, +234-803-059-7015</li>
  </ul>

  <h4 className="font-semibold text-black">2. Information We Collect</h4>
  <ul>
    <li>Personal Information: Your name, address, phone number, email, and date of birth.</li>
    <li>
      Sensitive Information: As a religious organisation, we process information about your religious beliefs,
      your family, and any pastoral needs you share with us.
    </li>
  </ul>

  <h4 className="font-semibold text-black">3. Why We Use Your Information</h4>
  <ul>
    <li>To keep an accurate list of our members.</li>
    <li>To provide you with spiritual support and pastoral care.</li>
    <li>To send you updates about church services, events, and activities.</li>
    <li>To manage volunteers and church groups.</li>
  </ul>

  <h4 className="font-semibold text-black">4. Our Legal Basis</h4>
  <ul>
    <li>You gave us consent when you accepted this policy.</li>
    <li>
      Legitimate Church Activity: The law allows religious organisations to process member data
      to carry out their purpose, provided it is kept secure and not shared externally without permission.
    </li>
  </ul>

  <h4 className="font-semibold text-black">5. Keeping Your Data Safe</h4>
  <p>
    We use appropriate security measures to protect your information from loss, misuse, or unauthorised access,
    including password protection and secure storage.
  </p>

  <h4 className="font-semibold text-black">6. Sharing Your Information</h4>
  <ul>
    <li>We do not share your data outside the Church without your permission.</li>
    <li>We may share it only if required by law.</li>
  </ul>

  <h4 className="font-semibold text-black">7. How Long We Keep Your Information</h4>
  <p>
    We keep your information only for as long as necessary to serve you as a member or meet legal obligations.
  </p>

  <h4 className="font-semibold text-black">8. Your Rights</h4>
  <ul>
    <li>You can request access to your data.</li>
    <li>You can request corrections.</li>
    <li>You can request deletion.</li>
    <li>You can withdraw consent at any time.</li>
  </ul>

  <h4 className="font-semibold text-black">9. Children’s Privacy</h4>
  <p>
    For individuals under 18, we require consent from a parent or legal guardian.
  </p>

  <h4 className="font-semibold text-black">10. Complaints</h4>
  <p>
    If you are not satisfied with how your data is handled, you may contact us or file a complaint with the
    Nigeria Data Protection Commission.
  </p>

</div>

        <div className="shrink-0 border-t border-black/10 bg-neutral-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Membership Form ──────────────────────────────────────────────────────────
export default function MembershipForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [occupation, setOccupation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");

  return (
    <>
      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!consent) {
            setMsg("Please accept the consent statement to continue.");
            return;
          }

          setMsg(null);
          setLoading(true);

          try {
            await submitToWebApp({
              formType: "membership",
              fullName,
              address,
              phone,
              birthday,
              ageRange,
              occupation,
              maritalStatus,
              email,
              consentGiven: true,
              hp,
            });

            setMsg("Submitted. We'll reach out soon.");
            setFullName("");
            setAddress("");
            setPhone("");
            setBirthday("");
            setAgeRange("");
            setOccupation("");
            setMaritalStatus("");
            setEmail("");
            setConsent(false);
            setHp("");

            setTimeout(() => onDone(), 700);
          } catch (err: any) {
            setMsg(err?.message || "Something went wrong.");
          } finally {
            setLoading(false);
          }
        }}
        className="grid gap-5"
      >
        {/* Consent checkbox — first thing users fill */}
        <div className="rounded-xl border border-black/10 bg-neutral-50 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 accent-black"
              required
            />
            <span className="leading-relaxed text-sm text-black/70">
  I have read the{" "}
  <button
    type="button"
    onClick={() => setShowPrivacy(true)}
    className="font-semibold text-black underline transition-opacity hover:opacity-70"
  >
    Privacy Policy
  </button>{" "}
  and I agree to SaltCity Church collecting and using my personal information for
  membership records, pastoral care, and church communications as described.
  I provide this consent voluntarily and understand that I can withdraw my consent at any time.
</span>
          </label>
        </div>

        {/* Honeypot */}
        <div className="hidden">
          <label>
            Leave this empty:
            <input value={hp} onChange={(e) => setHp(e.target.value)} />
          </label>
        </div>

        {/* Row 1: Name + Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </Field>
          <Field label="Phone Number">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+234..."
            />
          </Field>
        </div>

        {/* Row 2: Birthday + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Birthday (Month/Day)">
            <Input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value.toUpperCase())}
              required
              placeholder="OCT/10"
              pattern="^[A-Z]{3}/[0-9]{2}$"
              title="Use format like OCT/10"
              maxLength={6}
            />
          </Field>
          <Field label="Email Address">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@email.com"
            />
          </Field>
        </div>

        {/* Row 3: Age Range + Occupation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Age Range">
            <Select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} required>
              <option value="" disabled>
                Select one
              </option>
              <option>20–25</option>
              <option>26–30</option>
              <option>31–35</option>
              <option>36–40</option>
              <option>41–45</option>
              <option>46–50</option>
              <option>50+</option>
            </Select>
          </Field>
          <Field label="Occupation">
            <Input
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
              placeholder="e.g. Teacher, Engineer..."
            />
          </Field>
        </div>

        {/* Row 4: Marital Status + Address */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Marital Status">
            <Select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select one
              </option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Separated</option>

            </Select>
          </Field>

          <Field label="Home Address">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Area / street, city"
            />
          </Field>
        </div>

        {msg && (
          <div
            className={cx(
              "text-sm font-semibold",
              msg.startsWith("Submitted") ? "text-green-700" : "text-red-600"
            )}
          >
            {msg}
          </div>
        )}

        <SubmitRow onDone={onDone} loading={loading} />
      </form>
    </>
  );
}