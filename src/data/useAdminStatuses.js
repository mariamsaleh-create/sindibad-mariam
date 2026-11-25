import { useState } from "react";

export function useAdminStatuses(section) {
  const key = `sindibad:admin:${section}:v1`;
  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = JSON.parse(globalThis.localStorage?.getItem(key) ?? "{}");
      return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
    } catch {
      return {};
    }
  });
  const [error, setError] = useState("");

  function update(id, status) {
    const next = { ...statuses, [id]: status };
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(next));
      setStatuses(next);
      setError("");
      return true;
    } catch {
      setError("The change could not be saved in this browser.");
      return false;
    }
  }

  return { statuses, update, error };
}
