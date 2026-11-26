import { skills, skillsIntro } from '../../data/skills.js';
import SectionHeading from '../shared/SectionHeading.jsx';
import Icon from '../shared/Icons.jsx';
import useInView from '../../hooks/useInView.js';
import './WhatIDo.css';

// Diagram coordinate system (desktop). Badge centres per item count.
const W = 1000;
const H = 620;
// Labels sit under each badge, so no badge is placed directly above the node (its line would cross the label).
const NODE = { x: 500, y: 250 };
const LAYOUTS = {
  4: [[130, 90], [870, 90], [130, 430], [870, 430]],
  5: [[130, 90], [870, 90], [130, 430], [870, 430], [500, 510]],
  6: [[130, 70], [870, 70], [130, 400], [870, 400], [330, 520], [670, 520]],
};

// Curve: leaves the node vertically, arrives at the badge horizontally.
const curve = ([x, y]) =>
  `M${NODE.x} ${NODE.y} C ${NODE.x} ${NODE.y + (y - NODE.y) * 0.85}, ${x + (NODE.x - x) * 0.55} ${y}, ${x} ${y}`;

export default function WhatIDo() {
  const [ref, inView] = useInView(0.3);
  const points = LAYOUTS[skills.length] ?? LAYOUTS[5];

  return (
    <section id="what-i-do" className="section section--alt skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" {...skillsIntro} />

        <div
          ref={ref}
          className={`skills__map${inView ? ' is-in' : ''}`}
          style={{ '--node-x': (NODE.x / W) * 100, '--node-y': (NODE.y / H) * 100 }}
        >
          <svg className="skills__lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
            {points.slice(0, skills.length).map((p, i) => (
              <path key={i} d={curve(p)} pathLength="1" style={{ '--i': i }} />
            ))}
          </svg>

          <div className="skills__node" aria-hidden="true">
            <span className="skills__node-core" />
          </div>

          <ul className="skills__list">
            {skills.map((s, i) => {
              const [x, y] = points[i] ?? [0, 0];
              return (
                <li key={s.title} className="skill" style={{ '--x': (x / W) * 100, '--y': (y / H) * 100, '--i': i }}>
                  <span className="skill__badge">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <div className="skill__body">
                    <h3 className="skill__title">{s.title}</h3>
                    <p className="skill__tools">{s.tools.join(' · ')}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
