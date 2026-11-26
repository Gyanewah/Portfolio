import { about } from '../../data/site.js';
import SectionHeading from '../shared/SectionHeading.jsx';
import ResponsiveImage from '../shared/ResponsiveImage.jsx';
import './About.css';

export default function About() {
  const { image } = about;
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__visual">
          <figure className="about__frame">
            <ResponsiveImage
              {...image}
              className="about__img"
              sizes="(min-width: 900px) 440px, 360px"
              width="800"
              height="1000"
            />
          </figure>
          <p className="about__status">
            <span className="about__dot" aria-hidden="true" />
            {about.status}
          </p>
        </div>

        <div className="about__text">
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} accent={about.accent} />
          {about.paragraphs.map((p) => (
            <p key={p} className="about__p">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
