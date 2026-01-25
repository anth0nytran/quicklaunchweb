"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { GlassButton, GlassCard, GlassDivider, GlassInput } from "@/components/ui/glass";

type DemoLoginFormProps = {
  nextPath?: string;
};

export function DemoLoginForm({ nextPath = "/demo" }: DemoLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");

      const trimmedUsername = username.trim();
      if (!trimmedUsername || !password) {
        setError("Enter both your username and password.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/demo/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: trimmedUsername,
            password,
            next: nextPath,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setError(data?.error || "Login failed. Please try again.");
          return;
        }

        const redirectTo = typeof data?.redirectTo === "string" ? data.redirectTo : "/demo";
        window.location.assign(redirectTo);
      } catch (err) {
        console.error("Demo login failed:", err);
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [username, password, nextPath]
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wider text-muted">Private Demo</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Demo Access</h1>
        <p className="mt-3 text-sm text-secondary">Enter your credentials to continue.</p>
      </div>

      <GlassCard variant="elevated" className="p-6 md:p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <GlassInput
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            autoComplete="username"
          />
          <GlassInput
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <GlassDivider className="my-2" />

          <GlassButton
            variant="secondary"
            size="lg"
            type="submit"
            loading={loading}
            className="w-full"
          >
            Access Demo
          </GlassButton>
        </form>
      </GlassCard>

      <div className="flex flex-col items-center gap-3 text-xs text-muted">
        <p>Need to head back?</p>
        <Link href="/">
          <GlassButton variant="ghost" size="md">
            Back to home
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
