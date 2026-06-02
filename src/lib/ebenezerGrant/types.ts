export const GRANT_STATUSES = [
  "submitted",
  "under_review",
  "shortlisted",
  "rejected",
  "approved",
  "awarded",
] as const;

export type GrantStatus = (typeof GRANT_STATUSES)[number];

export type GrantApplication = {
  id: string;
  reference_number: string;
  owner_director_name: string;
  email: string;
  phone: string;
  church_membership_confirmed: boolean;
  church_group_or_department: string | null;
  business_name: string;
  business_registration_number: string;
  business_address: string;
  business_sector: string;
  date_business_started: string;
  business_description: string;
  current_estimated_monthly_revenue: string;
  projected_monthly_revenue_after_financing: string;
  intended_use_of_funds: string;
  revenue_growth_explanation: string;
  declaration_accepted: boolean;
  status: GrantStatus;
  internal_notes: string | null;
  submitted_at: string;
  updated_at: string;
};

export type GrantDocument = {
  id: string;
  application_id: string;
  document_type: string;
  original_filename: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  uploaded_at: string;
};

export type GrantApplicationWithDocuments = GrantApplication & {
  documents: GrantDocument[];
};
