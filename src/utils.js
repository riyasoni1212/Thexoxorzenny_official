// ─── UTILS ────────────────────────────────────────────────────────────────────
export const fmtMs = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const fmtNum = (n) => n?.toLocaleString() ?? "—";
