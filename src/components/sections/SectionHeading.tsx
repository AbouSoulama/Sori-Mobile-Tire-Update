export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${centered ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2
        className={`text-4xl leading-[1] font-extrabold uppercase md:text-5xl ${
          tone === "dark" ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            tone === "dark" ? "text-white/70" : "text-slate-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
