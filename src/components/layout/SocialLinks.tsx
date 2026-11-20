import { site } from "@/lib/site";

const icons: Record<keyof typeof site.social, React.ReactNode> = {
  facebook: (
    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1Z" />
  ),
  instagram: (
    <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 7.2c-.1-1.5-.4-2.8-1.5-3.8C18.5 2.4 17.2 2 15.7 2 14.2 2 9.8 2 8.3 2c-1.5.1-2.8.4-3.8 1.4C3.4 4.4 3.1 5.7 3 7.2 3 8.7 3 15.3 3 16.8c.1 1.5.4 2.8 1.5 3.8 1 1 2.3 1.4 3.8 1.4h7.4c1.5-.1 2.8-.4 3.8-1.4 1-1 1.4-2.3 1.5-3.8.1-1.5.1-8.1 0-9.6Zm-2 11.3a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 4.2C7.9 3.7 10.7 3.8 12 3.8s4.1-.1 5.3.4A3 3 0 0 1 19 5.9c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z" />
  ),
  twitter: <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z" />,
  linkedin: (
    <path d="M6.9 21H3V9h3.9v12ZM5 7.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM21 21h-3.9v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9V9h3.7v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21Z" />
  ),
  youtube: (
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z" />
  ),
};

export function SocialLinks({ className = "" }: { className?: string }) {
  const entries = (Object.keys(site.social) as (keyof typeof site.social)[]).filter(
    (key) => site.social[key],
  );
  if (entries.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {entries.map((key) => (
        <a
          key={key}
          href={site.social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={key}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-navy"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            {icons[key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
