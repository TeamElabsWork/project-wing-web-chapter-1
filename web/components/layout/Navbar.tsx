'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Upload, LogIn, Menu, X, User } from 'lucide-react';

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-white group">
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500 group-hover:bg-amber-500/20 transition">
            <Camera className="h-5 w-5" />
          </div>
          <span>
            <span className="text-amber-500">Lens</span>Showcase
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition">
            Gallery
          </Link>

          {user ? (
            <>
              <Link
                href="/upload"
                className="flex items-center space-x-2 rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-sm font-medium text-white hover:border-amber-500/50 hover:bg-zinc-800 transition"
              >
                <Upload className="h-4 w-4 text-amber-500" />
                <span>Upload</span>
              </Link>
              <Link
                href={`/users/me`}
                className="flex items-center space-x-2 text-sm font-medium text-zinc-300 hover:text-white transition"
              >
                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
                  <User className="h-4 w-4" />
                </div>
                <span>{user.name || 'My Profile'}</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="flex items-center space-x-1.5 text-sm font-medium text-zinc-300 hover:text-white transition px-3 py-1.5"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition"
              >
                Join Community
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Gallery
          </Link>
          {user ? (
            <>
              <Link
                href="/upload"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                <Upload className="h-5 w-5 text-amber-500" />
                <span>Upload Photograph</span>
              </Link>
              <Link
                href="/users/me"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                My Profile
              </Link>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-3 py-2 rounded-lg border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-3 py-2 rounded-lg bg-amber-500 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
              >
                Join Community
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
