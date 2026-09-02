/***********************************************************************
 * SaltCity — Weekday Classes registrations (Google Apps Script)
 *
 * Receives registrations from the website and files each class in its
 * own tab of one spreadsheet:
 *   /learn-to-pray     -> "Learn How To Pray"
 *   /read-your-bible   -> "How To Read Your Bible"
 *
 * SETUP (once):
 *   1. Create a Google Sheet, e.g. "Weekday Classes".
 *   2. Extensions -> Apps Script. Paste this file. Save.
 *   3. Set API_KEY below (must equal CLASSES_API_KEY in the website env),
 *      or set both to "" to skip the check.
 *   4. Deploy -> New deployment -> Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *      Deploy, authorize, then copy the /exec URL into CLASSES_WEBAPP_URL
 *      (website .env.local AND Vercel env).
 *
 *   After editing this script later, deploy a NEW VERSION:
 *   Deploy -> Manage deployments -> Edit -> Version: New version -> Deploy.
 *   (The /exec URL stays the same.)
 ***********************************************************************/

const API_KEY = "classes-secret"; // must match CLASSES_API_KEY

// Leave blank if you opened this script from the sheet itself
// (Extensions -> Apps Script — recommended). If this is a STANDALONE
// script, paste the sheet ID here: the part of its URL between /d/ and /edit.
const SHEET_ID = "";

const TABS = {
  "learn-to-pray": "Learn How To Pray",
  "read-your-bible": "How To Read Your Bible",
};

const HEADERS = ["Timestamp", "Full Name", "Phone Number", "Email"];

function getSS_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function doPost(e) {
  try {
    if (API_KEY && (!e || !e.parameter || e.parameter.key !== API_KEY)) {
      return json_({ ok: false, error: "Unauthorized" });
    }

    const d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // honeypot

    const tabName = TABS[d.classKey];
    if (!tabName) return json_({ ok: false, error: "Unknown class: " + d.classKey });

    if (!d.fullName || !d.phone) {
      return json_({ ok: false, error: "Full name and phone are required" });
    }

    const sheet = getOrCreate_(getSS_(), tabName, HEADERS);
    sheet.appendRow([new Date(), d.fullName || "", d.phone || "", d.email || ""]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Lets you confirm the deployment is live by visiting the /exec URL. */
function doGet() {
  return json_({ ok: true, service: "SaltCity weekday classes" });
}

function getOrCreate_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(
    ContentService.MimeType.JSON
  );
}
