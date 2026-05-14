function buildFallbackResponse(prompt, businessContext, uploads, knowledgeEntries, calls) {
  return [
    "Executive AI consultant stream initialized.",
    `Current focus: ${prompt}`,
    `Known business context: ${businessContext || "No business context provided yet."}`,
    `Knowledge assets loaded: ${uploads?.length ? uploads.join(", ") : "none yet"}.`,
    `Saved knowledge notes: ${knowledgeEntries?.length ? knowledgeEntries.map((entry) => entry.title).join(", ") : "none yet"}.`,
    `Recent calls in memory: ${calls?.length ? calls.map((call) => `${call.caller} (${call.status})`).join(", ") : "none yet"}.`,
    "Set GEMINI_API_KEY in Vercel to switch this route from simulated streaming to live Gemini-backed output.",
  ].join(" ");
}

async function fetchGeminiText(prompt, businessContext, uploads, knowledgeEntries, calls, apiKey) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: [
                  "You are an executive AI consultant for Fugth Management.",
                  "Answer with concise business guidance that can be streamed to a dashboard chat UI.",
                  "Reference the knowledge notes and recent calls when they are relevant.",
                  `Business context: ${businessContext || "None supplied."}`,
                  `Knowledge base uploads: ${uploads?.length ? uploads.join(", ") : "None supplied."}`,
                  `Knowledge notes: ${knowledgeEntries?.length ? knowledgeEntries.map((entry) => `${entry.title}: ${entry.content}`).join(" | ") : "None supplied."}`,
                  `Recent calls: ${calls?.length ? calls.map((call) => `${call.date} - ${call.caller} - ${call.status} - rating ${call.rating || "n/a"}`).join(" | ") : "None supplied."}`,
                  `User prompt: ${prompt}`,
                ].join("\n\n"),
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini request failed: ${details}`);
  }

  const payload = await response.json();
  return (
    payload?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ||
    "Gemini returned an empty response."
  );
}

function streamText(text) {
  const encoder = new TextEncoder();
  let index = 0;

  return new ReadableStream({
    async pull(controller) {
      if (index >= text.length) {
        controller.close();
        return;
      }

      const nextChunk = text.slice(index, index + 24);
      index += 24;
      controller.enqueue(encoder.encode(nextChunk));
      await new Promise((resolve) => setTimeout(resolve, 35));
    },
  });
}

export async function POST(request) {
  try {
    const { prompt, businessContext, uploads, knowledgeEntries, calls } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response("Prompt is required.", { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const text = apiKey
      ? await fetchGeminiText(prompt, businessContext, uploads, knowledgeEntries, calls, apiKey)
      : buildFallbackResponse(prompt, businessContext, uploads, knowledgeEntries, calls);

    return new Response(streamText(text), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(error.message || "Unable to process chat request.", { status: 500 });
  }
}
