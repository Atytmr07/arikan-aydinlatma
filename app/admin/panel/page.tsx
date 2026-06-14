import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PanelClient from "./PanelClient";

export default function PanelPage() {
  // Defense in depth — middleware already guards this route.
  const isAuthed = cookies().get("admin_session")?.value === "true";
  if (!isAuthed) redirect("/admin");

  return <PanelClient />;
}
