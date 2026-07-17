"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Eye,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { logout } from "../actions";
import { MagazaMark } from "../../components/BrandMarks";

// In production the browser uploads directly to Firebase Storage via a signed
// URL, avoiding the serverless request-body size limit. Locally this is
// unset → filesystem upload through /api/admin/upload.
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === "1";

interface KatalogRow {
  id: string;
  name: string;
  filename: string;
  url: string;
  uploadedAt: string;
  active: boolean;
}

type Feedback = { type: "ok" | "error"; text: string } | null;

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function PanelClient() {
  const [items, setItems] = useState<KatalogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchList = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/kataloglar", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data.kataloglar ?? []);
    } catch {
      setFeedback({ type: "error", text: "Katalog listesi yüklenemedi." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const pickFile = (f: File | undefined) => {
    if (!f) return;
    const isPdf =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setFeedback({ type: "error", text: "Yalnızca PDF dosyaları kabul edilir." });
      return;
    }
    setFile(f);
    setFeedback(null);
    if (!name) setName(f.name.replace(/\.pdf$/i, ""));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setFeedback({ type: "error", text: "Lütfen bir PDF seçin." });
      return;
    }
    if (!name.trim()) {
      setFeedback({ type: "error", text: "Lütfen katalog adı girin." });
      return;
    }
    setUploading(true);
    setFeedback(null);
    try {
      if (USE_FIREBASE) {
        // 1) Get a short-lived signed upload URL from the server.
        const urlRes = await fetch("/api/admin/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim() }),
        });
        const urlData = await urlRes.json();
        if (!urlRes.ok) {
          throw new Error(urlData.error ?? "Yükleme başarısız.");
        }
        // 2) PUT the PDF straight to Firebase Storage (no serverless size limit).
        const putRes = await fetch(urlData.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/pdf" },
          body: file,
        });
        if (!putRes.ok) throw new Error("Dosya yüklenemedi.");
        // 3) Register the metadata.
        const res = await fetch("/api/admin/kataloglar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            objectPath: urlData.objectPath,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Yükleme başarısız.");
      } else {
        // Filesystem mode (local dev): send through the server route.
        const fd = new FormData();
        fd.append("file", file);
        fd.append("name", name.trim());
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Yükleme başarısız.");
      }
      setFeedback({ type: "ok", text: "Katalog başarıyla yüklendi." });
      setFile(null);
      setName("");
      if (inputRef.current) inputRef.current.value = "";
      await fetchList();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Yükleme başarısız.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu katalog kalıcı olarak silinsin mi?")) return;
    try {
      const res = await fetch("/api/admin/kataloglar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((i) => i.id !== id));
      setFeedback({ type: "ok", text: "Katalog kaldırıldı." });
    } catch {
      setFeedback({ type: "error", text: "Silme işlemi başarısız." });
    }
  };

  const handleToggle = async (id: string, active: boolean) => {
    // optimistic
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, active } : i))
    );
    try {
      const res = await fetch("/api/admin/kataloglar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // revert
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, active: !active } : i))
      );
      setFeedback({ type: "error", text: "Durum güncellenemedi." });
    }
  };

  return (
    <main className="min-h-[100svh] bg-[#080808] text-[#F5F0EB]">
      {/* header */}
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <MagazaMark size={34} />
            <div>
              <h1 className="font-marcellus text-xl text-[#F5F0EB]">
                Katalog Yönetimi
              </h1>
              <p className="font-jost text-[10px] uppercase tracking-[0.18em] text-[#888880]">
                Arıkan Aydınlatma · Admin
              </p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 border border-white/[0.12] px-4 py-2.5 font-jost text-[11px] uppercase tracking-[0.15em] text-[#888880] transition-colors duration-300 hover:border-[#E11B22] hover:text-[#E11B22]"
            >
              <LogOut size={14} /> Çıkış Yap
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        {/* feedback */}
        {feedback && (
          <div
            className={`mb-8 flex items-center gap-3 border px-4 py-3 font-jost text-sm ${
              feedback.type === "ok"
                ? "border-[#E11B22]/40 text-[#E11B22]"
                : "border-[#E11B22]/50 text-[#E11B22]"
            }`}
          >
            {feedback.type === "ok" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {feedback.text}
          </div>
        )}

        {/* upload section */}
        <section aria-label="Yeni katalog yükle" className="mb-14">
          <h2 className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Yeni Katalog Yükle
          </h2>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
            }
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-10 text-center transition-colors duration-200 ${
              dragging
                ? "border-[#E11B22] bg-[#E11B22]/5"
                : "border-[#E11B22]/40 bg-[#111111] hover:border-[#E11B22]/70"
            }`}
          >
            <Upload size={28} className="text-[#E11B22]" />
            <p className="font-jost text-sm text-[#F5F0EB]">
              {file ? file.name : "PDF'i buraya sürükleyin veya tıklayın"}
            </p>
            <p className="font-jost text-xs text-[#888880]">
              Büyük dosyalar desteklenir · yalnızca .pdf
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Katalog adı (örn. 2025 İlkbahar Koleksiyonu)"
              className="flex-1 border border-white/[0.1] bg-[#111111] px-4 py-3 font-jost text-sm text-[#F5F0EB] outline-none transition-colors placeholder:text-[#555] focus:border-[#E11B22]"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 border border-[#E11B22] px-8 py-3 font-jost text-xs uppercase tracking-[0.18em] text-[#E11B22] transition-colors duration-300 hover:bg-[#E11B22] hover:text-[#F5F0EB] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Yükleniyor…
                </>
              ) : (
                "Yükle"
              )}
            </button>
          </div>
        </section>

        {/* active catalogs list */}
        <section aria-label="Mevcut kataloglar">
          <h2 className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Mevcut Kataloglar
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-[72px] animate-pulse border border-white/[0.07] bg-[#111111]"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="border border-dashed border-white/[0.1] bg-[#111111] px-5 py-8 text-center font-jost text-sm text-[#888880]">
              Henüz katalog yüklenmedi.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 border border-white/[0.07] bg-[#111111] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <FileText size={26} className="shrink-0 text-[#E11B22]" />
                    <div>
                      <p className="font-jost text-sm font-medium text-[#F5F0EB]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-jost text-xs text-[#888880]">
                        {formatDate(item.uploadedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* active toggle */}
                    <label className="flex cursor-pointer items-center gap-2 font-jost text-[11px] uppercase tracking-[0.12em] text-[#888880]">
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={(e) => handleToggle(item.id, e.target.checked)}
                        className="h-4 w-4 accent-[#E11B22]"
                      />
                      {item.active ? "Yayında" : "Gizli"}
                    </label>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-white/[0.12] px-3 py-2 font-jost text-[11px] uppercase tracking-[0.12em] text-[#F5F0EB] transition-colors hover:border-[#E11B22] hover:text-[#E11B22]"
                    >
                      <Eye size={13} /> Görüntüle
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1.5 border border-white/[0.12] px-3 py-2 font-jost text-[11px] uppercase tracking-[0.12em] text-[#888880] transition-colors hover:border-[#E11B22] hover:text-[#E11B22]"
                    >
                      <Trash2 size={13} /> Kaldır
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
