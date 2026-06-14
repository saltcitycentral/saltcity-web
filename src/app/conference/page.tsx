import { redirect } from "next/navigation";

// The printed flyer directs people to saltcitycentral.org/conference.
// Keep that URL alive by pointing it at the Spirit of Faith event page.
export default function ConferenceRedirect() {
  redirect("/events/spirit-of-faith");
}
