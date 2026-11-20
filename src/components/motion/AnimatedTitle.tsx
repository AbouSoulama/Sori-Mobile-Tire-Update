/** Word-by-word rise on mount — pure CSS so it works before hydration. */
export function AnimatedTitle({
  text,
  className = "",
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <span
            className="inline-block animate-rise will-change-transform"
            style={{ animationDelay: `${90 + i * 75}ms` }}
            aria-hidden
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
