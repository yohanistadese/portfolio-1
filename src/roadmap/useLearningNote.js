import { useState } from "react";

const NOTE_STORAGE_KEY = "ai-roadmap-learning-note-v1";

export default function useLearningNote() {
  const [note, setNote] = useState(() => localStorage.getItem(NOTE_STORAGE_KEY) || "");
  const [status, setStatus] = useState("Saved automatically in this browser");

  function update(value) {
    setNote(value);
    localStorage.setItem(NOTE_STORAGE_KEY, value);
    setStatus("Saved just now");
  }

  function clear() {
    setNote("");
    localStorage.removeItem(NOTE_STORAGE_KEY);
    setStatus("Note cleared");
  }

  return { note, status, update, clear };
}
