import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getApplication } from "@/lib/ebenezerGrant/supabaseServer";
import AdminApplicationForm from "../AdminApplicationForm";
import DocumentButton from "../DocumentButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}

function Detail({ label, value }: { label: string; value: string | boolean | null }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <p className="text-xs font-bold uppercase text-black/45">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm font-semibold text-black">
        {typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided"}
      </p>
    </div>
  );
}

export default async function EbenezerGrantApplicationDetail({ params }: Props) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) notFound();

  return (
    <main className="bg-white py-12">
      <Container>
        <Link href="/admin/ebenezer-grant" className="text-sm font-bold text-black underline">
          Back to applications
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="rounded-2xl bg-black p-6 text-white">
              <p className="text-sm font-bold text-white/60">{application.reference_number}</p>
              <h1 className="mt-2 text-3xl font-black">{application.business_name}</h1>
              <p className="mt-2 text-white/75">
                Submitted by {application.owner_director_name} on{" "}
                {formatDate(application.submitted_at)}
              </p>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-black">Applicant Details</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Detail label="Owner/Director Name" value={application.owner_director_name} />
                <Detail label="Email" value={application.email} />
                <Detail label="Phone" value={application.phone} />
                <Detail
                  label="Membership Confirmed"
                  value={application.church_membership_confirmed}
                />
                <Detail
                  label="Group or Department"
                  value={application.church_group_or_department}
                />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-black">Business Details</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Detail label="Business Name" value={application.business_name} />
                <Detail
                  label="Registration Number"
                  value={application.business_registration_number}
                />
                <Detail label="Business Sector" value={application.business_sector} />
                <Detail label="Date Business Started" value={application.date_business_started} />
                <Detail label="Business Address" value={application.business_address} />
                <Detail label="Business Description" value={application.business_description} />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-black">Grant Request Information</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Detail
                  label="Current Monthly Revenue"
                  value={application.current_estimated_monthly_revenue}
                />
                <Detail
                  label="Projected Monthly Revenue"
                  value={application.projected_monthly_revenue_after_financing}
                />
                <Detail label="Intended Use of Funds" value={application.intended_use_of_funds} />
                <Detail
                  label="Revenue Growth Explanation"
                  value={application.revenue_growth_explanation}
                />
                <Detail label="Declaration Accepted" value={application.declaration_accepted} />
              </div>
            </section>

            <section className="mt-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-black">Uploaded Documents</h2>
                <a
                  href={`/api/admin/ebenezer-grant/applications/${application.id}/download-zip`}
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-black/90"
                >
                  Download all documents
                </a>
              </div>
              <div className="mt-4 grid gap-4">
                {application.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-col gap-4 rounded-xl border border-black/10 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-bold">{document.original_filename}</p>
                      <p className="mt-1 text-xs text-black/55">
                        {document.document_type.replaceAll("_", " ")}
                        {document.file_size
                          ? ` - ${(document.file_size / 1024 / 1024).toFixed(2)} MB`
                          : ""}
                      </p>
                    </div>
                    <DocumentButton documentId={document.id} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside>
            <AdminApplicationForm
              applicationId={application.id}
              initialStatus={application.status}
              initialNotes={application.internal_notes ?? ""}
            />
          </aside>
        </div>
      </Container>
    </main>
  );
}
