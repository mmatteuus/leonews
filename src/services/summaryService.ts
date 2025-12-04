export function summarizeText(text: string): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 240) return clean;
  return `${clean.slice(0, 240).trim()}...`;
}

export function extractTopics(text: string): string[] {
  if (!text) return [];
  const normalized = text
    .toLowerCase()
    .replace(/[^a-zà-ú0-9\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

  const common = new Set([
    "de",
    "da",
    "do",
    "em",
    "para",
    "com",
    "que",
    "uma",
    "um",
    "no",
    "na",
    "o",
    "a",
    "e",
    "por",
    "as",
    "os",
    "das",
    "dos",
  ]);

  const counts = new Map<string, number>();
  normalized.forEach((word) => {
    if (word.length < 4 || common.has(word)) return;
    counts.set(word, (counts.get(word) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}
