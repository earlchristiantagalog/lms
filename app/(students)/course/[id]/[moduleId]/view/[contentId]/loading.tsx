export default function ContentLoading() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <div className="h-8 w-20 rounded-lg bg-slate-100 animate-pulse" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-64 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="h-8 w-8 rounded-md bg-slate-100 animate-pulse" />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="h-3 w-80 rounded bg-slate-100 animate-pulse" />
        <div className="mt-4 h-7 w-96 rounded bg-slate-100 animate-pulse" />
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
          <div className="h-32 w-full rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
