import { tours } from "./toursData";

const key = "sindibad:tour-catalog:v1";

export function getTours() {
  try {
    const saved = JSON.parse(globalThis.localStorage?.getItem(key) ?? "null");
    return Array.isArray(saved) ? saved : tours;
  } catch {
    return tours;
  }
}

export function saveTours(catalog) {
  globalThis.localStorage.setItem(key, JSON.stringify(catalog));
}
