import { useState } from "react";

const PILLS = [
  { value: 1, icon: "📖", label: "Learning" },
  { value: 2, icon: "✓", label: "Done" },
  { value: 3, icon: "✕", label: "Skip" },
];

export default function TopicDrawer({ month, item, status, onSetStatus, onClose }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <div className="backdrop-open" id="drawer-backdrop" onClick={onClose} />
      <aside id="drawer" className="drawer-open" style={{ "--accent": month.color }}>
        <div className="drawer-top">
          <div className="pill-row">
            {PILLS.map((pill) => (
              <button
                key={pill.value}
                className={`pill-btn ${status === pill.value ? "pill-active" : ""}`}
                style={{ "--accent": month.color }}
                onClick={() => onSetStatus(status === pill.value ? 0 : pill.value)}
              >
                {pill.icon} {pill.label}
              </button>
            ))}
          </div>
          <button className="drawer-close" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          <span className="drawer-month-tag">Month {month.month} · {month.title}</span>
          <h2 className="drawer-title">{item.label}</h2>
          <p className="drawer-desc">{item.description}</p>

          <p className="review-tip">
            <strong>Review before moving on:</strong> explain this topic without looking at the description, then think of one place you could use it in a real project.
          </p>

          <div className="quiz-box">
            <div className="quiz-q">🧠 Quick check: {item.quiz.q}</div>
            {revealed ? (
              <div className="quiz-a">{item.quiz.a}</div>
            ) : (
              <button className="reveal-btn" onClick={() => setRevealed(true)}>Reveal answer</button>
            )}
          </div>

          <div className="resources-block">
            <h4>Resources</h4>
            <div className="resources-row">
              {item.resources.map((r) => (
                <a key={r.url} className="resource-btn" href={r.url} target="_blank" rel="noopener noreferrer">
                  🔗 {r.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
