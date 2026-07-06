import ResourceGrid from './components/ResourceGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_50%,_#f8fafc_100%)] px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold text-white">
              C
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Cyber Security Hub</p>
              <p className="text-xs text-slate-500">Modern learning resources</p>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <a href="#resources" className="transition hover:text-emerald-700">Resources</a>
            <a href="#roadmap" className="transition hover:text-emerald-700">Roadmap</a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)] backdrop-blur-sm">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                Cyber Security Hub
              </div>
              <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Learn, build, and stay secure with clarity.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                A polished, modern learning hub for security fundamentals, practical resources, and a focused roadmap that keeps you moving forward.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#resources"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Explore resources
                </a>
                <a
                  href="#roadmap"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700"
                >
                  View roadmap
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Practical guides', 'Trusted links', 'Modern workflow'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-inner sm:p-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  Your focus area
                </p>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live guide
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  'Build a strong security foundation',
                  'Use reliable, high-quality tools',
                  'Keep learning with a simple roadmap',
                ].map((point, index) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-semibold text-emerald-300">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ResourceGrid />
      </div>
    </main>
  );
}
