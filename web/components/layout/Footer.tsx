import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-center text-sm text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex justify-center space-x-6 text-xs text-zinc-400">
          <Link href="/guidelines" className="hover:text-amber-400 transition">
            Community Guidelines
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-amber-400 transition">
            About Platform
          </Link>
          <span>•</span>
          <a
            href="https://github.com/TeamElabsWork/project-wing-web-chapter-1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            GitHub Repository
          </a>
        </div>
        <p>© {new Date().getFullYear()} Photography Showcase Platform. Built with Next.js 16 for student creators.</p>
      </div>
    </footer>
  );
}
