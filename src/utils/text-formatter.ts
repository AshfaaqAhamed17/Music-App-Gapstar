export function formatDuration(seconds: string | number): string {
  const secs = typeof seconds === "string" ? parseInt(seconds, 10) : seconds;
  if (isNaN(secs) || secs === 0) return "--:--";

  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const formatNumber = (value: string | number): string => {
  if (typeof value === "string") {
    const num = Number(value);
    if (isNaN(num)) return value;
    value = num;
  }
  if (!Number.isFinite(value)) return String(value);
  if (value === 0) return "0";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs < 10) {
    // Preserve fractional part if present (e.g. 9.5 -> "09.5"), otherwise "09"
    const frac = abs % 1;
    if (frac === 0) {
      return `${sign}0${Math.trunc(abs)}`;
    }
    // Preserve fractional digits as-is (e.g. 9.5 -> "09.5")
    return `${sign}0${abs.toString()}`;
  }
  return new Intl.NumberFormat("en-US").format(value);
};

export function splitArtists(name: string): string[] {
  if (!name) return [];

  return name
    .split(/,|&| and | feat\.?| ft\.?| featuring | with /gi)
    .map((s) => s.trim())
    .filter(Boolean);
}
