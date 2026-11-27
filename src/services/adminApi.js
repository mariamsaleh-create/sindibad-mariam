const sessionKey = "sindibad:admin-session";

export function readAdminSession() {
  try {
    return JSON.parse(window.sessionStorage.getItem(sessionKey) || "null");
  } catch {
    return null;
  }
}

export function writeAdminSession(session) {
  try {
    if (session) window.sessionStorage.setItem(sessionKey, JSON.stringify(session));
    else window.sessionStorage.removeItem(sessionKey);
  } catch {
    // The active session can still be used in memory.
  }
}

export async function apiRequest(path, { token, method = "GET", body, signal } = {}) {
  const isFile = body instanceof FormData;
  let response;
  try {
    response = await fetch(`/api/${path}`, {
      method, signal,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(body && !isFile && { "Content-Type": "application/json" }),
      },
      body: body && (isFile ? body : JSON.stringify(body)),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Cannot reach the backend. Check that Spring Boot is running.", { cause: error });
  }

  if (response.status === 204) return null;
  const json = response.headers.get("content-type")?.includes("json");
  const data = json ? await response.json() : null;
  if (!response.ok) {
    const fallback = response.status === 401 ? "Sign in with a valid admin account."
      : response.status === 403 ? "This account does not have permission for this action."
      : `Backend request failed (${response.status}).`;
    throw new Error(typeof data?.message === "string" ? data.message : fallback);
  }
  if (!json && method === "GET") throw new Error("The backend did not return API data. Check the API server.");
  return data;
}
