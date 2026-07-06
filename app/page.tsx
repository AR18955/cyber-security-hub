import ResourceGrid from './components/ResourceGrid';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_40%),linear-gradient(135deg,_#020617,_#0f172a)] px-4 py-10 text-center sm:px-6">
      <div className="mb-8 w-full max-w-3xl rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-950/30 sm:p-10">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-emerald-400">Cyber Security Hub</p>
        <h1 className="mb-4 text-3xl font-semibold sm:text-5xl lg:text-6xl">
          Secure your digital world with confidence.
        </h1>
        <p className="mx-auto mb-0 max-w-2xl text-base text-slate-300 sm:text-lg">
          A modern Next.js app router experience for learning, insights, and resources around cyber security.
        </p>
      </div>

      <ResourceGrid />
    </main>
  );
}
