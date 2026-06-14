"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import { login, type LoginState } from "./actions";
import { MagazaMark } from "../components/BrandMarks";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 border border-[#E11B22] px-6 py-3.5 font-jost text-xs uppercase tracking-[0.18em] text-[#E11B22] transition-colors duration-300 hover:bg-[#E11B22] hover:text-[#F5F0EB] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Giriş yapılıyor…
        </>
      ) : (
        "Giriş Yap"
      )}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

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

        <form action={formAction}>
          <motion.div
            key={state.error ?? "ok"}
            animate={
              state.error
                ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="password"
              className="mb-2 block font-jost text-[11px] uppercase tracking-[0.18em] text-[#888880]"
            >
              Şifre
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888880]"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full border border-white/[0.1] bg-[#111111] py-3.5 pl-11 pr-4 font-jost text-sm text-[#F5F0EB] outline-none transition-colors duration-200 placeholder:text-[#555] focus:border-[#E11B22]"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          {state.error && (
            <p className="mt-3 font-jost text-xs text-[#E11B22]">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </motion.div>
    </main>
  );
}
