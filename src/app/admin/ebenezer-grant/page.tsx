import Link from "next/link";
import { FileText } from "lucide-react";
import Container from "@/components/ui/Container";
import { listApplications } from "@/lib/ebenezerGrant/supabaseServer";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}

export default async function EbenezerGrantAdminPage() {
  const applications = await listApplications();

  return (
    <main className="bg-white py-12">
      <Container>
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#92400E]">Admin</p>
            <h1 className="mt-2 text-4xl font-black">Ebenezer Grant Applications</h1>
          </div>
          <p className="text-sm font-semibold text-black/60">{applications.length} submitted</p>
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-black/10 md:block">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-black/55">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Applicant</th>
                <th className="px-5 py-4">Business</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-t border-black/10">
                  <td className="px-5 py-4 font-bold">{application.reference_number}</td>
                  <td className="px-5 py-4 text-black/65">{formatDate(application.submitted_at)}</td>
                  <td className="px-5 py-4">{application.owner_director_name}</td>
                  <td className="px-5 py-4">{application.business_name}</td>
                  <td className="px-5 py-4">{application.phone}</td>
                  <td className="px-5 py-4">{application.email}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#92400E]/10 px-3 py-1 text-xs font-bold text-[#92400E]">
                      {application.status.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/ebenezer-grant/${application.id}`}
                      className="font-bold text-black underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:hidden">
          {applications.map((application) => (
            <Link
              key={application.id}
              href={`/admin/ebenezer-grant/${application.id}`}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black">{application.reference_number}</p>
                  <p className="mt-1 text-sm text-black/60">{formatDate(application.submitted_at)}</p>
                </div>
                <FileText className="h-5 w-5 text-[#92400E]" />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p className="font-bold">{application.owner_director_name}</p>
                <p>{application.business_name}</p>
                <p className="text-black/65">{application.phone}</p>
                <p className="text-black/65">{application.email}</p>
              </div>
              <span className="mt-4 inline-flex rounded-full bg-[#92400E]/10 px-3 py-1 text-xs font-bold text-[#92400E]">
                {application.status.replaceAll("_", " ")}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
