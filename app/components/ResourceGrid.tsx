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
    <section id="resources" className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_70px_-24px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Knowledge Hub</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Roadmap & trusted resources</h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          A clear path to follow, paired with practical links to keep your learning organized and efficient.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {roadmap.length > 0 && (
          <div id="roadmap" className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Roadmap</h3>
                <p className="text-sm text-slate-500">Step-by-step progress you can follow</p>
              </div>
            </div>

            <ol className="space-y-3">
              {roadmap.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 shadow-sm"
                >
                  <span className="mr-2 font-semibold text-emerald-600">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        )}

        {importantLinks.length > 0 && (
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                🔗
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Important Links</h3>
                <p className="text-sm text-slate-500">High-value resources worth bookmarking</p>
              </div>
            </div>

            <div className="grid gap-3">
              {importantLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900 transition group-hover:text-emerald-700">{link.title}</p>
                  <p className="mt-1 break-all text-sm text-slate-500 transition group-hover:text-slate-700">{link.url}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
