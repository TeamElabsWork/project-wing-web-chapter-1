'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Camera, Lock, Mail, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const registered = searchParams.get('registered') === 'true';
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError ? 'Invalid email or password. Please check your credentials.' : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const isNonKiitEmail = email.length > 5 && email.includes('@') && !email.toLowerCase().endsWith('@kiit.ac.in');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in both your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError('Invalid email or password. Please check your credentials and try again.');
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl shadow-black/60">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center rounded-xl bg-amber-500/10 p-3 text-amber-500 mb-3 border border-amber-500/20">
          <Camera className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to your KIIT Photography Showcase account
        </p>
      </div>

      {registered && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
          <span>Account created successfully! Please sign in with your credentials.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            KIIT Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="e.g. 2105123@kiit.ac.in"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
            />
          </div>
          {isNonKiitEmail && (
            <p className="mt-1.5 text-xs text-amber-400/90 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              Note: KIIT student accounts require an @kiit.ac.in email address.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Password
            </label>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 hover:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-zinc-800/80 pt-6 text-center text-sm text-zinc-400">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-semibold text-amber-400 hover:text-amber-300 transition">
          Join Community
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-zinc-400 text-sm">Loading sign in...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
