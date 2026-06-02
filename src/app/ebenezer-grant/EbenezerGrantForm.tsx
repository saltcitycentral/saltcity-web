"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Props = {
  closed: boolean;
};

const inputClass =
  "w-full rounded-lg border border-black/12 bg-white px-4 py-3.5 text-[15px] text-[#240F0D] outline-none transition placeholder:text-black/35 focus:border-[#6F1D1B] focus:ring-2 focus:ring-[#6F1D1B]/10";
const labelClass = "mb-2 block text-sm font-bold text-[#240F0D]";

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function FileField({
  label,
  name,
  required = true,
  multiple = false,
}: {
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        required={required}
        multiple={multiple}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-[#6F1D1B] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`}
      />
    </div>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="text-sm font-bold text-[#9C7A49]">{number}</span>
        <h3 className="text-xl font-black text-[#240F0D]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export default function EbenezerGrantForm({ closed }: Props) {
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ referenceNumber: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setValidationErrors([]);
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/ebenezer-grant/apply", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        const errors = Array.isArray(data?.errors)
          ? data.errors.filter((item: unknown): item is string => typeof item === "string")
          : [];

        setError(
          data?.message ||
            data?.error ||
            "We could not submit your application. Please check the form and try again."
        );
        setValidationErrors(errors);
        return;
      }

      setReceipt({ referenceNumber: data.referenceNumber });
      event.currentTarget.reset();
      window.location.hash = "application-form";
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (closed) {
    return (
      <div className="rounded-xl border border-black/10 bg-white p-8 text-center">
        <h3 className="text-2xl font-black text-[#240F0D]">Applications are closed</h3>
        <p className="mt-3 text-black/65">
          Applications for the Ebenezer Grant are now closed. Thank you for your interest.
        </p>
      </div>
    );
  }

  if (receipt) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />
        <h3 className="mt-4 text-2xl font-black text-[#240F0D]">
          Your Ebenezer Grant application has been received.
        </h3>
        <p className="mt-4 text-lg font-bold text-emerald-800">
          Reference Number: {receipt.referenceNumber}
        </p>
        <p className="mt-2 text-black/65">
          Please keep this reference number for future communication.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-9 rounded-xl border border-black/10 bg-white p-5 md:p-8"
    >
      <FormSection number="01" title="Applicant Information">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Owner/Director Full Name" name="owner_director_name" />
          <Field label="Email Address" name="email" type="email" />
          <Field label="Phone Number" name="phone" type="tel" />
          <Field
            label="Church Group or Department"
            name="church_group_or_department"
            required={false}
          />
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm font-semibold leading-relaxed text-[#240F0D]">
          <input name="church_membership_confirmed" type="checkbox" required className="mt-1" />
          I confirm that the owner/director is an active member of SaltCity Church.
        </label>
      </FormSection>

      <FormSection number="02" title="Enterprise Information">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Business Name" name="business_name" />
          <Field
            label="Business Registration/Incorporation Number"
            name="business_registration_number"
          />
          <Field label="Business Sector" name="business_sector" />
          <Field label="Date Business Started" name="date_business_started" type="date" />
        </div>
        <div className="mt-5 grid gap-5">
          <TextArea label="Business Address" name="business_address" rows={3} />
          <TextArea label="Brief Business Description" name="business_description" />
        </div>
      </FormSection>

      <FormSection number="03" title="Financing & Revenue Growth">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Current Estimated Monthly Revenue"
            name="current_estimated_monthly_revenue"
            placeholder="Example: NGN 500,000"
          />
          <Field
            label="Projected Monthly Revenue After Financing"
            name="projected_monthly_revenue_after_financing"
            placeholder="Example: NGN 900,000"
          />
        </div>
        <div className="mt-5 grid gap-5">
          <TextArea label="Intended Use of Funds" name="intended_use_of_funds" />
          <TextArea
            label="Explain how the financing will increase revenue"
            name="revenue_growth_explanation"
          />
        </div>
      </FormSection>

      <FormSection number="04" title="Required Documents">
        <p className="mb-5 text-sm text-black/62">
          Accepted formats: PDF, JPG, JPEG, PNG, DOC, DOCX. Maximum 10MB per file.
        </p>
        <div className="grid gap-5">
          <FileField label="Incorporation Documents" name="incorporation_document" />
          <FileField
            label="Financial Report or Business Account Statement"
            name="financial_report"
          />
          <FileField label="Revenue Projection" name="revenue_projection" />
          <FileField
            label="Optional Supporting Evidence"
            name="optional_supporting_document"
            required={false}
            multiple
          />
        </div>
      </FormSection>

      <FormSection number="05" title="Declaration">
        <label className="flex items-start gap-3 rounded-lg border border-black/10 bg-[#FAFAFA] p-5 text-sm font-semibold leading-relaxed text-[#240F0D]">
          <input name="declaration_accepted" type="checkbox" required className="mt-1" />
          I confirm that the information provided is true, and I agree that if selected, I will
          submit monthly financial reports and attend the required review and training sessions for
          one year.
        </label>
      </FormSection>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-bold">{error}</p>
          {validationErrors.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {validationErrors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6F1D1B] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#531412] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
