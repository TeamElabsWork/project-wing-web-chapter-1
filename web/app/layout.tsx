import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Photography Showcase Platform | KIIT',
  description: 'An open showcase platform for students to share and discover original photography work.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-500/20 selection:text-amber-300">
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-white">
              <span className="text-amber-500">Lens</span>Showcase
            </a>
            <nav className="flex items-center space-x-4">
              <a href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition">
                Gallery
              </a>
              <a href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition">
                Sign In
              </a>
              <a
                href="/register"
                className="rounded-lg bg-amber-500 px-3.5 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition"
              >
                Join Community
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100vh-8rem)]">{children}</main>

        <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Photography Showcase Platform. Built for the student community.</p>
        </footer>
      </body>
    </html>
  );
}
