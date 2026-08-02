"use client";

import { useState } from "react";
import { CATEGORIES } from "../lib/topics";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  async function getTopic() {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const res = await fetch(`/api/random-topic?category=${category}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (e) {
      setError(e.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function copyCaption() {
    if (!result) return;
    const text = [
      result.topic.name,
      "",
      result.explanation,
      "",
      "Content ideas:",
      `IG: ${result.contentIdeas.instagram || ""}`,
      `YouTube: ${result.contentIdeas.youtube || ""}`,
      `LinkedIn: ${result.contentIdeas.linkedin || ""}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  }

  return (
    <main className="page">
      <div className="top-row">
        <h1>The Couch</h1>
      </div>
      <div className="made-by">🛋️ made by <b>a psych student</b></div>

      <p className="helper">
        Pull a random psychology topic — grounded in real, current research — with
        ready-to-post content ideas.
      </p>

      <div className="controls-row">
        <select
          className="cat-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">✨ All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={getTopic} disabled={loading}>
          {loading ? "Thinking…" : "New topic"}
        </button>
      </div>

      {error && <p className="status-line err">{error}</p>}
      {!error && loading && <p className="status-line">Pulling recent research…</p>}

      {result && !loading && (
        <div className="card">
          <p className="eyebrow">{result.topic.emoji} {result.topic.categoryLabel}</p>
          <h2 className="topic-name">{result.topic.name}</h2>

          <p className="explanation">{result.explanation}</p>

          {result.keyTheories?.length > 0 && (
            <>
              <p className="section-label">Key theories</p>
              <ul className="plain-list">
                {result.keyTheories.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}

          {result.modernApplications?.length > 0 && (
            <>
              <p className="section-label">Modern applications</p>
              <ul className="plain-list">
                {result.modernApplications.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}

          {result.contentIdeas && (
            <>
              <p className="section-label">Content ideas</p>
              <div className="content-ideas">
                {result.contentIdeas.instagram && (
                  <div className="idea-row"><b>Instagram</b>{result.contentIdeas.instagram}</div>
                )}
                {result.contentIdeas.youtube && (
                  <div className="idea-row"><b>YouTube</b>{result.contentIdeas.youtube}</div>
                )}
                {result.contentIdeas.linkedin && (
                  <div className="idea-row"><b>LinkedIn</b>{result.contentIdeas.linkedin}</div>
                )}
              </div>
            </>
          )}

          <p className="section-label" style={{ marginTop: 22 }}>Research</p>
          <div className="references">
            {result.references?.length > 0 ? (
              result.references.map((r, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                  ) : (
                    r.title
                  )}
                  {" — "}
                  {(r.authors || []).join(", ")}{r.year ? ` (${r.year})` : ""}
                </div>
              ))
            ) : (
              <p className="ref-empty">No recent papers turned up for this one — grounded in established theory instead.</p>
            )}
          </div>

          <div className="copy-row">
            <button className="btn btn-outline" onClick={copyCaption}>Copy summary</button>
          </div>
          {copied && <p className="copied-msg">Copied to clipboard.</p>}
        </div>
      )}
    </main>
  );
}
