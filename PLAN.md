# GP Site Services: Website Plan

Status: draft v1 (5 Nov 2026). Service area: West Yorkshire (base town still to be confirmed). Local findings are in [RESEARCH-west-yorkshire.md](RESEARCH-west-yorkshire.md), which takes priority over the general findings below where they differ.

---

## 1. What the research found

### Two different buyers
GP's services split into two audiences who search differently and need different proof:

| | Commercial | Residential |
|---|---|---|
| Services | BS 5837 tree protection fencing, corrugated steel site hoarding, site clearance, tree work on development sites | Tree surgery, garden fence replacement and refurbs, timber fencing, garden tidy-ups |
| Who buys | Main contractors, developers, site managers, arboricultural consultants | Homeowners, landlords |
| What they want to see | Compliance with the arboricultural method statement / tree protection plan, speed of mobilisation, insurance, accreditations (CHAS, Constructionline), past sites | Before/after photos, reviews, a price idea, tidy workers, a fast reply |
| How they get in touch | Phone, email, a request for a quote against a drawing | WhatsApp a photo, call, short form |

The site should serve both without blurring them: a shared home page, then two clear paths ("For homeowners" / "For contractors & developers").

### Competitor landscape
- **Large commercial fencing firms** (e.g. Four Seasons Fencing, SafeSite Facilities, Rethync) have broad service lists, location pages and a wall of accreditation logos. They look corporate and impersonal.
- **Local tree surgeons and fencers** are mostly Checkatrade/MyJobQuote listings or basic template sites. Few combine tree work and fencing, and those that do (e.g. GB Fencing and Tree Surgery, Foremost Tree Surgeons) rely on directory profiles for their proof.
- **Common weaknesses seen** (Four Seasons reviewed in detail):
  - Reviews hidden behind a "Testimonials" link instead of shown on key pages
  - No WhatsApp or quick quote form
  - Project entries with a thumbnail and little else
  - Dozens of near-identical location pages (thin content)
  - Overlapping navigation
  - Accreditation logos with no explanation
  - A blog with no useful guides

**The gap GP can own:** a local firm doing *both* trees and fencing for *both* audiences, with the strongest photo proof in the area, reviews on every page, one-tap contact, and genuinely useful guides and calculators that rank and get cited by AI search.

### Where to compete
- **Commercial:** a specialist niche with little competition. Tree protection fencing is needed on any planning permission with retained trees, and site managers search for it urgently. A Root Protection Area calculator and a plain-English BS 5837 guide would be rare assets in this space.
- **Residential:** "tree surgeon [town]" and "fencing [town]" are competitive. Winning them depends on the Google Business Profile (map pack) plus reviews, so the website mostly supports the GBP.

### AI search (LLM) findings
Current guidance agrees on these (mostly agency sources, so treat as good practice rather than proven):
- Allow AI crawlers in robots.txt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended
- Specific, checkable claims (numbers, ranges, timeframes) beat vague marketing copy
- Structured data (LocalBusiness, Service, FAQPage, Article) that matches what is visible on the page
- A consistent business entity: the same name, phone and area on the site, GBP, Facebook, Instagram and directories
- Third-party mentions (directories, suppliers, local press)
- Each engine recommends differently, so test ChatGPT, Gemini/AI Overviews and Perplexity separately

---

## 2. Site structure

```
/                               Home
/tree-surgery/                  Residential tree services
/garden-fencing/                Timber fencing, refurbs, gates
/commercial/                    Commercial hub (contractors & developers)
  /commercial/tree-protection-fencing/
  /commercial/site-hoarding/
  /commercial/site-clearance/
/projects/                      Before/after gallery, filterable by service
  /projects/[slug]/             One page per job
/reviews/                       All reviews + "leave a review" link
/guides/                        Guide and calculator hub
  /guides/[slug]/
/areas/[town]/                  Only for towns with real jobs (see §6)
/about/                         Team, tickets/qualifications, insurance
/contact/                       Form, phone, WhatsApp, service area map
/privacy/
```

### Every page carries
- Sticky mobile bar: **Call** · **WhatsApp** · **Get a quote**
- Review strip (rating + 2–3 short quotes) near the top
- Relevant before/after projects pulled automatically by service tag
- One clear primary call to action

---

## 3. Recommended stack

| Part | Choice | Why |
|---|---|---|
| Framework | **Astro** (static output) | Very fast pages by default (good for Core Web Vitals), content collections for projects/guides/reviews, built-in image optimisation, ships no JavaScript unless a component needs it |
| Content | Markdown/MDX in content collections with schemas | Every guide and project is checked against a schema at build time, so missing fields fail the build instead of going live |
| Styling | CSS custom properties (design tokens) + Tailwind, or plain scoped CSS | One source of colours, type scale and spacing across every page |
| Hosting | Cloudflare Pages or Netlify | Free tier, global CDN, preview deploys for each change |
| Forms | Netlify Forms, Formspree, or a Cloudflare Worker → email | Includes photo upload for quote requests |
| Optional client editing | Keystatic or Decap CMS (git-based) | Lets GP add a project from a browser later without touching code. Recommend deferring until they ask for it, since they will most likely WhatsApp you photos |

A page builder (WordPress, Wix) is the alternative if the client must self-edit from day one. It costs speed and consistency, which are the two things this plan relies on.

---

## 4. Build in from the start (long-term maintainability)

These are cheap at the start and expensive to retrofit.

1. **One business-info file** (`src/data/business.ts`): name, phone, WhatsApp number, email, service area, opening hours, social links, accreditations. The footer, contact page, schema markup and calls to action all read from it, so a phone number change is one edit.
2. **Content collections with schemas:**
   - `projects`: title, date, services[], town, before/after image pairs, summary, client quote (optional), featured flag
   - `guides`: title, description, answer summary, category, related services, updated date, reviewer, FAQs[]
   - `reviews`: author, rating, text, date, source (Google/Facebook), service, project link (optional)
   - `areas`: town, intro, linked projects (required, at least 1)
3. **Guide template + component kit** so every guide looks the same however many are added:
   `<AnswerBox>` (the 40–60 word direct answer at the top), `<KeyFacts>`, `<Steps>`, `<Callout type="tip|warning|law">`, `<WorkedExample>`, `<Calculator>`, `<FAQ>` (also outputs FAQPage schema), `<RelatedProjects>`, `<GuideCTA>`
4. **Design tokens** for colour, type, spacing and radius, plus a hidden `/styleguide/` page that shows every component, used for visual checks after changes.
5. **Photo pipeline script:** drop the client's raw photos into a folder and it:
   - **strips EXIF/GPS data** (essential: phone photos of residential jobs can reveal customers' home addresses)
   - renames to `[service]-[town]-[before|after]-n.jpg` for image SEO
   - resizes and creates AVIF/WebP via Astro's image pipeline
   - creates a stub project entry to fill in
6. **Automatic structured data** generated from the content: LocalBusiness on every page, Service on service pages, Article + FAQPage on guides, BreadcrumbList everywhere, ImageObject on projects.
7. **Analytics events from day one:** `click_call`, `click_whatsapp`, `submit_quote`, `click_review`, `use_calculator`. The goal is site clicks, so this is how success gets measured.
8. **Redirects file** and a checked `sitemap.xml` / `robots.txt` (with the AI crawlers allowed).
9. **Build checks:** schema validation, broken-link check, image alt text required, Lighthouse budget in CI if desired.

---

## 5. Before/after photos (the core content)

- **Project pages, not just a gallery.** Each job gets its own page: the problem, what was done, how long it took, location (town only), drag-slider before/after, 3–6 photos. These pages rank for long-tail searches ("close board fence replacement [town]") and give AI search specific facts to cite.
- **Gallery** at `/projects/` filterable by Tree surgery / Garden fencing / Tree protection / Hoarding.
- **Auto-placement:** service pages and area pages pull the latest matching projects, so adding one project updates several pages.
- **Social loop:** each project page is shareable with a good preview image (Open Graph), and Instagram/Facebook posts link back to the matching project page.
- **To do with the client:** sort the provided photos into pairs and record service, town and rough date for each job.

---

## 6. Google and SEO

### Step 1: Google Business Profile (doesn't exist yet, highest priority)
- Create as a **service-area business** (hide home address, list towns/radius)
- Categories: primary "Tree service" or "Fence contractor" (choose by main earner), with the other as secondary, plus "Landscaper" if relevant
- Upload the best before/after photos, add services with descriptions, post monthly
- Get the review link (`g.page/r/...`) and send it to recent customers straight away. Reviews drive the map pack more than anything on the website
- Verification can take days to weeks, so start now in parallel with the build

### Step 2: Website integrations
- **Google Search Console:** verify the domain, submit the sitemap, watch queries
- **GA4** via Google Tag Manager with the events in §4.7, **behind a cookie consent banner** (UK GDPR/PECR requires consent for analytics cookies). A cookieless alternative (Plausible, Fathom, Cloudflare Web Analytics) avoids the banner if GA4 isn't required
- **Reviews display**, two layers:
  1. Curated `reviews` collection (copied with permission, linked to the source), so all reviews can be shown and tagged by service
  2. Live rating and count from the **Google Places API** at build time (the API returns at most 5 reviews, so it can't be the whole list), with a nightly rebuild to keep it fresh
- Note: Google doesn't show star rich results for a business's own reviews on its own site (self-serving review rule), so reviews are there for visitors and AI, not for stars in search results
- **Embedded map** of the service area on the contact page

### Step 3: Ongoing local SEO
- Same name/phone/area everywhere: GBP, Facebook, Instagram, Checkatrade/TrustATrader (if used), Yell, Bing Places, Apple Business Connect
- **Area pages only where there are real jobs.** Each needs at least one linked project and local specifics. This avoids the thin duplicate pages competitors have
- Commercial credibility pages: insurance level, tickets (e.g. NPTC/City & Guilds chainsaw), CHAS/Constructionline if held, with a sentence explaining what each one means

---

## 7. Guides and calculators (AI search + SEO)

### Template rules (every guide)
1. Direct answer in the first 40–60 words (`<AnswerBox>`)
2. Steps or a table, then a worked example with real numbers
3. A calculator where it fits
4. UK-specific details: metric first with imperial alongside (UK homeowners mix m² and ft²), and UK law/standards cited
5. "Reviewed by [name], [role/qualification]" and an updated date
6. FAQs at the end (FAQPage schema)
7. Link to the matching service and 1–3 related projects, plus a soft call to action

### Starter list (prioritised)

**Residential**
| Guide | Asset |
|---|---|
| How to measure your garden in square metres and square feet | Calculator: rectangles, L-shapes, irregular shapes, m² ↔ ft² |
| How many fence panels and posts do I need? | Calculator: length → panels, posts, gravel boards, concrete |
| How high can a garden fence be without planning permission? | 2 m general limit, 1 m next to a road used by vehicles (permitted development) |
| Who owns the fence between neighbours? | Boundary basics + when to check the title plan |
| Do I need permission to cut down or prune a tree? | Tree Preservation Orders, conservation areas, how to check with the council |
| When can't you cut hedges and trees? Bird nesting season | Wildlife and Countryside Act; main nesting season roughly Feb–Aug |
| Fence panel types compared: closeboard vs lap vs slatted | Comparison table with lifespan |
| How much does tree surgery / fence replacement cost? | Price ranges from GP's own jobs (very high search demand; needs the client's real figures) |

**Commercial**
| Guide | Asset |
|---|---|
| BS 5837 tree protection fencing explained | Plain-English spec: 2 m welded mesh panels on a scaffold-braced framework, no concrete in the RPA, signage, when it can come down |
| Root Protection Area calculator | RPA radius = 12 × stem diameter at 1.5 m; area = π r², capped at 707 m² (15 m radius). Rare and linkable |
| Steel site hoarding vs Heras fencing: which does your site need? | Comparison by security, duration, cost, appearance |
| What to do when the tree protection plan conflicts with site access | Ground protection, temporary realignment with the arboriculturist's sign-off |

All legal and standards content must be checked against the source (BS 5837:2012, Planning Portal, council guidance) before publishing, and reviewed by GP.

---

## 8. Design direction

- **Photography first:** large before/after imagery, minimal decoration
- Rugged and professional rather than corporate: a strong dark green or charcoal base with one high-visibility accent (site-safety yellow/orange works for both audiences)
- Big tap targets, phone number always visible, fast on 4G in a field or on site
- Accessibility: WCAG 2.2 AA contrast, alt text from the project data, keyboard-usable slider
- Use the `frontend-design` skill for the visual design pass and Playwright/Chrome DevTools for testing

---

## 9. Phases

| Phase | Work | Depends on |
|---|---|---|
| 0. Setup (now) | Create GBP, domain, social handle audit, collect photos/reviews/logo | Client |
| 1. Foundations | Astro project, design tokens, business-info file, content schemas, photo pipeline, layout + sticky CTA | — |
| 2. Core pages | Home, 3 service pages, commercial hub, contact + form, about | Phase 1, client copy/facts |
| 3. Proof | Projects (first 10–15 jobs), gallery, reviews page + Places API | Sorted photos, GBP live |
| 4. SEO/analytics | Schema, sitemap, robots, GSC, GA4/consent, events | Domain live |
| 5. Guides | Template + kit, first 4 guides (garden area calculator, fence panels, BS 5837, RPA calculator) | Phase 1 |
| 6. Launch + grow | Area pages from real jobs, 2 guides/month, monthly GBP posts, AI search checks | Ongoing |

---

## 10. Needed from the client

- [ ] Base town and service area (towns or radius); **blocks local competitor research and area pages**
- [ ] Domain (owned? preferred name?)
- [ ] Logo, any brand colours
- [ ] Photos sorted into before/after pairs with service, town, rough date
- [ ] Existing reviews (Facebook, Checkatrade, texts/WhatsApp, with permission)
- [ ] Social handles (Instagram, TikTok). Facebook received: https://www.facebook.com/share/1FvrdtJ2jS/?mibextid=wwXIfr
- [ ] Qualifications, insurance cover, accreditations
- [ ] Phone/WhatsApp number to publish, email, hours
- [ ] Rough price ranges for common jobs (for cost guides)
- [ ] Main earner: trees or fencing? Commercial or residential? (sets GBP primary category and home page emphasis)

## 11. Open questions

1. Location/service area (needed before local competitor research)
2. Will the client edit the site themselves, or send updates to you? (decides whether to add Keystatic now)
3. GA4 required, or is cookieless analytics acceptable?
4. Any existing website or domain with links pointing to it that needs redirects?

---

## Sources
- [Four Seasons Fencing](https://www.fourseasonsfencing.co.uk/): competitor structure review
- [SafeSite Facilities: steel hoarding](https://www.safesitefacilities.co.uk/products/construction-site-security/construction-site-hoarding)
- [Rethync Ltd](https://www.construction.co.uk/c/666467/rethync-ltd)
- [Checkatrade: GB Fencing and Tree Surgery](https://www.checkatrade.com/trades/GbFencingAndTreeSurgery)
- [Checkatrade: Foremost Tree Surgeons](https://www.checkatrade.com/trades/foremosttreesurgeons)
- [Camden: arboricultural method statement (BS 5837 fencing spec)](https://camdocs.camden.gov.uk/CMWebDrawer/Record/4705279/file/document)
- [First Fence: tree protection fencing, no concrete footings](https://firstfence.co.uk/firstshield-tree-protection-vertical-bracing-only)
- [Searchable: AI search optimisation for local businesses 2026](https://www.searchable.com/blog/local-business-ai-search-optimization-2026)
- [QBS Global: GEO guide for service businesses](https://qbsglobal.blog/generative-engine-optimization-for-service-business)
- [Renew Local: answer engine optimisation 2026](https://renewlocal.com/blog/answer-engine-optimization-local-business-cited-by-ai-2026)
- [Wiredmedia: SEO for tree surgeons](https://www.wiredmedia.co.uk/what-we-know/seo-insights-for-tree-surgeons)
