const MODEL = "llama-3.3-70b-versatile"; // change here if you want a different Groq model

export async function generateSummary(topicName, papers) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("GROQ_API_KEY is not set on the server.");
  }

  const paperContext = papers.length
    ? papers
        .map(
          (p, i) =>
            `[${i + 1}] "${p.title}" (${p.year || "n.d."})${p.venue ? `, ${p.venue}` : ""}${
              p.abstract ? `\nAbstract: ${p.abstract.slice(0, 600)}` : ""
            }`
        )
        .join("\n\n")
    : "No recent papers were found for this search — ground your answer in well-established psychology only.";

  const prompt = `You are helping a psychology content creator understand a topic well enough to post about it.

Topic: "${topicName}"

Here is real, current research retrieved for this topic:
${paperContext}

Respond with ONLY a raw JSON object, no markdown, no code fences, in exactly this shape:
{
  "explanation": "2-3 plain-English sentences explaining the topic for a general audience",
  "keyTheories": ["established theory or model relevant to this topic", "..."],
  "modernApplications": ["a real-world or modern application", "..."],
  "contentIdeas": {
    "instagram": "one concrete post/reel idea, one sentence",
    "youtube": "one concrete video idea, one sentence",
    "linkedin": "one concrete post idea, one sentence, professional tone"
  }
}

Rules:
- keyTheories: 2-4 items, well-established psychology only, not invented.
- modernApplications: 2-3 items.
- Base "explanation" and content ideas on the actual research context above when it's provided — don't ignore it.
- If no papers were provided, say so is not needed in the JSON; just ground the answer in solid, well-known psychology.
- Do not fabricate study names, authors, or statistics beyond what's given above.`;

  const res = await fetchGroq(key, prompt);
  return res;
}

async function fetchGroq(key, prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Groq error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  let raw = data.choices?.[0]?.message?.content?.trim() || "";
  raw = raw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();

  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error("The AI response wasn't valid JSON — try again.");
  }
}
