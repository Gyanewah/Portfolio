// Projects, strongest first. Each becomes a card in "Selected work" and a case-study page at #/work/<slug>.
//
// Case-study structure (same for every project):
//   1. Overview      → `overview` (one string per paragraph)
//   2. What I did    → `did` (bullet list)
//   3. Tech stack    → `techStack` (one line)
//   4. Screenshots   → optional `video`, then `screenshots`. Empty list = a simple "coming soon" slot.
//
// Screenshots are made by `npm run images` (see SCREENSHOTS in scripts/optimize_images.py):
//   public/images/work/<slug>/<name>-<width>.webp
// `src` below is the path WITHOUT the "-<width>.webp" ending; `width`/`height` are the original size.

export const workIntro = {
  eyebrow: 'Selected work',
  title: 'Case studies, not screenshots',
  accent: 'Case studies',
};

const shot = (slug, name, width, height, caption, alt) => ({
  src: `/images/work/${slug}/${name}`,
  widths: width > 900 ? [800, width] : [width],
  width,
  height,
  caption,
  alt,
});

export const projects = [
  {
    slug: 'choir',
    title: 'Choir',
    summary: 'A web app that helps choral singers practise their part.',
    kind: 'Personal project',
    timeline: 'July 2026 – in progress',
    team: 'Solo',
    role: 'Full-stack developer',
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    links: [{ label: 'GitHub repo', href: 'https://github.com/Gyanewah/choir-app' }],
    cover: {
      src: '/images/work/choir',
      widths: [800],
      alt: 'Choir app showing a piano score with each voice’s notes in a different colour',
    },
    overview: [
      'A web app that helps choral singers practise their part. You upload a score (a MusicXML file or a scanned PDF), pick your voice, and hear that line played while its notes light up on the sheet music.',
      'Scanned scores often come out with mistakes, so the app also flags wrong bars and lets you correct them next to the original page.',
    ],
    did: [
      'Score upload (MusicXML, compressed .mxl and scanned PDFs, converted with an open-source music recognition tool)',
      'A library to reopen, rename and delete saved scores',
      'Voice selection that separates soprano, alto, tenor and bass, even when two voices share one stave',
      'Playback of the chosen voice with the notes highlighted as they play, plus pause, looping and support for repeats and 1st/2nd endings',
      'Automatic detection of bars that don’t match their time signature',
      'A bar editor to correct notes and markings beside the original scanned page, without ever overwriting the uploaded file',
      '542 automated tests and CI on every push',
    ],
    techStack:
      'React, TypeScript, Vite, OpenSheetMusicDisplay, Tone.js, NestJS, PostgreSQL, Prisma, Jest, Vitest, GitHub Actions',
    video: null,
    screenshots: [
      shot('choir', 'voices', 1219, 583, 'Each voice shown in its own colour', 'Piano score with soprano, alto, tenor and bass notes coloured differently, and a Hide voices toggle'),
      shot('choir', 'playback', 1195, 580, 'Playback panel: voices, tempo and looping', 'Score with an open playback panel listing soprano, alto, tenor and bass checkboxes, a tempo slider and loop options'),
      shot('choir', 'bar-editor', 1231, 585, 'Bar editor for correcting a scanned score', 'Bar editor beside the score, listing the notes of each voice in the selected bar with controls to change them'),
    ],
  },
  {
    slug: 'miss-library',
    title: 'Miss Library',
    summary: 'A bookshop management web app built with NestJS and React.',
    kind: 'Team project · JUNIA M1',
    timeline: 'November 2025',
    team: '3 (JUNIA M1 project)',
    role: 'Frontend developer',
    stack: ['React', 'NestJS', 'SQLite'],
    links: [],
    cover: {
      src: '/images/work/miss-library',
      widths: [800, 1280, 1920],
      alt: 'Miss Library home page: "Feed your mind" banner over a wall of bookshelves, with Books, Authors and Clients navigation',
    },
    overview: [
      'A bookshop management web app built as a JUNIA M1 team project. Staff can manage books, authors and clients, and record which client bought which book.',
    ],
    did: [
      'Built the book, author and client detail pages, with in-place editing (Edit / Save / Cancel)',
      'Built the book cards, including the number of clients who bought each book',
      'Built the create-book pop-up with form validation and a live cover preview',
      'Built the layouts for the books, authors and clients pages, including their empty states',
      'Built the About page',
      'Added cover and profile images across the app',
      'Added loading states, error messages and fallback images',
    ],
    techStack: 'React, TypeScript, Vite, Ant Design, TanStack Router, axios, NestJS, TypeORM, SQLite',
    video: null,
    screenshots: [
      shot('miss-library', 'home', 1242, 585, 'Home page', 'Miss Library home page with a "Feed your mind" panel over a bookshelf background'),
      shot('miss-library', 'books', 1255, 586, 'Books page with book cards', 'Books page listing book cards with covers, authors, number of buyers, and Edit and Delete buttons'),
      shot('miss-library', 'create-book', 1254, 585, 'Create-book pop-up with validation', 'Create New Book pop-up form with title, author, year published and photo URL fields'),
      shot('miss-library', 'authors', 1240, 589, 'Authors page', 'Authors table with photos, names, number of books written and actions'),
      shot('miss-library', 'author-detail', 1255, 583, 'Author detail page', 'Charles Dickens author page with books written, average sales, author information and an Edit Author button'),
      shot('miss-library', 'clients', 1257, 586, 'Clients page', 'Clients table with names, emails and number of books bought'),
      shot('miss-library', 'about', 1261, 585, 'About page', 'About page with an "About This Project" card over a bookshelf background'),
    ],
  },
  {
    slug: 'contact-app',
    title: 'Contact App',
    summary: 'A JavaFX + SQLite desktop contact manager.',
    kind: 'Team project',
    timeline: 'February 2026',
    team: '4',
    role: 'Forms, detail view & navigation',
    stack: ['Java', 'JavaFX', 'SQLite'],
    links: [],
    cover: {
      src: '/images/work/contact-app',
      widths: [600],
      alt: 'Contact App main window with a table of contacts and Add, View Details, Edit, Refresh and Delete buttons',
    },
    overview: [
      'A desktop contact manager built as a team project. Users can list, add, edit, view and delete contacts, stored in a local SQLite database.',
    ],
    did: [
      'Built the add and edit contact forms',
      'Built the contact detail screen and its controller',
      'Built the app’s navigation, which switches between screens inside one main window',
      'Created PersonContext so the edit and detail screens open with the selected contact (this fixed a bug where the edit form never received it)',
      'Replaced the birth-date text field with a date picker',
      'Moved the tests from JUnit 4 to JUnit 5 with a separate test database, and wrote 3 of the 4 Person tests',
      'Wrote about half of the app’s styling',
    ],
    techStack: 'Java, JavaFX (FXML), SQLite (JDBC), Maven, JUnit 5',
    video: null,
    screenshots: [
      shot('contact-app', 'contact-list', 637, 505, 'Contact list', 'Main window with a table of contacts and Add, View Details, Edit, Refresh and Delete buttons'),
      shot('contact-app', 'add-contact', 639, 505, 'Add contact form with date picker', 'Add New Contact form with name, nickname, phone, address, email and a date-of-birth picker'),
      shot('contact-app', 'edit-contact', 637, 501, 'Edit contact form', 'Edit Contact form pre-filled with a contact’s details'),
      shot('contact-app', 'contact-details', 637, 507, 'Contact detail screen', 'Details screen showing one contact’s information with Back and Edit buttons'),
    ],
  },
];
