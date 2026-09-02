import { redirect } from "next/navigation";

// A Father's Blessing ran on Tue 18 Aug 2026. Registration is closed, so this
// path now sends old/shared links to the homepage rather than showing a form
// for a finished event.
//
// To bring the event back: restore this file and FathersBlessingClient.tsx
// from git history — the /api/fathers-blessing route is still wired up.
export default function FathersBlessingRedirect() {
  redirect("/");
}
