interface CreateFlowHeaderProps {
  eyebrow: string;
  title: string;
  summary?: string;
}

export function CreateFlowHeader({ eyebrow, title, summary }: CreateFlowHeaderProps) {
  return (
    <section className="ui-hero px-6 py-7 sm:px-8 sm:py-9">
      <div className="relative z-10 max-w-3xl">
        <div className="ui-kicker">{eyebrow}</div>
        <h1 className="ui-page-title mt-4">{title}</h1>
        {summary ? <p className="ui-copy mt-4">{summary}</p> : null}
      </div>
    </section>
  );
}
