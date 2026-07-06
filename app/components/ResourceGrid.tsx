import data from '@/data.json';

type LinkItem = {
  title: string;
  url: string;
};

type DataFile = {
  Roadmap?: string[];
  'Important Links'?: LinkItem[];
};

function isSafeUrl(value: string) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function ResourceGrid() {
  const parsedData = data as DataFile;
  const roadmap = Array.isArray(parsedData.Roadmap)
    ? parsedData.Roadmap.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const importantLinks = Array.isArray(parsedData['Important Links'])
    ? parsedData['Important Links'].filter(
        (link): link is LinkItem => Boolean(link?.title && link?.url && isSafeUrl(link.url))
      )
    : [];

  return (
    <section className="w-full max-w-6xl rounded-3xl border border-emerald-500/20 bg-slate-900/90 p-6 shadow-2xl shadow-emerald-950/30 backdrop-blur sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Knowledge Hub</p>
          <h2 className="text-3xl font-semibold text-white">Roadmap & Quick Links</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">
          A clean overview of your learning roadmap and trusted resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {roadmap.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
            <h3 className="mb-4 text-xl font-semibold text-emerald-300">Roadmap</h3>
            <ol className="space-y-3">
              {roadmap.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm leading-6 text-slate-300">
                  <span className="mr-2 font-semibold text-emerald-400">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        )}

        {importantLinks.length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
            <h3 className="mb-4 text-xl font-semibold text-emerald-300">Important Links</h3>
            <div className="grid gap-3">
              {importantLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition duration-200 hover:border-emerald-500 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-950/30"
                >
                  <p className="font-medium text-white transition group-hover:text-emerald-300">{link.title}</p>
                  <p className="mt-1 break-all text-sm text-slate-400 transition group-hover:text-slate-300">{link.url}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
