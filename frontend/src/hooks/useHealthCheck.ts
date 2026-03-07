import { useEffect, useState } from "react";

export function useHealthCheck(baseUrl: string): string {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let mounted = true;

    fetch(baseUrl.replace(/\/api$/, ""))
      .then(() => {
        if (mounted) {
          setStatus("online");
        }
      })
      .catch(() => {
        if (mounted) {
          setStatus("offline");
        }
      });

    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  return status;
}
