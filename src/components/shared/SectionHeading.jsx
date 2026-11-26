// Eyebrow + big headline with one accent-coloured word.
export default function SectionHeading({ id, eyebrow, title, accent, children }) {
  const i = accent ? title.indexOf(accent) : -1;
  return (
    <header className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {i < 0 ? (
          title
        ) : (
          <>
            {title.slice(0, i)}
            <span className="accent-word">{accent}</span>
            {title.slice(i + accent.length)}
          </>
        )}
      </h2>
      {children}
    </header>
  );
}
