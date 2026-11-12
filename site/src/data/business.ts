// Single source of truth for business details.
// Footer, contact page, CTAs and structured data all read from here.
// TODO markers = waiting on the client (see CLIENT-REVIEW.md).

export const business = {
  name: 'GP Site Services',
  legalName: 'GP Site Services', // TODO: Ltd name if incorporated
  url: 'https://www.example.co.uk', // TODO: real domain
  phone: '07000 000000', // TODO
  phoneE164: '+447000000000', // TODO: same number, international format, used for tel: links
  whatsapp: '447000000000', // TODO: digits only, used for wa.me links
  email: 'hello@example.co.uk', // TODO
  baseTown: 'West Yorkshire', // TODO: base town once confirmed
  region: 'West Yorkshire',
  areasServed: ['Leeds', 'Bradford', 'Wakefield', 'Huddersfield', 'Halifax'],
  hours: [
    // TODO: confirm with client
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '17:30' },
    { days: ['Saturday'], opens: '08:00', closes: '13:00' },
  ],
  social: {
    facebook: 'https://www.facebook.com/share/1FvrdtJ2jS/?mibextid=wwXIfr',
    instagram: '', // TODO
  },
  googleReviewUrl: '', // TODO: g.page/r/... link once the Business Profile exists
  quoteFormAction: '', // TODO: form endpoint (Netlify Forms, Formspree, Web3Forms...) once hosting is chosen

  // Sections below stay hidden on the site until they have real content.
  trust: [] as { value: string; label: string }[], // e.g. { value: '12 years', label: 'trading in West Yorkshire' }
  accreditations: [] as { name: string; meaning: string }[], // e.g. CHAS, NPTC units, insurance cover
  promises: [] as string[], // e.g. 'We clear up and take the waste away'
  team: null as null | { photo: string; caption: string; story: string }, // photo in src/assets/team/
} as const;

export type Audience = 'residential' | 'commercial';

export const services = [
  {
    slug: 'tree-surgery',
    path: '/tree-surgery/',
    label: 'Tree surgery',
    audience: 'residential',
    title: 'Tree surgery',
    intro:
      'Trees that have outgrown the garden, branches over the road or a neighbour, trees blocking the light. We prune, reduce, lift and fell, and we check whether a tree is protected before we start.',
    includes: ['Crown reductions and thinning', 'Crown lifting over roads, paths and drives', 'Felling and sectional dismantling', 'Fruit tree and ornamental pruning', 'Ivy, climber and hedge cutting'],
    faqs: [
      {
        q: 'Do I need permission to work on my tree?',
        a: 'Only if it has a Tree Preservation Order or stands in a conservation area. Then the council has to agree the work first. We check before quoting, and our guide shows how to check in each West Yorkshire council.',
      },
      {
        q: 'Can you work on trees during bird nesting season?',
        a: 'Yes, with care. It is an offence to damage or destroy an active nest, so during the main nesting season, roughly February to August, we check for nests before cutting and hold off if we find one in use.',
      },
      {
        q: "Can I cut back branches overhanging from a neighbour's tree?",
        a: "You can usually cut overhanging branches back to the boundary line, but not beyond it, and the cuttings belong to the tree's owner. If the tree is protected you still need council consent.",
      },
    ],
  },
  {
    slug: 'garden-fencing',
    path: '/garden-fencing/',
    label: 'Garden fencing',
    audience: 'residential',
    title: 'Garden fencing and gates',
    intro:
      'Blown-down panels, rotten posts, a whole garden boundary that needs doing. We take out the old fence and put in closeboard, panel or vertical board fencing and gates built to last.',
    includes: ['Closeboard and featheredge fencing', 'Panel and vertical board fencing', 'Ledged and braced timber gates', 'Old fence removal', 'Back yard and garden refurbishments'],
    faqs: [
      {
        q: 'How high can a garden fence be without planning permission?',
        a: 'Up to 2 metres in most back gardens, and up to 1 metre where it is next to a road used by vehicles. Listed buildings and some conservation areas have tighter rules.',
      },
      {
        q: 'Which side of the fence should face my neighbour?',
        a: 'There is no law on it, but the usual convention is that the smooth side faces outwards and the posts and rails sit on the owner’s side.',
      },
      {
        q: 'How do I know which boundary fence is mine?',
        a: 'Your title plan or deeds sometimes mark it, often with a T on the boundary line. If they don’t, it is worth agreeing it with your neighbour before replacing the fence.',
      },
    ],
  },
  {
    slug: 'tree-protection-fencing',
    path: '/commercial/tree-protection-fencing/',
    label: 'Tree protection fencing',
    audience: 'commercial',
    title: 'Tree protection fencing to BS 5837',
    intro:
      'Tree protection fencing installed to your tree protection plan and arboricultural method statement, before the machines arrive. Because we also do tree work, the same team can carry out agreed pruning and take the fencing down at the end.',
    includes: ['Fencing set out to the tree protection plan', 'Welded mesh panels on a braced scaffold framework', 'Ground protection where access crosses a root protection area', 'Signage on every run', 'Removal once the consultant or council agree'],
    faqs: [
      {
        q: 'What does BS 5837 tree protection fencing look like?',
        a: 'The default specification in BS 5837:2012 is welded mesh panels, typically 2 metres high, fixed to a scaffold framework braced so the fence can’t be pushed into the protected area. Your arboricultural consultant may specify an alternative.',
      },
      {
        q: 'When can tree protection fencing be taken down?',
        a: 'Only when your planning condition or arboricultural method statement allows, usually at the end of construction and with sign-off from the project arboriculturist or the council.',
      },
      {
        q: 'Can work happen inside a root protection area?',
        a: 'Only where the method statement allows it, usually with ground protection and supervision. Our root protection area calculator shows how the area is worked out.',
      },
    ],
  },
  {
    slug: 'site-hoarding',
    path: '/commercial/site-hoarding/',
    label: 'Site hoarding',
    audience: 'commercial',
    title: 'Corrugated steel site hoarding',
    intro:
      'Corrugated steel hoarding to secure the site, screen the work and keep the public out, with pedestrian and vehicle gates where you need them.',
    includes: ['In-ground corrugated steel hoarding', 'Free-standing hoarding on blocks or feet', 'Pedestrian and vehicle gates', 'Temporary mesh fencing', 'Removal at the end of the job'],
    faqs: [
      {
        q: 'Do I need a licence for site hoarding?',
        a: 'If the hoarding stands on the public highway, including the pavement, you will usually need a hoarding licence from the council as highway authority. Hoarding entirely within your own site boundary normally doesn’t.',
      },
      {
        q: 'In-ground or free-standing hoarding?',
        a: 'In-ground hoarding is set into the ground, so it is stronger and better for long jobs and exposed sites. Free-standing hoarding sits on blocks or feet, so it suits hard surfaces and shorter jobs.',
      },
    ],
  },
  {
    slug: 'site-clearance',
    path: '/commercial/site-clearance/',
    label: 'Site clearance',
    audience: 'commercial',
    title: 'Site and plot clearance',
    intro:
      'Overgrown plots, development sites and roadside boundaries cleared of vegetation, scrub and rubble, with machinery where it helps. Trees being kept are fenced off first.',
    includes: ['Vegetation and scrub clearance', 'Clearance with mini diggers', 'Clearing around retained trees', 'Roadside and boundary clearance', 'New boundary fencing once cleared'],
    faqs: [
      {
        q: 'Do I need an ecology check before clearing a site?',
        a: 'Often, yes. Nesting birds are protected, and some sites need a check for other protected species before clearance. If your planning conditions require an ecologist, we work to their findings.',
      },
      {
        q: 'Can you clear around trees that are being kept?',
        a: 'Yes. We put tree protection fencing in first, then clear outside it, so the trees and their roots aren’t damaged.',
      },
    ],
  },
] as const;

export type ServiceSlug = (typeof services)[number]['slug'];
export const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const whatsappLink = (text = `Hi ${business.name}, I'd like a quote.`) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
