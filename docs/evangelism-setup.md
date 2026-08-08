# Evangelism Compliance — setup

The `/evangelism` page lets members log the guests they're bringing this
Sunday (multiple guests per submission). It posts to `/api/evangelism`, which
forwards to a dedicated Google Apps Script web app that writes to one
spreadsheet and builds a live **Tracking** tab + per-company **Dashboard**.

Coordinators confirm each guest's progress (1st visit → Foundation Class →
Fully Integrated) through a Google Form the script creates for you.

## Architecture

```
Member → /evangelism (website form)
            → POST /api/evangelism  (honeypot, time-trap, company + rate-limit checks)
                → Apps Script doPost  → "Invites" tab
Coordinator → "Progress Update" Google Form → "Progress Responses" tab
                → onFormSubmit trigger → rebuild()
                        → "Tracking" tab + "Dashboard" tab (+ "Unmatched")
```

Everyone enters data through a form; nobody edits the sheet, so tampering is a
non-issue. Give leaders **Viewer** access for the Dashboard only.

## One-time setup

### 1. Google side
1. Create a Google Sheet, e.g. **"Evangelism Tracker."**
2. **Extensions → Apps Script**, paste [`apps-script/evangelism.gs`](../apps-script/evangelism.gs), Save.
3. Set `API_KEY` in the script (must equal `EVANGELISM_API_KEY` below — or set both to `""` to skip the check).
4. Run **`setup`** once and authorize. It creates the coordinator form, links it, installs the trigger, and builds the tabs. The coordinator form link appears on the new **Setup** tab.
5. **Deploy → New deployment → Web app** · Execute as **Me** · Who has access **Anyone** → **Deploy**. Copy the **`/exec`** URL.
   - After editing the script later, **Deploy → Manage deployments → Edit → New version**.

### 2. Website env
Add to `.env.local` (local) and to **Vercel → Settings → Environment Variables** (production), then restart / redeploy:

```
EVANGELISM_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
EVANGELISM_API_KEY=evangelism-secret
```

### 3. Share
- Give the **/evangelism** link to members (it's public, protected by honeypot + time-trap + company validation + a light rate limit).
- Give the **coordinator form** link (Setup tab) to the foundation-class/integration coordinators.
- Give leaders **Viewer** access to the sheet (or publish only the Dashboard / a Looker Studio report).

## Tabs the script maintains
- **Invites** — raw log, one row per guest per submission (do not hand-edit).
- **Progress Responses** — coordinator form responses.
- **Tracking** — one consolidated row per guest (status, phone, coming-this-Sunday, dates).
- **Dashboard** — per company: Total Members, Guests Invited, Expected This Sunday, Foundation Class, Fully Integrated, + a TOTAL row.
- **Unmatched** — progress updates whose Company/Member/Guest didn't match an invite (fix the spelling and it resolves on the next submit).

## Notes
- "Total Members" counts members who have logged ≥1 guest (participating members). If you want it against the full company roster to show a compliance %, add a roster and extend `rebuild()`.
- Coordinator matching is by Company | Member | Guest (case-insensitive). Typos land in **Unmatched** rather than being lost.
