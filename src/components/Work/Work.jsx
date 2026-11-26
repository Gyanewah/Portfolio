import { projects, workIntro } from '../../data/projects.js';
import SectionHeading from '../shared/SectionHeading.jsx';
import ResponsiveImage from '../shared/ResponsiveImage.jsx';
import Icon from '../shared/Icons.jsx';
import './Work.css';

export default function Work() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" {...workIntro} />

        <ol className="work__list">
          {projects.map((p, i) => (
            <li key={p.slug} className={`work-card${i === 0 ? ' work-card--featured' : ''}`}>
              <div className="work-card__media">
                {p.cover && (
                  <ResponsiveImage
                    {...p.cover}
                    className="work-card__img"
                    sizes={i === 0 ? '(min-width: 900px) 640px, 100vw' : '(min-width: 900px) 560px, 100vw'}
                    width="1280"
                    height="800"
                  />
                )}
              </div>
              <div className="work-card__body">
                <p className="work-card__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="work-card__kind">
                  {p.kind} · {p.timeline}
                </p>
                <h3 className="work-card__title">
                  {/* Stretched link: whole card is clickable */}
                  <a href={`#/work/${p.slug}`} className="work-card__link">
                    {p.title}
                  </a>
                </h3>
                <p className="work-card__summary">{p.summary}</p>
                {p.stack.length > 0 && (
                  <ul className="tags" aria-label="Tech stack">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                <span className="work-card__cta" aria-hidden="true">
                  Read case study <Icon name="arrowRight" size={18} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
