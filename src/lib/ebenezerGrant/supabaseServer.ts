import "server-only";
import {
  GrantApplication,
  GrantApplicationWithDocuments,
  GrantDocument,
  GrantStatus,
} from "./types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "";

type Json = Record<string, unknown>;

function requireSupabaseEnv() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !STORAGE_BUCKET) {
    throw new Error(
      "Missing Supabase configuration. Check NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_STORAGE_BUCKET."
    );
  }
}

function supabaseHeaders(extra?: HeadersInit) {
  requireSupabaseEnv();
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    ...extra,
  };
}

async function readJsonOrError<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message || data?.error_description || data?.error || response.statusText;
    const error = new Error(message) as Error & { code?: string; status?: number };
    error.code = data?.code;
    error.status = response.status;
    throw error;
  }

  return data as T;
}

async function restGet<T>(path: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: supabaseHeaders(),
    cache: "no-store",
  });

  return readJsonOrError<T>(response);
}

async function restInsert<T>(table: string, payload: Json | Json[]) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    method: "POST",
    headers: supabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return readJsonOrError<T[]>(response);
}

async function restPatch<T>(path: string, payload: Json) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "PATCH",
    headers: supabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return readJsonOrError<T[]>(response);
}

async function restDelete(path: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "DELETE",
    headers: supabaseHeaders(),
    cache: "no-store",
  });
}

function encodeFilter(value: string) {
  return encodeURIComponent(`eq.${value}`);
}

export function safeFileName(name: string) {
  const fallback = "document";
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return cleaned || fallback;
}

export async function businessRegistrationExists(registrationNumber: string) {
  const rows = await restGet<{ id: string }[]>(
    `grant_applications?select=id&business_registration_number=${encodeFilter(
      registrationNumber
    )}&limit=1`
  );

  return rows.length > 0;
}

async function countApplications() {
  requireSupabaseEnv();
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/grant_applications?select=id&limit=0`,
    {
      headers: supabaseHeaders({ Prefer: "count=exact" }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    await readJsonOrError(response);
  }

  const contentRange = response.headers.get("content-range") ?? "";
  const count = Number(contentRange.split("/").pop());
  return Number.isFinite(count) ? count : 0;
}

function referenceFromSequence(sequence: number) {
  return `EBZ-2026-${String(sequence).padStart(4, "0")}`;
}

export async function createApplicationWithReference(payload: Json) {
  const startingCount = await countApplications();

  for (let attempt = 1; attempt <= 20; attempt += 1) {
    const reference_number = referenceFromSequence(startingCount + attempt);

    try {
      const rows = await restInsert<GrantApplication>("grant_applications", {
        ...payload,
        reference_number,
      });

      return rows[0];
    } catch (error) {
      const code = (error as Error & { code?: string }).code;
      if (code !== "23505") {
        throw error;
      }
    }
  }

  throw new Error("Could not generate a unique reference number. Please try again.");
}

export async function deleteApplication(applicationId: string) {
  await restDelete(`grant_applications?id=${encodeFilter(applicationId)}`);
}

export async function insertDocuments(documents: Omit<GrantDocument, "id" | "uploaded_at">[]) {
  if (documents.length === 0) return [];
  return restInsert<GrantDocument>("grant_documents", documents as unknown as Json[]);
}

export async function uploadPrivateFile(path: string, file: File) {
  requireSupabaseEnv();
  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(STORAGE_BUCKET)}/${path
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    {
      method: "POST",
      headers: supabaseHeaders({
        "Content-Type": file.type || "application/octet-stream",
        "Cache-Control": "3600",
        upsert: "false",
      }),
      body: await file.arrayBuffer(),
      cache: "no-store",
    }
  );

  await readJsonOrError(response);
}

function normalizeStoragePath(storagePath: string) {
  const trimmedPath = storagePath.replace(/^\/+/, "");
  const bucketPrefix = `${STORAGE_BUCKET}/`;

  if (trimmedPath.startsWith(bucketPrefix)) {
    return trimmedPath.slice(bucketPrefix.length);
  }

  return trimmedPath;
}

function normalizeSignedStorageUrl(signedPath: string) {
  if (signedPath.startsWith("http")) {
    return signedPath;
  }

  if (signedPath.startsWith("/object/")) {
    return `${SUPABASE_URL}/storage/v1${signedPath}`;
  }

  throw new Error("Supabase returned an invalid signed document URL.");
}

export async function createSignedDocumentUrl(storagePath: string) {
  requireSupabaseEnv();
  const objectPath = normalizeStoragePath(storagePath);
  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/sign/${encodeURIComponent(STORAGE_BUCKET)}/${objectPath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    {
      method: "POST",
      headers: supabaseHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ expiresIn: 60 * 10 }),
      cache: "no-store",
    }
  );

  const data = await readJsonOrError<{ signedURL?: string; signedUrl?: string }>(response);
  const signedPath = data.signedURL ?? data.signedUrl;

  if (!signedPath) {
    throw new Error("Could not create a signed document URL.");
  }

  return normalizeSignedStorageUrl(signedPath);
}

export async function listApplications() {
  return restGet<GrantApplication[]>(
    "grant_applications?select=*&order=submitted_at.desc"
  );
}

export async function getApplication(id: string): Promise<GrantApplicationWithDocuments | null> {
  const applications = await restGet<GrantApplication[]>(
    `grant_applications?select=*&id=${encodeFilter(id)}&limit=1`
  );

  const application = applications[0];
  if (!application) return null;

  const documents = await restGet<GrantDocument[]>(
    `grant_documents?select=*&application_id=${encodeFilter(id)}&order=uploaded_at.asc`
  );

  return { ...application, documents };
}

export async function getDocument(documentId: string) {
  const rows = await restGet<GrantDocument[]>(
    `grant_documents?select=*&id=${encodeFilter(documentId)}&limit=1`
  );

  return rows[0] ?? null;
}

export async function updateApplicationAdminFields(
  id: string,
  status: GrantStatus,
  internal_notes: string
) {
  const rows = await restPatch<GrantApplication>(
    `grant_applications?id=${encodeFilter(id)}&select=*`,
    {
      status,
      internal_notes,
      updated_at: new Date().toISOString(),
    }
  );

  return rows[0] ?? null;
}
