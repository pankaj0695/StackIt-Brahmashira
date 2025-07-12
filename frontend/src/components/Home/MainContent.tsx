import React, { useState } from "react";
import { dummyQuestions } from "./DummyQuests";

const QUESTIONS_PER_PAGE = 5;

const MainContent: React.FC<{
  page: number;
  setPage: (p: number) => void;
  onAskQuestion: () => void;
}> = ({ page, setPage, onAskQuestion }) => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "new">("all");

  // Filter and paginate questions
  const filtered = dummyQuestions.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const start = (page - 1) * QUESTIONS_PER_PAGE;
  const paginated = filtered.slice(start, start + QUESTIONS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / QUESTIONS_PER_PAGE);

  return (
    <div className="main-content">
      <div className="question-tabs">
        <button
          className={`tab-btn${tab === "all" ? " active" : ""}`}
          onClick={() => setTab("all")}
        >
          All Questions
        </button>
        <button
          className={`tab-btn${tab === "new" ? " active" : ""}`}
          onClick={() => setTab("new")}
        >
          Newly Added
        </button>
        <input
        type="text"
        placeholder="Search questions, tags, or users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto 2rem",
          position: "relative",
          borderRadius: "999px",
          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
          transition: "all 0.2s ease",
          border: "1.5px solid #c7d2fe",
          background: "#ffffff",
          overflow: "hidden",
          height: "50px",

        }}
      />
        <button className="ask-btn" onClick={onAskQuestion}>
          + Ask Question
        </button>
      </div>
      
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        {paginated.length === 0 ? (
          <div
            style={{
              color: "#6366f1",
              fontWeight: 600,
              fontSize: "1.2rem",
              marginTop: "2rem",
            }}
          >
            No questions found.
          </div>
        ) : (
          paginated.map((q) => (
            <div
              key={q.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(99,102,241,0.07)",
                padding: "1.5rem 2rem",
                marginBottom: 24,
                border: "1.5px solid #e0e7ef",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#364fc7",
                  marginBottom: 6,
                }}
              >
                {q.title}
              </div>
              <div style={{ color: "#22223b", marginBottom: 8 }}>
                {q.description}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                {q.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background:
                        "linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)",
                      color: "#fff",
                      borderRadius: 6,
                      padding: "2px 12px",
                      fontSize: "0.95em",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ color: "#888", fontSize: "0.95em" }}>
                Asked by <b>Pankaj Gupta</b> &middot; 12 July
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          margin: "2rem 0 0 0",
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`tab-btn${page === i + 1 ? " active" : ""}`}
            onClick={() => setPage(i + 1)}
            style={{ minWidth: 36 }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
