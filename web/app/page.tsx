export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Original Stories Captured Through <span className="text-amber-500">Student Lenses</span>
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          An open showcase platform for university photographers. No club restrictions. Pure passion, shared.
        </p>
      </div>

      {/* Placeholder Gallery Empty State */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-16 text-center">
        <div className="rounded-full bg-zinc-800/80 p-4 text-zinc-400 mb-4">
          <svg
            className="w-8 h-8 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Public Gallery Initialized</h3>
        <p className="mt-1 text-sm text-zinc-400 max-w-md">
          Sprint 1 in progress. Photographs uploaded by students will appear dynamically in this grid.
        </p>
      </div>
    </div>
  );
}
