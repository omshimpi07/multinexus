import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, UserRole } from "@/types";

const SEED_USERS: Record<UserRole, User> = {
  customer: {
    id: "u_customer",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "customer",
    avatarUrl: "",
  },
  business: {
    id: "u_business",
    name: "Sofia Reyes",
    email: "sofia@bloombakery.com",
    role: "business",
    businessId: "biz_bloom_bakery",
  },
  admin: {
    id: "u_admin",
    name: "Jordan Chen",
    email: "jordan@multinexus.io",
    role: "admin",
  },
};

const STORAGE_KEY = "mn-auth-role";

interface AuthCtx {
  user: User | null;
  role: UserRole | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as UserRole | null;
      if (stored && SEED_USERS[stored]) setRole(stored);
    } catch {
      // ignore
    }
  }, []);

  const loginAs = (r: UserRole) => {
    setRole(r);
    try {
      localStorage.setItem(STORAGE_KEY, r);
    } catch {
      // ignore
    }
  };
  const logout = () => {
    setRole(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const user = role ? SEED_USERS[role] : null;

  return <AuthContext.Provider value={{ user, role, loginAs, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) return { user: null, role: null, loginAs: () => {}, logout: () => {} } as AuthCtx;
  return ctx;
}
