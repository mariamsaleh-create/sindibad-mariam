import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { apiRequest } from "../../services/adminApi";

export function useAdminData(path) {
  const { token } = useOutletContext();
  const [version, setVersion] = useState(0);
  const [result, setResult] = useState({ data: null, error: "", loading: true });

  useEffect(() => {
    const controller = new AbortController();
    apiRequest(path, { token, signal: controller.signal })
      .then((data) => setResult({ data, error: "", loading: false }))
      .catch((error) => {
        if (!controller.signal.aborted) setResult({ data: null, error: error.message, loading: false });
      });
    return () => controller.abort();
  }, [path, token, version]);

  return {
    ...result,
    reload: () => {
      setResult((current) => ({ ...current, loading: true, error: "" }));
      setVersion((current) => current + 1);
    },
    request: (target, options) => apiRequest(target, { ...options, token }),
  };
}
