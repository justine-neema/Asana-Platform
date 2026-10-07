
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/lib/api";
import { AuthInput } from "./AuthInput";

type AuthMode = "login" | "register";

export default function LoginComponent({ initialMode = "login" }: { initialMode?: AuthMode }) {
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("member");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard/home");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRegisterError("");
    setRegisterLoading(true);

    try {
      await register({ name, email, phone, password, role });
      router.push("/dashboard/home");
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {mode === "login" ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Welcome back</h1>
          </div>

          <AuthInput
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError && <p className="text-sm text-red-600">{loginError}</p>}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loginLoading ? "Signing in…" : "Sign in"}
          </button>

          <div >
            <p>don't have account?</p>
            <button
              type="button"
              onClick={() => setMode("register")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-white hover:text-emerald-800 dark:text-emerald-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-200"
            >
              Sign up
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Create account</h1>
          </div>

          <AuthInput
            label="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AuthInput
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label="Phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none ring-zinc-950/10 focus:ring-2 dark:border-zinc-700 dark:bg-gray-900 dark:text-zinc-50"
            >
              <option value="member">Team Member</option>
            </select>
          </div>

          {registerError && <p className="text-sm text-red-600">{registerError}</p>}

          <button
            type="submit"
            disabled={registerLoading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {registerLoading ? "Creating account…" : "Create account"}
          </button>

          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-1.5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-white hover:text-emerald-800 dark:text-emerald-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-200"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all"
            >
              Sign up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

