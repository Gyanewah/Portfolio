// "Life outside the screen" photos.
//
// To add a photo:
//   1. Put the original in /images.
//   2. Add a line to GALLERY in scripts/optimize_images.py (source, name, focus point).
//   3. Run `npm run images`  →  files appear in public/images/life/
//   4. Add an entry below with the same name.
//        portrait photos  → shape: 'portrait',  widths: [360, 720]  (4:5 card, e.g. 720×900)
//        landscape photos → shape: 'landscape', widths: [480, 960]  (4:3 card, e.g. 960×720)
//      (If the original is small, the script may only make the first width – list only what exists.)
//
// Rows alternate: items 1,3,5… go in the top row, 2,4,6… in the bottom row.
// `caption` is optional: leave it out for no label.

export const galleryIntro = {
  eyebrow: 'Off the keyboard',
  title: 'Life outside the screen',
  accent: 'outside',
};

const P = [360, 720];
const L = [480, 960];

export const gallery = [
  { src: '/images/life/louvre', shape: 'portrait', widths: P, caption: 'Paris', alt: 'Standing in front of the Louvre pyramid in Paris on a clear day' },
  { src: '/images/life/coe-awards', shape: 'landscape', widths: L, caption: "COE Awards '25", alt: 'Posing with an award in front of the 12th COE Awards & Alumni backdrop' },
  { src: '/images/life/cadet-friends', shape: 'landscape', widths: L, alt: 'Cadets in navy blazers and scarves smiling and making peace signs with a friend' },
  { src: '/images/life/tweek-2024', shape: 'portrait', widths: P, caption: 'TWEEK 2024', alt: 'Standing in front of the KNUST Technology Week TWEEK 2024 banner' },
  { src: '/images/life/singing', shape: 'portrait', widths: [360], caption: 'Choir', alt: 'Singing with the choir in maroon robes' },
  { src: '/images/life/on-camera', shape: 'landscape', widths: L, alt: 'Smiling in a blue polka-dot top beside a phone on a tripod' },
  { src: '/images/life/award-handshake', shape: 'landscape', widths: L, caption: 'COE Awards', alt: 'Receiving an award on stage at the College of Engineering Awards & Career Fair' },
  { src: '/images/life/eiffel-tower', shape: 'portrait', widths: P, caption: 'Paris', alt: 'Looking out across the Seine towards the Eiffel Tower' },
  { src: '/images/life/cadet-parade', shape: 'portrait', widths: P, caption: 'Cadets', alt: 'Marching in cadet uniform during a parade' },
  { src: '/images/life/group-smiles', shape: 'landscape', widths: L, alt: 'A group of young women in matching blue dresses smiling' },
  { src: '/images/life/outreach', shape: 'landscape', widths: L, alt: 'A large group of children posing together outdoors' },
  { src: '/images/life/organ', shape: 'portrait', widths: P, caption: 'On the keys', alt: 'Playing keyboard on stage during a concert' },
  { src: '/images/life/big-smile', shape: 'portrait', widths: P, alt: 'Smiling outdoors in a maroon robe beside a car' },
  { src: '/images/life/day-out', shape: 'landscape', widths: [480], alt: 'Smiling in a floral dress in front of an animal enclosure' },
  { src: '/images/life/stage-group', shape: 'landscape', widths: L, alt: 'A group in matching outfits posing on a stage' },
  { src: '/images/life/speaking', shape: 'portrait', widths: P, caption: 'Speaking', alt: 'Speaking into a microphone at a glass lectern' },
  { src: '/images/life/tech-week-team', shape: 'portrait', widths: P, caption: 'Tech Week', alt: 'With three friends in front of the TWEEK sponsor wall' },
  { src: '/images/life/workshop', shape: 'landscape', widths: L, alt: 'Young women in white shirts and lanyards at a round-table workshop' },
  { src: '/images/life/cadet-certificate', shape: 'landscape', widths: [480], caption: 'Cadets', alt: 'A cadet receiving a certificate from a man in a yellow shirt' },
  { src: '/images/life/presenting', shape: 'portrait', widths: P, caption: 'Presenting', alt: 'Presenting to a class in front of a projected slide' },
  { src: '/images/life/formal-event', shape: 'portrait', widths: P, alt: 'Two women in formal suits posing in a hotel hall' },
  { src: '/images/life/round-table', shape: 'landscape', widths: L, alt: 'Participants in white jackets in discussion around a table' },
  { src: '/images/life/lakeside', shape: 'landscape', widths: L, alt: 'A quiet pond surrounded by trees' },
  { src: '/images/life/night-friends', shape: 'portrait', widths: P, alt: 'Two friends in yellow scarves and a hi-vis vest hugging at night' },
  { src: '/images/life/on-stage', shape: 'portrait', widths: [360], alt: 'Speaking at a podium on stage in a red dress' },
  { src: '/images/life/audience', shape: 'landscape', widths: L, alt: 'An audience seated in blue auditorium chairs' },
  { src: '/images/life/team-suits', shape: 'portrait', widths: P, alt: 'A team in dark suits posing in a hotel hall' },
  { src: '/images/life/reading', shape: 'portrait', widths: P, caption: 'Reading', alt: 'A copy of David Copperfield on a shelf beside a plant' },
];
