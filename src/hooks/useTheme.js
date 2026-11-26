import { useEffect, useState } from 'react';

// Light/dark theme. The initial value is set by the inline script in index.html.
// A click saves the choice; until then the site follows the OS setting (and live changes to it).
export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: still switch, just don't remember */
    }
    setTheme(next);
  };

  return [theme, toggle];
}
