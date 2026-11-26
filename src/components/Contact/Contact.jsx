import { useEffect, useRef, useState } from 'react';
import { contact, socials } from '../../data/site.js';
import Icon from '../shared/Icons.jsx';
import './Contact.css';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (await copyText(contact.email)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__card">
          <div className="contact__main">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 id="contact-title" className="contact__headline">
              {contact.headline}
            </h2>
            <p className="contact__text">{contact.text}</p>
            <a className="btn btn--accent contact__cta" href={`mailto:${contact.email}`}>
              <Icon name="mail" size={20} />
              {contact.cta}
              <Icon name="arrowUpRight" size={18} />
            </a>
          </div>

          <div className="contact__side">
            <p className="contact__label">Or email me directly</p>
            <p className="contact__email">{contact.email}</p>
            <button type="button" className={`contact__copy${copied ? ' is-copied' : ''}`} onClick={onCopy}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            <span className="visually-hidden" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>

            <p className="contact__label contact__label--socials">Find me around the web</p>
            <ul className="contact__socials">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="contact__social"
                    aria-label={`${s.label} (opens in a new tab)`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
