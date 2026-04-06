export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
      data-reveal-stagger=""
    >
      {eyebrow ? (
        <p className="eyebrow mb-4" data-reveal-item="">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-title" data-reveal-item="">
        {title}
      </h2>
      {description ? (
        <p className="section-copy mt-6" data-reveal-item="">
          {description}
        </p>
      ) : null}
    </div>
  );
}
