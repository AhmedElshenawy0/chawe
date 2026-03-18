// app/api/chat/route.js

export async function POST(req) {
  const { messages } = await req.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model:       "llama-3.3-70b-versatile",
      messages,
      stream:      true,
      max_tokens:  1024,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(JSON.stringify({ error: err }), {
      status:  res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Groq uses OpenAI-compatible SSE format
  // chat page parser already handles { delta: { text } } — we re-map here
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (raw === "[DONE]") continue;

          try {
            const json  = JSON.parse(raw);
            // OpenAI/Groq format: choices[0].delta.content
            const chunk = json?.choices?.[0]?.delta?.content ?? "";
            if (chunk) {
              // re-emit in the same format our chat page expects
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ delta: { text: chunk } })}\n\n`
                )
              );
            }
          } catch {
            // ignore malformed lines
          }
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type":      "text/event-stream; charset=utf-8",
      "Cache-Control":     "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}