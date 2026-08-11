/***********************************************************************
 * SaltCity — Evangelism Compliance backend (Google Apps Script)
 *
 * How it fits together:
 *   - The website form at /evangelism POSTs invites here (doPost) — one
 *     submission can contain many guests.
 *   - A coordinator Google Form (built by setup()) feeds progress updates.
 *   - rebuild() consolidates both into a "Tracking" tab and a per-company
 *     "Dashboard" tab. Unmatched progress rows go to "Unmatched".
 *
 * SETUP (once):
 *   1. Create a Google Sheet, e.g. "Evangelism Tracker".
 *   2. Extensions -> Apps Script. Paste this file. Save.
 *   3. Set API_KEY below (must equal EVANGELISM_API_KEY in the website env),
 *      or leave both blank to skip the check.
 *   4. Run setup() once and authorize. It builds the coordinator form + tabs.
 *   5. Deploy -> New deployment -> Web app -> Execute as: Me,
 *      Who has access: Anyone -> Deploy. Copy the /exec URL into
 *      EVANGELISM_WEBAPP_URL (website .env.local and Vercel).
 *   After editing this script later, redeploy a NEW version.
 ***********************************************************************/

const API_KEY = "evangelism-secret"; // must match EVANGELISM_API_KEY (or "" both sides)

// Leave SHEET_ID blank if you opened this script from the sheet itself
// (Extensions -> Apps Script — recommended). If this is a STANDALONE script,
// paste the sheet's ID here: the part of its URL between /d/ and /edit.
const SHEET_ID = "";
function getSS_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

const INVITES_SHEET   = "Invites";            // written by the website (doPost)
const PROGRESS_SHEET  = "Progress Responses"; // written by the coordinator form
const TRACKING_SHEET  = "Tracking";
const DASHBOARD_SHEET  = "Dashboard";
const UNMATCHED_SHEET = "Unmatched";

const STAGE_ORDER = { "Invited": 1, "1st Visit": 2, "Foundation Class": 3, "Fully Integrated": 4 };
const STAGE_FROM_LABEL = {
  "Attended 1st service": "1st Visit",
  "Completed Foundation Class": "Foundation Class",
  "Fully Integrated": "Fully Integrated",
};

const COMPANIES = [
  "AGBARHO","AIRPORT ROAD/MOSHESHE","AJAMIMOGHA","ALEGBOR","BENDEL ESTATE-1","BENDEL ESTATE-2",
  "EBRUMEDE-OSUBI","EDJEBA 1","EDJEBA 2","EFFURUN ROUNDABOUT","EKPAN MAIN TOWN","ENHEREN 1",
  "ENHERHEN 2","GARAGE 1","GIWAMU","JAKPA 1","JAKPA-2","JAKPA 3","JAKPA 4","JAKPA 5","KOSINI 1",
  "KOSINI 2","LONDON OPI","NIGERCAT","NNPC-2","OKERE-UGBORIKKO-POKOKO-1","OKERE-UGBORIKKO-POKOKO-2",
  "OKERE-URHOBO-1","OKERE-URHOBO-2","OKERE-URHOBO-3","OKOLOBA","OKUMAGBA AVENUE - CINEMA 1",
  "OKUMAGBA AVENUE - CINEMA 2","OKUMAGBA AVENUE - CINEMA 3","OTOKUTU/OPETE","PTI","UBANGWE","UDU",
  "UGBOMRO","UGBOROKE","UGHELLI",
];

/* ------------------------------------------------------------ web app */
function doPost(e) {
  try {
    if (API_KEY && (!e || !e.parameter || e.parameter.key !== API_KEY)) {
      return json_({ ok: false, error: "Unauthorized" });
    }
    const d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // honeypot

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = getOrCreate_(ss, INVITES_SHEET,
      ["Timestamp", "Service Date", "Member Name", "Company", "Guest Name", "Guest Phone", "Coming This Sunday"]);

    const now = new Date();
    (d.guests || []).forEach(function (g) {
      if (!g || !g.name) return;
      sh.appendRow([now, d.serviceDate || "", d.memberName || "", d.company || "",
        g.name || "", g.phone || "", g.coming || ""]);
    });

    rebuild();
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* --------------------------------------------------------- consolidate */
function rebuild() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const key = function (c, m, g) {
    return [c, m, g].map(function (s) { return String(s || "").trim().toLowerCase(); }).join(" | ");
  };

  const invites = readRows_(ss, INVITES_SHEET);
  let latestService = "";
  invites.forEach(function (r) {
    const sd = fmtDate_(r["Service Date"]);
    if (sd > latestService) latestService = sd;
  });

  const records = {};
  invites.forEach(function (r) {
    const m = r["Member Name"], g = r["Guest Name"], c = r["Company"];
    if (!m || !g) return;
    const k = key(c, m, g);
    const ts = r["Timestamp"];
    if (!records[k]) {
      records[k] = { member: m, company: c, guest: g, phone: r["Guest Phone"] || "",
        stage: "Invited", firstVisit: "", coming: "", comingDate: "", updated: ts || "" };
    }
    const rec = records[k];
    if (r["Guest Phone"] && !rec.phone) rec.phone = r["Guest Phone"];
    const sd = fmtDate_(r["Service Date"]);
    if (sd && sd >= (rec.comingDate || "")) { rec.comingDate = sd; rec.coming = r["Coming This Sunday"] || ""; }
    if (ts && (!rec.updated || ts > rec.updated)) rec.updated = ts;
  });

  const unmatched = [];
  readRows_(ss, PROGRESS_SHEET).forEach(function (r) {
    const m = r["Member Name"], g = r["Guest Name"], c = r["Company"];
    const stage = STAGE_FROM_LABEL[r["Stage reached"]] || r["Stage reached"];
    const rec = records[key(c, m, g)];
    if (!rec) { unmatched.push([r["Timestamp"], c, m, g, r["Stage reached"], r["Date"] || ""]); return; }
    if ((STAGE_ORDER[stage] || 0) >= (STAGE_ORDER[rec.stage] || 0)) rec.stage = stage;
    if (stage === "1st Visit" && r["Date"] && !rec.firstVisit) rec.firstVisit = r["Date"];
    if (r["Timestamp"] && (!rec.updated || r["Timestamp"] > rec.updated)) rec.updated = r["Timestamp"];
  });

  const recs = Object.keys(records).map(function (k) { return records[k]; });

  writeSheet_(ss, TRACKING_SHEET,
    ["Member Name", "Company", "Guest Name", "Guest Phone", "Coming This Sunday",
      "1st Visit Date", "Foundation Class", "Compliance Status", "Last Updated"],
    recs.map(function (x) {
      return [x.member, x.company, x.guest, x.phone, x.coming, x.firstVisit,
        (STAGE_ORDER[x.stage] || 0) >= 3 ? "Yes" : "No", x.stage, x.updated];
    }));

  const byCo = {};
  recs.forEach(function (x) {
    const c = String(x.company || "—").trim() || "—";
    if (!byCo[c]) byCo[c] = { members: {}, guests: 0, expected: 0, fc: 0, fi: 0 };
    byCo[c].members[String(x.member).trim().toLowerCase()] = true;
    byCo[c].guests++;
    if (String(x.coming).toLowerCase() === "yes" && x.comingDate === latestService) byCo[c].expected++;
    if ((STAGE_ORDER[x.stage] || 0) >= 3) byCo[c].fc++;
    if ((STAGE_ORDER[x.stage] || 0) >= 4) byCo[c].fi++;
  });
  const rows = Object.keys(byCo).sort().map(function (c) {
    return [c, Object.keys(byCo[c].members).length, byCo[c].guests, byCo[c].expected, byCo[c].fc, byCo[c].fi];
  });
  if (rows.length) {
    rows.push(rows.reduce(function (a, r) {
      return ["TOTAL", a[1] + r[1], a[2] + r[2], a[3] + r[3], a[4] + r[4], a[5] + r[5]];
    }, ["TOTAL", 0, 0, 0, 0, 0]));
  }
  writeSheet_(ss, DASHBOARD_SHEET,
    ["Company Name", "Total Members", "Guests Invited", "Expected This Sunday", "Foundation Class", "Fully Integrated"],
    rows);

  writeSheet_(ss, UNMATCHED_SHEET,
    ["Timestamp", "Company", "Member Name", "Guest Name", "Stage reached", "Date"], unmatched);
}

/* --------------------------------------------------------------- setup */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();
  if (props.getProperty("SETUP_DONE")) { Logger.log("Already set up."); return; }

  getOrCreate_(ss, INVITES_SHEET,
    ["Timestamp", "Service Date", "Member Name", "Company", "Guest Name", "Guest Phone", "Coming This Sunday"]);

  const before = ss.getSheets().map(function (s) { return s.getName(); });
  const form = FormApp.create("Evangelism — Progress Update (Coordinator)");
  form.setDescription("Coordinator only — confirm a guest's progress.");
  form.addListItem().setTitle("Company").setChoiceValues(COMPANIES).setRequired(true);
  form.addTextItem().setTitle("Member Name").setRequired(true);
  form.addTextItem().setTitle("Guest Name").setRequired(true);
  form.addListItem().setTitle("Stage reached")
    .setChoiceValues(["Attended 1st service", "Completed Foundation Class", "Fully Integrated"]).setRequired(true);
  form.addDateItem().setTitle("Date");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  const added = ss.getSheets().find(function (s) { return before.indexOf(s.getName()) === -1; });
  if (added) added.setName(PROGRESS_SHEET);

  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "rebuild") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("rebuild").forSpreadsheet(ss).onFormSubmit().create();

  rebuild();

  const s = getOrCreate_(ss, "Setup", ["What", "Link"]);
  s.getRange(2, 1, 2, 2).setValues([
    ["Coordinator — Progress Update form", form.getPublishedUrl()],
    ["Edit progress form", form.getEditUrl()],
  ]);

  props.setProperty("SETUP_DONE", "1");
  Logger.log("Setup done. Coordinator form link on the 'Setup' tab. Now Deploy as a Web app.");
}

/* ------------------------------------------------------------- helpers */
function getOrCreate_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  }
  return sh;
}

function readRows_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  const data = sh.getDataRange().getValues();
  const headers = data[0].map(function (h) { return String(h).trim(); });
  return data.slice(1).filter(function (r) {
    return r.some(function (c) { return c !== ""; });
  }).map(function (r) {
    const o = {};
    headers.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
}

function writeSheet_(ss, name, headers, rows) {
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clearContents();
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  if (rows.length) sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function fmtDate_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  return String(v || "").trim();
}
