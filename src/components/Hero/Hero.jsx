import { useEffect, useRef, useState } from 'react';
import { hero } from '../../data/site.js';
import './Hero.css';

// Keep in sync with the preload `imagesizes` in index.html.
const SIZES = '(min-width: 900px) 62vw, 85vh';
const srcSet = (ext) => hero.photo.widths.map((w) => `${hero.photo.base}-${w}.${ext} ${w}w`).join(', ');

// Spotlight only where there's a real hover pointer and motion is OK.
const INTERACTIVE_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

function Photo({ className, alt, hidden }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={SIZES} />
      <img
        className={className}
        src={`${hero.photo.base}-1280.webp`}
        srcSet={srcSet('webp')}
        sizes={SIZES}
        alt={alt}
        aria-hidden={hidden || undefined}
        fetchPriority="high"
        draggable="false"
      />
    </picture>
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const interactive = useMediaQuery(INTERACTIVE_QUERY);

  useEffect(() => {
    if (!interactive) return;
    const section = sectionRef.current;
    const media = mediaRef.current;

    let x = 0, y = 0, tx = 0, ty = 0; // current / target spotlight position (px, relative to media box)
    let lit = 0, tLit = 0;            // current / target spotlight opacity
    let raf = 0, last = 0;

    const apply = () => {
      media.style.setProperty('--x', `${x.toFixed(1)}px`);
      media.style.setProperty('--y', `${y.toFixed(1)}px`);
      media.style.setProperty('--lit', lit.toFixed(3));
    };

    const tick = (now) => {
      const dt = Math.min(now - (last || now), 64);
      last = now;
      // Frame-rate independent lerp
      const kPos = 1 - Math.pow(1 - 0.14, dt / 16.67);
      const kLit = 1 - Math.pow(1 - 0.07, dt / 16.67);
      x += (tx - x) * kPos;
      y += (ty - y) * kPos;
      lit += (tLit - lit) * kLit;
      apply();
      const settled = Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3 && Math.abs(tLit - lit) < 0.003;
      if (settled) {
        lit = tLit;
        apply();
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = media.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (lit < 0.02) {
        // Entering from dark: appear under the cursor instead of sliding in from elsewhere
        x = tx;
        y = ty;
      }
      tLit = 1;
      start();
    };
    const onLeave = () => {
      tLit = 0;
      start();
    };

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      media.style.removeProperty('--x');
      media.style.removeProperty('--y');
      media.style.removeProperty('--lit');
    };
  }, [interactive]);

  return (
    <section
      ref={sectionRef}
      className={`hero${interactive ? ' hero--interactive' : ''}`}
      aria-labelledby="hero-name"
    >
      <div ref={mediaRef} className="hero__media">
        <Photo className="hero__img hero__img--dark" alt={hero.photo.alt} />
        <Photo className="hero__img hero__img--lit" alt="" hidden />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-name" className="hero__name">
          {hero.name}
        </h1>
        <p className="hero__title">
          {hero.title[0]}
          <span className="hero__title-sep" aria-hidden="true"> / </span>
          <span className="visually-hidden">, </span>
          {hero.title[1]}
        </p>
        <p className="hero__sub">{hero.subline}</p>
        <div className="hero__ctas">
          {hero.ctas.map((c) => (
            <a key={c.href} href={c.href} className={`btn hero__btn hero__btn--${c.variant}`}>
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
