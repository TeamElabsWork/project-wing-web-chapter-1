'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Camera, Lock, Mail, User, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isNonKiitEmail = email.length > 5 && email.includes('@') && !email.toLowerCase().endsWith('@kiit.ac.in');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDuplicateEmail(false);

    const trimmedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    // Client-side validations
    if (!trimmedName || !sanitizedEmail || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 60) {
      setError('Name must be between 2 and 60 characters.');
      return;
    }

    if (!sanitizedEmail.endsWith('@kiit.ac.in')) {
      setError('Please use a valid KIIT student email address ending with @kiit.ac.in.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: sanitizedEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 409) {
          setIsDuplicateEmail(true);
          setError(data?.error || 'An account with this email already exists.');
        } else {
          setError(data?.error || 'Failed to create account. Please check your details.');
        }
        setIsLoading(false);
        return;
      }

      // Automatically sign in upon registration
      const signInRes = await signIn('credentials', {
        email: sanitizedEmail,
        password,
        redirect: false,
      });

      if (!signInRes || signInRes.error) {
        // Fallback: Redirect to login page with success param
        router.push('/login?registered=true');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Network or server error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl shadow-black/60">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-xl bg-amber-500/10 p-3 text-amber-500 mb-3 border border-amber-500/20">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Join the Community</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Create an account to showcase and discover KIIT photography
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                {isDuplicateEmail && (
                  <div className="mt-2">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline"
                    >
                      Click here to sign in instead
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
          </div>

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
                placeholder="rollnumber@kiit.ac.in"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
            {isNonKiitEmail ? (
              <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3 shrink-0" />
                Must be an official KIIT University domain (@kiit.ac.in).
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-zinc-500">
                Must be an official university address ending with @kiit.ac.in
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="At least 6 characters"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Repeat your password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Student Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-zinc-800/80 pt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-amber-400 hover:text-amber-300 transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
