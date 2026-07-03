import "server-only";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { GrantApplication } from "./types";
import { slugify } from "./supabaseServer";

const DECLARATION_TEXT =
  "I confirm that the information provided is true, and I agree that if selected, I will submit monthly financial reports and attend the required review and training sessions for one year.";

function display(value: string | boolean | null) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value?.trim() || "Not provided";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}

function sectionHeading(text: string) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160 },
  });
}

function tableCell(text: string, bold = false) {
  return new TableCell({
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold, size: 21 })],
      }),
    ],
  });
}

function detailTable(rows: [string, string | boolean | null][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(
      ([label, value]) =>
        new TableRow({
          children: [tableCell(label, true), tableCell(display(value))],
        })
    ),
  });
}

export function applicationSummaryFileName(application: GrantApplication) {
  return `${application.reference_number}-${slugify(
    application.owner_director_name,
    "applicant"
  )}-${slugify(application.business_name, "business")}-application-summary.docx`;
}

export async function generateApplicationSummaryDocx(application: GrantApplication) {
  const doc = new Document({
    creator: "SaltCity Church",
    title: "Ebenezer Grant Application Summary",
    description: `Application summary for ${application.reference_number}`,
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Ebenezer Grant Application Summary",
                bold: true,
                size: 34,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 320 },
            children: [
              new TextRun({
                text: "SaltCity Church",
                color: "666666",
                size: 22,
              }),
            ],
          }),

          sectionHeading("1. Application Reference"),
          detailTable([
            ["Reference Number", application.reference_number],
            ["Submitted Date", formatDate(application.submitted_at)],
            ["Status", application.status.replaceAll("_", " ")],
          ]),

          sectionHeading("2. Applicant Information"),
          detailTable([
            ["Owner/Director Full Name", application.owner_director_name],
            ["Email Address", application.email],
            ["Phone Number", application.phone],
            ["Church Group or Department", application.church_group_or_department],
            ["SaltCity Membership Confirmed", application.church_membership_confirmed],
          ]),

          sectionHeading("3. Enterprise Information"),
          detailTable([
            ["Business Name", application.business_name],
            [
              "Business Registration/Incorporation Number",
              application.business_registration_number,
            ],
            ["Business Sector", application.business_sector],
            ["Date Business Started", application.date_business_started],
            ["Business Address", application.business_address],
            ["Brief Business Description", application.business_description],
          ]),

          sectionHeading("4. Financing & Revenue Growth"),
          detailTable([
            ["Current Estimated Monthly Revenue", application.current_estimated_monthly_revenue],
            [
              "Projected Monthly Revenue After Financing",
              application.projected_monthly_revenue_after_financing,
            ],
            ["Intended Use of Funds", application.intended_use_of_funds],
            [
              "Explanation of How Financing Will Increase Revenue",
              application.revenue_growth_explanation,
            ],
          ]),

          sectionHeading("5. Declaration"),
          detailTable([
            ["Declaration Accepted", application.declaration_accepted],
            ["Declaration Text", DECLARATION_TEXT],
          ]),

          sectionHeading("6. Internal Review"),
          detailTable([
            ["Current Status", application.status.replaceAll("_", " ")],
            ["Internal Notes", application.internal_notes],
          ]),
        ],
      },
    ],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}
