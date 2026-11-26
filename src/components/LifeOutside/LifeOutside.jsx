import { gallery, galleryIntro } from '../../data/gallery.js';
import SectionHeading from '../shared/SectionHeading.jsx';
import ResponsiveImage from '../shared/ResponsiveImage.jsx';
import './LifeOutside.css';

const MIN_PER_ROW = 8; // repeat items so one set is always wider than the screen
const SECONDS_PER_CARD = 6; // speed: higher = slower

function fill(items) {
  if (!items.length) return items;
  const out = [...items];
  while (out.length < MIN_PER_ROW) out.push(...items);
  return out;
}

function Card({ item, decorative }) {
  const landscape = item.shape === 'landscape';
  return (
    <li className={`life__card${landscape ? ' life__card--landscape' : ''}`}>
      <figure>
        {item.src ? (
          <ResponsiveImage
            src={item.src}
            widths={item.widths}
            alt={decorative ? '' : item.alt}
            sizes={landscape ? '440px' : '264px'}
            className="life__img"
            width={landscape ? 480 : 360}
            height={landscape ? 360 : 450}
          />
        ) : (
          <div className="life__img life__img--empty" aria-hidden="true" />
        )}
        {item.caption && <figcaption className="life__caption">{item.caption}</figcaption>}
      </figure>
    </li>
  );
}

function Row({ items, reverse, label }) {
  const set = fill(items);
  const duration = set.length * SECONDS_PER_CARD * (reverse ? 1.2 : 1);
  return (
    <div
      className={`life__row${reverse ? ' life__row--reverse' : ''}`}
      role="region"
      aria-label={label}
      tabIndex={0}
      style={{ '--dur': `${duration}s` }}
    >
      <div className="life__track">
        <ul className="life__set">
          {set.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </ul>
        {/* Exact duplicate for a seamless loop; hidden from screen readers */}
        <ul className="life__set life__set--clone" aria-hidden="true">
          {set.map((item, i) => (
            <Card key={i} item={item} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function LifeOutside() {
  const rowA = gallery.filter((_, i) => i % 2 === 0);
  const rowB = gallery.filter((_, i) => i % 2 === 1);

  return (
    <section id="life" className="section section--alt life" aria-labelledby="life-title">
      <div className="container">
        <SectionHeading id="life-title" {...galleryIntro} />
      </div>
      <div className="life__rows">
        <Row items={rowA} label="Photos, row 1" />
        <Row items={rowB} label="Photos, row 2" reverse />
      </div>
    </section>
  );
}
