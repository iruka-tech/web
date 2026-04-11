interface CreateFlowHeaderProps {
  eyebrow: string;
  title: string;
  summary?: string;
}

export function CreateFlowHeader({ eyebrow, title, summary }: CreateFlowHeaderProps) {
  return (
    <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</p>
        <h1 className="mt-3 font-zen text-3xl sm:text-4xl">{title}</h1>
        {summary ? <p className="mt-3 text-secondary">{summary}</p> : null}
      </div>
    </section>
  );
}
