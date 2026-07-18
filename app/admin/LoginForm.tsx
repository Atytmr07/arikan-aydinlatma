"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import { auth } from "../../lib/firebaseClient";
import { MagazaMark } from "../components/BrandMarks";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged in AdminGate swaps to the panel automatically.
    } catch {
      setError("E-posta veya şifre hatalı.");
      setPending(false);
    }
  };

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[#080808] px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <MagazaMark size={56} />
          <h1 className="mt-6 font-marcellus text-3xl text-[#F5F0EB]">
            Admin Paneli
          </h1>
          <p className="mt-2 font-jost text-xs uppercase tracking-[0.18em] text-[#888880]">
            Katalog Yönetimi
          </p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          key={error ?? "ok"}
          animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="mb-2 block font-jost text-[11px] uppercase tracking-[0.18em] text-[#888880]">
            E-posta
          </label>
          <div className="relative mb-4">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888880]"
            />
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/[0.1] bg-[#111111] py-3.5 pl-11 pr-4 font-jost text-sm text-[#F5F0EB] outline-none transition-colors duration-200 placeholder:text-[#555] focus:border-[#E11B22]"
              placeholder="admin@arikanaydinlatma.com"
            />
          </div>

          <label className="mb-2 block font-jost text-[11px] uppercase tracking-[0.18em] text-[#888880]">
            Şifre
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888880]"
            />
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/[0.1] bg-[#111111] py-3.5 pl-11 pr-4 font-jost text-sm text-[#F5F0EB] outline-none transition-colors duration-200 placeholder:text-[#555] focus:border-[#E11B22]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mt-3 font-jost text-xs text-[#E11B22]">{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-[#E11B22] px-6 py-3.5 font-jost text-xs uppercase tracking-[0.18em] text-[#E11B22] transition-colors duration-300 hover:bg-[#E11B22] hover:text-[#F5F0EB] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Giriş yapılıyor…
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </motion.form>
      </motion.div>
    </main>
  );
}
