const APY_SUMMARY_URL = "https://api.apyhub.com/ai/summarize/text";

export async function summarizeTextWithAI(text: string): Promise<string> {
  if (!text || text.length < 100) return "";

  const res = await fetch(APY_SUMMARY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apy-token": import.meta.env.VITE_APYHUB_API_KEY || "",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!res.ok) throw new Error("Failed to summarize text");

  const data = await res.json();
  return data.summary || data.result || "";
}
