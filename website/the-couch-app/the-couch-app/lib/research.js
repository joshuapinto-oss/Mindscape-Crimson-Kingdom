// Free, keyless research APIs. Semantic Scholar is tried first (better
// abstracts, recency filter); Crossref is the fallback if that comes up empty.

async function fetchWithTimeout(url, options = {}, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function searchSemanticScholar(query, { recentOnly = true } = {}) {
  const fields = "title,abstract,year,authors,url,venue";
  const yearParam = recentOnly ? "&year=2018-2026" : "";
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
    query
  )}&limit=5&fields=${fields}${yearParam}`;

  const res = await fetchWithTimeout(url);
  if (!res.ok) return [];
  const data = await res.json();
  const papers = data?.data || [];

  return papers
    .filter((p) => p.abstract) // only keep papers we can actually summarize from
    .map((p) => ({
      title: p.title,
      year: p.year,
      authors: (p.authors || []).slice(0, 3).map((a) => a.name),
      url: p.url,
      venue: p.venue,
      abstract: p.abstract,
      source: "Semantic Scholar",
    }));
}

async function searchCrossref(query) {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(
    query
  )}&rows=5&sort=published&order=desc`;

  const res = await fetchWithTimeout(url);
  if (!res.ok) return [];
  const data = await res.json();
  const items = data?.message?.items || [];

  return items
    .filter((it) => it.title?.[0])
    .map((it) => ({
      title: it.title[0],
      year: it["published"]?.["date-parts"]?.[0]?.[0] || null,
      authors: (it.author || []).slice(0, 3).map((a) => `${a.given || ""} ${a.family || ""}`.trim()),
      url: it.URL,
      venue: it["container-title"]?.[0] || null,
      abstract: null, // Crossref rarely includes abstracts
      source: "Crossref",
    }));
}

// Returns a de-duplicated list of real papers for a topic, newest first,
// preferring results that come with an abstract to ground the AI summary.
export async function findResearch(seedQuery) {
  let papers = [];

  try {
    papers = await searchSemanticScholar(seedQuery, { recentOnly: true });
  } catch (e) {
    papers = [];
  }

  if (papers.length === 0) {
    try {
      papers = await searchSemanticScholar(seedQuery, { recentOnly: false });
    } catch (e) {
      papers = [];
    }
  }

  if (papers.length === 0) {
    try {
      papers = await searchCrossref(seedQuery);
    } catch (e) {
      papers = [];
    }
  }

  return papers
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 5);
}
