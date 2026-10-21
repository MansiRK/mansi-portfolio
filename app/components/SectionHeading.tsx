type SectionTitleProps = {
  id: string;
  title: string;
  highlight: string;
};

/** Two-line display title with the short rule underneath, shared by every section */
export function SectionTitle({ id, title, highlight }: SectionTitleProps) {
  return (
    <div>
      <h2
        id={id}
        className="font-display text-[clamp(2rem,1rem+5vw,6rem)] font-extrabold uppercase leading-[0.9] text-title"
      >
        {title}
        <span className="block text-accent">{highlight}</span>
      </h2>
      <span className="mt-6 block h-0.5 w-10 bg-rule" />
    </div>
  );
}

type SectionHeadingProps = SectionTitleProps & {
  description: string;
  /** Optional artwork shown above the description on large screens */
  decoration?: React.ReactNode;
};

/** Section title on the left with a short description on the right */
export default function SectionHeading({ id, title, highlight, description, decoration }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <SectionTitle id={id} title={title} highlight={highlight} />

      <div className="max-w-sm lg:pb-6">
        {decoration && <div className="mb-8 hidden lg:block">{decoration}</div>}
        <p className="text-sm leading-relaxed text-text sm:text-base">{description}</p>
      </div>
    </div>
  );
}
