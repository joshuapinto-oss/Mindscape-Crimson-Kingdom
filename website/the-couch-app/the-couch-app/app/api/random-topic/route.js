import { NextResponse } from "next/server";
import { topicsFor, CATEGORIES } from "../../../lib/topics";
import { findResearch } from "../../../lib/research";
import { generateSummary } from "../../../lib/ai";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";

  const pool = topicsFor(category);
  if (!pool.length) {
    return NextResponse.json({ error: "No topics in that category." }, { status: 400 });
  }
  const topic = pool[Math.floor(Math.random() * pool.length)];

  try {
    const papers = await findResearch(topic.seed);
    const summary = await generateSummary(topic.name, papers);

    const catInfo = CATEGORIES.find((c) => c.key === topic.cat);

    return NextResponse.json({
      topic: {
        name: topic.name,
        category: topic.cat,
        categoryLabel: catInfo?.label || topic.cat,
        emoji: catInfo?.emoji || "🛋️",
      },
      explanation: summary.explanation,
      keyTheories: summary.keyTheories || [],
      modernApplications: summary.modernApplications || [],
      contentIdeas: summary.contentIdeas || {},
      references: papers.map((p) => ({
        title: p.title,
        authors: p.authors,
        year: p.year,
        url: p.url,
        venue: p.venue,
        source: p.source,
      })),
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Something went wrong." }, { status: 500 });
  }
}
