const APY_TOPICS_URL = "https://api.apyhub.com/ai/text/extract-keywords";

export async function extractTopicsFromText(text: string): Promise<string[]> {
  if (!text || text.length < 60) return [];

  const res = await fetch(APY_TOPICS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apy-token": import.meta.env.VITE_APYHUB_API_KEY || "",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Failed to extract topics");

  const data = await res.json();
  const list: string[] = data.keywords || data.topics || [];
  return list.slice(0, 5);
}
