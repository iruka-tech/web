'use client';

export function Footer() {
  return (
    <footer className="relative pb-8 pt-8">
      <div className="page-gutter">
        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-secondary md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Iruka.</p>
          <a
            href="https://iruka.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="ui-link no-underline"
          >
            iruka.tech
          </a>
        </div>
      </div>
    </footer>
  );
}
