import * as React from "react";

export type AppRole = "admin" | "seller" | "call-center";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  roleLabel: string;
}

export interface AuditPreviewEntry {
  user: string;
  action: string;
  role: string;
  at: string;
}

interface SessionState {
  user: SessionUser | null;
  previewRole: AppRole | null;
  effectiveRole: AppRole | null;
  canPreview: boolean;
  previewAudit: AuditPreviewEntry[];
  signIn: (email: string) => SessionUser;
  signOut: () => void;
  startPreview: (role: AppRole) => void;
  endPreview: () => void;
  ready: boolean;
}

const STORAGE_KEY = "kassebni.session";
const PREVIEW_KEY = "kassebni.preview";
const AUDIT_KEY = "kassebni.preview.audit";

const roleLabels: Record<AppRole, string> = {
  admin: "مدير النظام",
  seller: "سيلر",
  "call-center": "مركز اتصال",
};

export const roleLabel = (r: AppRole) => roleLabels[r];

function resolveRole(email: string): AppRole {
  const e = email.toLowerCase();
  if (e.startsWith("seller")) return "seller";
  if (e.startsWith("cc") || e.startsWith("call")) return "call-center";
  return "admin";
}

const SessionContext = React.createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(null);
  const [previewRole, setPreviewRole] = React.useState<AppRole | null>(null);
  const [previewAudit, setPreviewAudit] = React.useState<AuditPreviewEntry[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as SessionUser);
      const p = localStorage.getItem(PREVIEW_KEY);
      if (p) setPreviewRole(p as AppRole);
      const a = localStorage.getItem(AUDIT_KEY);
      if (a) setPreviewAudit(JSON.parse(a) as AuditPreviewEntry[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = React.useCallback((email: string) => {
    const role = resolveRole(email);
    const next: SessionUser = {
      id: "U-1",
      name: role === "admin" ? "مدير النظام" : role === "seller" ? "حساب السيلر" : "مركز الاتصال",
      email,
      role,
      roleLabel: roleLabels[role],
    };
    setUser(next);
    setPreviewRole(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    localStorage.removeItem(PREVIEW_KEY);
    return next;
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    setPreviewRole(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PREVIEW_KEY);
  }, []);

  const canPreview = user?.role === "admin";

  const pushAudit = React.useCallback(
    (entry: AuditPreviewEntry) => {
      setPreviewAudit((prev) => {
        const next = [entry, ...prev].slice(0, 50);
        localStorage.setItem(AUDIT_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const startPreview = React.useCallback(
    (role: AppRole) => {
      if (!user || user.role !== "admin") return; // authorization guard
      if (role === "admin") {
        if (previewRole) {
          pushAudit({
            user: user.name,
            action: "إنهاء معاينة",
            role: roleLabels[previewRole],
            at: new Date().toISOString(),
          });
        }
        setPreviewRole(null);
        localStorage.removeItem(PREVIEW_KEY);
        return;
      }
      setPreviewRole(role);
      localStorage.setItem(PREVIEW_KEY, role);
      pushAudit({
        user: user.name,
        action: "بدء معاينة",
        role: roleLabels[role],
        at: new Date().toISOString(),
      });
    },
    [user, previewRole, pushAudit],
  );

  const endPreview = React.useCallback(() => {
    if (!user || !previewRole) return;
    pushAudit({
      user: user.name,
      action: "إنهاء معاينة",
      role: roleLabels[previewRole],
      at: new Date().toISOString(),
    });
    setPreviewRole(null);
    localStorage.removeItem(PREVIEW_KEY);
  }, [user, previewRole, pushAudit]);

  const value: SessionState = {
    user,
    previewRole,
    effectiveRole: user ? (user.role === "admin" ? (previewRole ?? "admin") : user.role) : null,
    canPreview: !!canPreview,
    previewAudit,
    signIn,
    signOut,
    startPreview,
    endPreview,
    ready,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = React.useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
