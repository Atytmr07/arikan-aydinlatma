"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { auth } from "../../lib/firebaseClient";
import LoginForm from "./LoginForm";
import PanelClient from "./panel/PanelClient";

// Client-side auth gate. Firebase Auth is the source of truth; there is no
// server session cookie. Write access is additionally enforced by Storage
// Security Rules, so this gate is purely for UX.
export default function AdminGate() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-[#080808]">
        <Loader2 size={22} className="animate-spin text-[#E11B22]" />
      </main>
    );
  }

  return user ? <PanelClient /> : <LoginForm />;
}
