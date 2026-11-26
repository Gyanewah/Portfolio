import { useEffect, useRef, useState } from 'react';
import { nav } from '../../data/site.js';
import Icon from '../shared/Icons.jsx';
import useTheme from '../../hooks/useTheme.js';
import './Nav.css';

const ALL = [...nav.links, nav.cta];

// A section becomes active only once its top has reached the nav bar.
// Nothing is active while you're still in the hero.
const ACTIVATE_AT = 120; // px from the top of the screen (just below the nav)

function useActiveSection(enabled) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const sections = ALL.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
      let current = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= ACTIVATE_AT) current = `#${s.id}`;
      }
      // At the very bottom the last section (Contact) may never reach the top: activate it anyway
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = `#${sections[sections.length - 1].id}`;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      setActive(null);
    };
  }, [enabled]);
  return active;
}

export default function Nav({ onCaseStudy }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const active = useActiveSection(!onCaseStudy);
  const [theme, toggleTheme] = useTheme();
  const current = onCaseStudy ? '#work' : active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or a click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => !navRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  const close = () => setOpen(false);
  const linkProps = (l) => ({
    href: l.href,
    onClick: close,
    'aria-current': current === l.href ? 'true' : undefined,
  });

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <nav ref={navRef} className="nav__pill" aria-label="Main">
        <a href="#top" className="nav__brand" onClick={close} aria-label={`${nav.brand.join(' ')}, back to top`}>
          {nav.brand[0]}
          <span className="nav__dot" aria-hidden="true">.</span>
          {nav.brand[1]}
        </a>

        <ul id="nav-menu" className="nav__menu">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a className="nav__link" {...linkProps(l)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav__link nav__cta" {...linkProps(nav.cta)}>
              {nav.cta.label}
            </a>
          </li>
        </ul>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
          </button>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
