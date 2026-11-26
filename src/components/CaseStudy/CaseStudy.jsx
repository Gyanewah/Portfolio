import { projects } from '../../data/projects.js';
import ResponsiveImage from '../shared/ResponsiveImage.jsx';
import Icon from '../shared/Icons.jsx';
import './CaseStudy.css';

function Section({ n, id, title, children }) {
  return (
    <section className="case__section" aria-labelledby={id}>
      <h2 id={id} className="case__h2">
        <span className="case__h2-num" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="case__content">{children}</div>
    </section>
  );
}

export default function CaseStudy({ project }) {
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const hasMedia = project.video || project.screenshots.length > 0;

  const meta = [
    ['Timeline', project.timeline],
    ['Team', project.team],
    ['My role', project.role],
    ['Stack', project.stack.join(', ')],
  ];

  return (
    <article className="case" aria-labelledby="case-title">
      <header className="case__header">
        <div className="container">
          <a href="#work" className="case__back">
            <Icon name="arrowLeft" size={18} /> All work
          </a>
          <p className="eyebrow">
            Case study {String(idx + 1).padStart(2, '0')} · {project.kind}
          </p>
          <h1 id="case-title" className="case__title">
            {project.title}
          </h1>

          <dl className="case__meta">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {project.links.length > 0 && (
            <p className="case__links">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} className="btn btn--accent" target="_blank" rel="noreferrer">
                  {l.label} <Icon name="arrowUpRight" size={18} />
                </a>
              ))}
            </p>
          )}
        </div>
      </header>

      <div className="container">
        <div className="case__body">
        <Section n={1} id="cs-overview" title="Overview">
          {project.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Section>

        <Section n={2} id="cs-did" title="What I did">
          <ul className="case__list">
            {project.did.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>

        <Section n={3} id="cs-stack" title="Tech stack">
          <p>{project.techStack}</p>
        </Section>
        </div>
      </div>

      <section className="container case__media" aria-labelledby="cs-shots">
        <h2 id="cs-shots" className="case__h2">
          <span className="case__h2-num" aria-hidden="true">
            04
          </span>
          Screenshots
        </h2>

        {!hasMedia && <p className="case__empty">Screenshots coming soon.</p>}

        {project.video && (
          <figure className="case__video">
            <video
              controls
              preload="none"
              playsInline
              poster={project.video.poster}
              width={project.video.width}
              height={project.video.height}
            >
              <source src={project.video.src} type="video/mp4" />
            </video>
            <figcaption>{project.video.caption}</figcaption>
          </figure>
        )}

        {project.screenshots.length > 0 && (
          <ul className="case__shots">
            {project.screenshots.map((s) => (
              <li key={s.src}>
                <figure>
                  {/* Click to open the full-size image */}
                  <a href={`${s.src}-${s.widths[s.widths.length - 1]}.webp`} target="_blank" rel="noreferrer" className="case__shot-link">
                    <ResponsiveImage
                      src={s.src}
                      widths={s.widths}
                      alt={s.alt}
                      sizes="(min-width: 900px) 560px, 100vw"
                      width={s.width}
                      height={s.height}
                      className="case__shot"
                    />
                    <span className="visually-hidden"> (opens full size in a new tab)</span>
                  </a>
                  <figcaption>{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="case__next">
        <div className="container">
          <p className="eyebrow">Next case study</p>
          <a href={`#/work/${next.slug}`} className="case__next-link">
            {next.title} <Icon name="arrowRight" size={28} />
          </a>
        </div>
      </footer>
    </article>
  );
}
