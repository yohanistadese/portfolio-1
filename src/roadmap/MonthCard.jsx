import { useState } from "react";

const STATUS_CLASSES = ["status-todo", "status-progress", "status-done", "status-skip"];
const STATUS_LABELS = ["Not started", "Learning", "Done", "Skipped"];

export function itemId(monthId, sectionIdx, itemIdx) {
  return `${monthId}-s${sectionIdx}-i${itemIdx}`;
}

export default function MonthCard({ month, progress, onCycle, onOpen, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="month-card" style={{ "--accent": month.color }}>
      <header
        className="month-header"
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
      >
        <div className="month-badge">M{month.month}</div>
        <div className="month-heading">
          <h3>{month.title}</h3>
          <p className="month-goal">{month.goal}</p>
        </div>
        <MonthProgress month={month} progress={progress} />
        <span className={`month-chevron ${expanded ? "month-chevron-open" : ""}`} aria-hidden="true">›</span>
      </header>
      {expanded && (
        <div className="month-body">
          {month.sections.map((section, sIdx) => (
            <div className="section" key={section.title}>
              <h4 className="section-title">{section.title}</h4>
              <ul className="item-list">
                {section.items.map((item, iIdx) => {
                  const id = itemId(month.id, sIdx, iIdx);
                  const status = progress[id] || 0;
                  return (
                    <li className={`item ${STATUS_CLASSES[status]}`} key={id}>
                      <button
                        className="status-dot"
                        title="Click to cycle status"
                        aria-label={STATUS_LABELS[status]}
                        onClick={() => onCycle(id)}
                      />
                      <span className="item-label" onClick={() => onOpen(month, section, item, id)}>
                        {item.label}
                      </span>
                      <span className="item-tag">{STATUS_LABELS[status]}</span>
                      <span className="item-chevron" onClick={() => onOpen(month, section, item, id)} title="View details">
                        ›
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function MonthProgress({ month, progress }) {
  const { total, done } = countMonth(month, progress);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="month-progress">
      <span className="month-pct">{pct}%</span>
      <div className="month-bar">
        <div className="month-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="month-count">{done}/{total}</span>
    </div>
  );
}

export function countMonth(month, progress) {
  let total = 0;
  let done = 0;
  let inProgress = 0;
  let skipped = 0;
  month.sections.forEach((section, sIdx) => {
    section.items.forEach((_, iIdx) => {
      total++;
      const st = progress[itemId(month.id, sIdx, iIdx)] || 0;
      if (st === 2) done++;
      else if (st === 1) inProgress++;
      else if (st === 3) skipped++;
    });
  });
  return { total, done, inProgress, skipped };
}
