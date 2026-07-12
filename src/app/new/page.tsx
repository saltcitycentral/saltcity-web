import { redirect } from "next/navigation";

// Short link / QR target — points to the homepage First Time form.
export default function NewRedirect() {
  redirect("/new-here");
}
