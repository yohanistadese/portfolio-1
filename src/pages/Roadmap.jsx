import { useEffect, useState } from "react";
import useDocumentTitle from "../useDocumentTitle.js";
import { ROADMAP } from "../data/roadmap.js";
import useProgress from "../roadmap/useProgress.js";
import useLearningNote from "../roadmap/useLearningNote.js";
import MonthCard, { countMonth } from "../roadmap/MonthCard.jsx";
import TopicDrawer from "../roadmap/TopicDrawer.jsx";
import "../roadmap/roadmap.css";

export default function Roadmap() {
  useDocumentTitle("AI Engineer Roadmap — 6 Month Tracker");
  const { progress, setStatus, cycleStatus, resetAll } = useProgress();
  const note = useLearningNote();
  const [open, setOpen] = useState(null); // { month, item, id }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const overall = ROADMAP.reduce(
    (acc, month) => {
      const s = countMonth(month, progress);
      acc.total += s.total;
      acc.done += s.done;
      acc.inProgress += s.inProgress;
      acc.skipped += s.skipped;
      return acc;
    },
    { total: 0, done: 0, inProgress: 0, skipped: 0 }
  );
  const overallPct = overall.total ? Math.round((overall.done / overall.total) * 100) : 0;

  function handleReset() {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    resetAll();
    setOpen(null);
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>🧭 AI Engineer Roadmap</h1>
        <p>Your private 6-month learning space. Pick one topic, study it, test yourself, and record what changed.</p>
      </header>

      <div className="overview">
        <div className="overview-top">
          <h2>Overall Progress</h2>
          <span>{overallPct}%</span>
        </div>
        <div className="overall-bar">
          <div className="overall-bar-fill" style={{ width: `${overallPct}%` }} />
        </div>
        <div className="overview-stats">
          <span>✅ Done: <b>{overall.done}</b></span>
          <span>🟡 Learning: <b>{overall.inProgress}</b></span>
          <span>⏭️ Skipped: <b>{overall.skipped}</b></span>
          <span>⬜ Not started: <b>{overall.total - overall.done - overall.inProgress - overall.skipped}</b></span>
          <span>Total topics: <b>{overall.total}</b></span>
          <button className="reset-btn" onClick={handleReset}>Reset progress</button>
        </div>
      </div>

      <main className="roadmap-container">
        {ROADMAP.map((month, index) => (
          <MonthCard
            key={month.id}
            month={month}
            progress={progress}
            onCycle={cycleStatus}
            onOpen={(m, section, item, id) => setOpen({ month: m, item, id })}
            defaultExpanded={index === 0}
          />
        ))}
      </main>

      <footer className="page-footer">
        Private study page · Progress and notes are saved automatically in your browser.
      </footer>

      {open && (
        <TopicDrawer
          month={open.month}
          item={open.item}
          status={progress[open.id] || 0}
          onSetStatus={(value) => setStatus(open.id, value)}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
