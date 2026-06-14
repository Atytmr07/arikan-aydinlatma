import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  // Already authenticated → skip the login screen.
  const isAuthed = cookies().get("admin_session")?.value === "true";
  if (isAuthed) redirect("/admin/panel");

  return <LoginForm />;
}
