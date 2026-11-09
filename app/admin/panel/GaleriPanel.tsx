"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  listGallery,
  uploadGalleryImages,
  deleteGalleryItem,
  reorderGallery,
  setGalleryAlt,
} from "../../../lib/firebaseClient";
import type { GaleriItem } from "../../../lib/galeri";

type Feedback = { type: "ok" | "error"; text: string } | null;

const ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif";

export default function GaleriPanel() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setItems(await listGallery());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Galeri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleFiles = async (list: FileList | null | undefined) => {
    const files = Array.from(list ?? []).filter(
      (f) => f.type.startsWith("image/") || /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name)
    );
    if (!files.length) {
      setFeedback({ type: "error", text: "Lütfen görsel dosyası seçin (JPG, PNG, WEBP)." });
      return;
    }
    setBusy(true);
    setFeedback(null);
    setProgress({ done: 0, total: files.length });
    try {
      const { added, errors } = await uploadGalleryImages(files, (done, total) =>
        setProgress({ done, total })
      );
      if (errors.length) {
        setFeedback({
          type: "error",
          text: `${added} görsel eklendi, ${errors.length} görsel eklenemedi: ${errors[0]}`,
        });
      } else {
        setFeedback({
          type: "ok",
          text: `${added} görsel galerinin başına eklendi. Sitede ~1 dakika içinde görünür.`,
        });
      }
      await fetchList();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Yükleme başarısız.",
      });
    } finally {
      setBusy(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (item: GaleriItem) => {
    if (!confirm("Bu görsel galeriden kaldırılsın mı?")) return;
    setBusy(true);
    const prev = items;
    setItems((p) => p.filter((i) => i.id !== item.id));
    try {
      await deleteGalleryItem(item.id);
      setFeedback({ type: "ok", text: "Görsel kaldırıldı. Sitede ~1 dakika içinde güncellenir." });
    } catch (err) {
      setItems(prev);
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Silme işlemi başarısız.",
      });
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const to = index + dir;
    if (to < 0 || to >= items.length) return;
    const prev = items;
    const next = [...items];
    [next[index], next[to]] = [next[to], next[index]];
    setItems(next);
    setBusy(true);
    try {
      await reorderGallery(next.map((i) => i.id));
    } catch {
      setItems(prev);
      setFeedback({ type: "error", text: "Sıralama kaydedilemedi." });
    } finally {
      setBusy(false);
    }
  };

  const saveAlt = async (item: GaleriItem, value: string) => {
    if ((item.alt ?? "") === value.trim()) return;
    setItems((p) => p.map((i) => (i.id === item.id ? { ...i, alt: value.trim() } : i)));
    try {
      await setGalleryAlt(item.id, value);
      setFeedback({ type: "ok", text: "Açıklama kaydedildi." });
    } catch {
      setFeedback({ type: "error", text: "Açıklama kaydedilemedi." });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      {feedback && (
        <div className="mb-8 flex items-start gap-3 border border-[#E11B22]/50 px-4 py-3 font-jost text-sm text-[#E11B22]">
          {feedback.type === "ok" ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          )}
          {feedback.text}
        </div>
      )}

      {/* upload */}
      <section aria-label="Galeriye görsel ekle" className="mb-14">
        <h2 className="mb-5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
          Galeriye Görsel Ekle
        </h2>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (!busy && !loadError) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => !busy && !loadError && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-disabled={busy || !!loadError}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && !busy && !loadError && inputRef.current?.click()
          }
          className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed p-10 text-center transition-colors duration-200 ${
            busy || loadError ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          } ${
            dragging
              ? "border-[#E11B22] bg-[#E11B22]/5"
              : "border-[#E11B22]/40 bg-[#111111] hover:border-[#E11B22]/70"
          }`}
        >
          {progress ? (
            <>
              <Loader2 size={28} className="animate-spin text-[#E11B22]" />
              <p className="font-jost text-sm text-[#F5F0EB]">
                Yükleniyor… {Math.min(progress.done + 1, progress.total)} / {progress.total}
              </p>
            </>
          ) : (
            <>
              <ImagePlus size={28} className="text-[#E11B22]" />
              <p className="font-jost text-sm text-[#F5F0EB]">
                Görselleri buraya sürükleyin veya tıklayın
              </p>
              <p className="font-jost text-xs text-[#888880]">
                Birden fazla seçebilirsiniz · JPG, PNG, WEBP · telefondan çekilen
                fotoğraflar otomatik küçültülür
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </section>

      {/* list */}
      <section aria-label="Galerideki görseller">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#E11B22]">
            Galerideki Görseller {!loading && !loadError && `(${items.length})`}
          </h2>
          {busy && !progress && (
            <span className="inline-flex items-center gap-2 font-jost text-xs text-[#888880]">
              <Loader2 size={13} className="animate-spin" /> Kaydediliyor…
            </span>
          )}
        </div>
        <p className="mb-6 font-jost text-xs leading-relaxed text-[#888880]">
          Sitede bu sırayla görünür. Okları kullanarak sırayı değiştirebilirsiniz.
          Açıklama alanına görseli kısaca yazın (örn. &quot;Kristal salon avizesi&quot;);
          bu, Google görsel aramasında işe yarar.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-[#111111]" />
            ))}
          </div>
        ) : loadError ? (
          <div className="border border-dashed border-[#E11B22]/40 bg-[#111111] px-5 py-8 text-center">
            <p className="font-jost text-sm text-[#E11B22]">{loadError}</p>
            <p className="mt-2 font-jost text-xs text-[#888880]">
              Veri kaybını önlemek için liste okunamadığında değişiklik yapılamaz.
            </p>
            <button
              onClick={fetchList}
              className="mt-5 inline-flex items-center gap-2 border border-white/[0.12] px-4 py-2 font-jost text-[11px] uppercase tracking-[0.12em] text-[#F5F0EB] hover:border-[#E11B22] hover:text-[#E11B22]"
            >
              <RefreshCw size={13} /> Tekrar dene
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="border border-dashed border-white/[0.1] bg-[#111111] px-5 py-8 text-center font-jost text-sm text-[#888880]">
            Galeride görsel yok.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item, i) => (
              <li key={item.id} className="flex flex-col border border-white/[0.07] bg-[#111111]">
                <div className="relative aspect-square overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-2 top-2 bg-black/70 px-2 py-0.5 font-jost text-[10px] text-[#F5F0EB]">
                    {i + 1}
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={item.alt ?? ""}
                  placeholder="Açıklama (isteğe bağlı)"
                  onBlur={(e) => saveAlt(item, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                  className="border-t border-white/[0.07] bg-transparent px-2.5 py-2 font-jost text-xs text-[#F5F0EB] outline-none placeholder:text-[#555] focus:bg-black/40"
                />
                <div className="flex items-center justify-between border-t border-white/[0.07]">
                  <div className="flex">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={busy || i === 0}
                      aria-label="Öne al"
                      className="p-2.5 text-[#888880] transition-colors hover:text-[#F5F0EB] disabled:opacity-25"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={busy || i === items.length - 1}
                      aria-label="Geriye al"
                      className="p-2.5 text-[#888880] transition-colors hover:text-[#F5F0EB] disabled:opacity-25"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={busy}
                    aria-label="Kaldır"
                    className="inline-flex items-center gap-1.5 p-2.5 font-jost text-[10px] uppercase tracking-[0.12em] text-[#888880] transition-colors hover:text-[#E11B22] disabled:opacity-25"
                  >
                    <Trash2 size={14} /> Kaldır
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
