// hooks/useAuth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return user;
}
