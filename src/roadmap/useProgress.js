import { useEffect, useState } from "react";

const STORAGE_KEY = "ai-roadmap-progress-v2";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  function setStatus(id, value) {
    setProgress((prev) => ({ ...prev, [id]: value }));
  }

  function cycleStatus(id) {
    setStatus(id, ((progress[id] || 0) + 1) % 4);
  }

  function resetAll() {
    setProgress({});
  }

  return { progress, setStatus, cycleStatus, resetAll };
}
