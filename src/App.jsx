import { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import WhatIDo from './components/WhatIDo/WhatIDo.jsx';
import Work from './components/Work/Work.jsx';
import LifeOutside from './components/LifeOutside/LifeOutside.jsx';
import Contact from './components/Contact/Contact.jsx';
import CaseStudy from './components/CaseStudy/CaseStudy.jsx';
import { projects } from './data/projects.js';
import { hero } from './data/site.js';

const HOME_TITLE = 'Josephine Ama Gyasi · Software Engineer';

// Tiny hash router: "#/work/<slug>" shows a case study, anything else is the home page
// (plain "#section" hashes still work as in-page anchors). Works on any static host.
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const slug = hash.match(/^#\/work\/([\w-]+)/)?.[1];
  const project = slug && projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} · Case study · ${hero.name}`;
      window.scrollTo(0, 0);
    } else {
      document.title = HOME_TITLE;
      // Coming back from a case study to e.g. "#work": scroll to that section once rendered
      const id = hash.slice(1);
      if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView();
    }
  }, [project, hash]);

  return (
    <>
      {!project && (
        <a href="#about" className="skip-link">
          Skip to content
        </a>
      )}
      <Nav onCaseStudy={Boolean(project)} />
      <main id="top">
        {project ? (
          <CaseStudy key={project.slug} project={project} />
        ) : (
          <>
            <Hero />
            <About />
            <WhatIDo />
            <Work />
            <LifeOutside />
            <Contact />
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            © {new Date().getFullYear()} {hero.name}
          </p>
          <a href={project ? '#work' : '#top'}>{project ? '← All work' : 'Back to top ↑'}</a>
        </div>
      </footer>
    </>
  );
}
