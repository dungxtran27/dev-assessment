type HeaderProps = {
  healthStatus: string;
};

export function Header({ healthStatus }: HeaderProps) {
  const statusClass =
    healthStatus === "online"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : healthStatus === "offline"
        ? "bg-rose-100 text-rose-800 border-rose-200"
        : "bg-amber-100 text-amber-800 border-amber-200";

  return (
    <header className="card relative overflow-hidden">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-200/50 blur-2xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            API Assessment Toolkit
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Teacher Admin Portal
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Test all 4 endpoints directly from this dashboard.
          </p>
        </div>
        <span
          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold capitalize ${statusClass}`}
        >
          Backend: {healthStatus}
        </span>
      </div>
    </header>
  );
}
