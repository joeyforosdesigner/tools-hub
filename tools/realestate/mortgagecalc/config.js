const CONFIG = {
  WORKER_URL: "https://tools-api-proxy.joeyforos.workers.dev",
  TOOL_SECRET: "Tool_Generator_Secret",
  USE_BRAVE: false,
  USE_GEMINI: false,
  brave: async (query) => {
    if (!CONFIG.USE_BRAVE) return { error: "Brave API non activée" };
    const res = await fetch(`${CONFIG.WORKER_URL}/brave?q=${encodeURIComponent(query)}`, { headers: { "X-Tool-Secret": CONFIG.TOOL_SECRET } });
    return await res.json();
  },
  gemini: async (prompt, system = "") => {
    if (!CONFIG.USE_GEMINI) return { error: "Gemini API non activée" };
    const res = await fetch(`${CONFIG.WORKER_URL}/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Tool-Secret": CONFIG.TOOL_SECRET },
      body: JSON.stringify({ prompt, system }),
    });
    return await res.json();
  },
};