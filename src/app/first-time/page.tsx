import { redirect } from "next/navigation";

// Retired: the First Time / new-guest form now lives on the homepage,
// reachable at /new-here. Keep this path alive for any old links.
export default function FirstTimeRedirect() {
  redirect("/new-here");
}
