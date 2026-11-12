# West Yorkshire Market Research

5 Nov 2026. Covers Leeds, Bradford, Wakefield, Kirklees (Huddersfield, Dewsbury) and Calderdale (Halifax).

**Limitation:** the search tool can't show Google's local map pack (the top 3 businesses on the map), which is the most important ranking for residential work. Check it by hand (or I can do it with Playwright) for "tree surgeon", "fencing contractor" and "fence installers" in each of the five main towns, and record the top 3 with their review counts.

---

## 1. Residential tree surgery: crowded

- **Many competitors:** MyJobQuote lists ~333 tree surgeons for Leeds and 111 for West Yorkshire as a whole. Checkatrade, MyBuilder, Bark, Rated People and the Yorkshire Post/local newspaper directories all carry long lists.
- **Most of them live on directories, not their own websites.** The strongest firms in the results are known through their Checkatrade or MyBuilder profiles:
  - **Primrose Tree Services** (South Milford/Leeds, 30-mile radius, since 2013): ~200 Checkatrade reviews at 9.7/10. This is the review volume to aim for.
  - **Treesaw** (Leeds, since 2000), **Bowman Arboriculture** (family-run), **Tree Masters** (Leeds/Harrogate/Wetherby, NPTC-qualified staff), **ICS Tree Services**: older, established names.
- **Takeaway:** GP won't win "tree surgeon Leeds" on the website alone. Winning depends on the Google Business Profile, how fast reviews come in, and photo proof. The website's job is to turn visitors into enquiries and support the profile.

## 2. Combined tree + fencing firms: the direct competitors

| Firm | Where | Online presence | Weaknesses |
|---|---|---|---|
| **Stewarts** | Halifax (HX1–HX7) | Clean single-page site: tree surgery, fencing, landscaping, phone + WhatsApp, quote form, ~12-photo gallery | No reviews on the site (links to Bark), unattributed testimonial, unsupported claims ("500+ jobs"), no guides, no pricing, repeated photos, no project detail |
| **Yorkshire Trees & Fencing** | York / Bradford / Huddersfield | Directory profiles only (MyBuilder 18+ five-star reviews, Bark) | No website found |
| Mirfield/Huddersfield and Shipley tree firms | Kirklees, Bradford | Newspaper directory listings mentioning fencing | No real web presence |

**No combined tree + fencing competitor in West Yorkshire has a strong website.** That is the main opening.

## 3. Residential fencing: crowded, also directory-led

- **JT Fencing & Security** (Wyke, Bradford): Checkatrade 9.83, covers Halifax/Brighouse/Huddersfield/Bradford, does both domestic and commercial (V-mesh, 358 mesh, palisade)
- **Shelton Fencing** (Huddersfield area): MyBuilder 5/5 from 25 reviews
- **Yorkshire Smart Fencing & Paving** (Leeds/Wakefield): TrustATrader
- Bark's Wakefield fencers average 4.89 from 436 reviews, so customers here are used to seeing high ratings and many reviews

## 4. Commercial: the gap

- **Site hoarding** is dominated by **SafeSite Facilities**, a national supplier with template location pages for Leeds and West Yorkshire and claims of next-day installation. It's a product seller, not a local team.
- **Local commercial fencers** (JT Fencing, Clark Construction Fencing, Yorkshire Smart Fencing) offer palisade and mesh, but none advertise BS 5837 tree protection fencing.
- **No West Yorkshire contractor came up for BS 5837 tree protection fencing installation.** Searches returned only planning documents and national suppliers (First Fence, HERMEQ).
- **Takeaway:** "tree protection fencing Leeds / West Yorkshire" and "tree protection fencing installers Yorkshire" are open. GP's combination is rare: tree work and fencing in one firm means they can install the protection, do the arb-approved tree work, and take it down at the end, all from one contractor. That should be the main commercial message.
- **Referral partners:** arboricultural consultants in Leeds and Wakefield write the tree protection plans and are asked "who can install this?". A page aimed at consultants (the spec GP works to, sign-off photos, fast start) plus direct outreach could bring in steady commercial work.

## 5. Local guide opportunity: protected trees

Each of the five councils checks Tree Preservation Orders differently, which is confusing for homeowners and a strong local guide topic ("How to check if a tree is protected in West Yorkshire"):

| Council | How to check | Source |
|---|---|---|
| Leeds | Online protected-tree location service; orders published as PDFs at tpo.leeds.gov.uk | [Leeds news](https://news.leeds.gov.uk/news/log-on-and-twig-protected-tree-locations-in-leeds-as-council-branches-out-with-new-online-mapping-service) |
| Wakefield | Council Public Map (Spectrum) or "Where I Live" | [Wakefield TPOs](https://www.wakefield.gov.uk/planning/heritage-conservation-and-tree-preservation/tree-preservation-orders/) |
| Bradford | TPO map layer on the council's ArcGIS open data | [Bradford GIS](https://gis.bradford.gov.uk/server/rest/services/Open_Data/Tree_Preservation_Orders/MapServer/info/iteminfo) |
| Calderdale | TPO dataset on Calderdale DataWorks | dataworks.calderdale.gov.uk |
| Kirklees | TPO areas layer on data.gov.uk; **official council lookup page not yet confirmed** | [data.gov.uk](https://ckan.publishing.service.gov.uk/organization/kirklees-council?tags=TPO) |

Also cover conservation areas (6 weeks' notice to the council before tree work) and the national Planning Data TPO dataset. Every link must be checked before publishing.

## 6. What this changes in the plan

1. **Main message:** "Trees and fencing, one team, across West Yorkshire": for homeowners (garden refurbs that cover both trees and fences) and for sites (tree protection, hoarding and tree work from one contractor).
2. **Commercial hub moves up the priority list.** Build `/commercial/tree-protection-fencing/` and the RPA calculator in the first release, not later.
3. **First area pages** (only once real jobs exist for each): Leeds, Bradford, Wakefield, Huddersfield, Halifax, then the towns nearest GP's base.
4. **Proof to beat the competition:** reviews shown on every page (none of the competitors do this), named testimonials, project pages with real detail, and indicative prices.
5. **Review target:** directory leaders sit at 200+ reviews. Set a goal with the client (e.g. ask every finished job for a Google review via a QR card or text link) from the day the profile goes live.
6. **Extra guides for West Yorkshire:** protected-tree check by council (§5); "Do I need a hoarding licence?" (Leeds/Bradford highways); seasonal storm/wind damage clean-up for the Pennine side (Calderdale/Kirklees).

## 7. Still needed

- **GP's base town.** West Yorkshire is about 40+ miles across, so the base sets the GBP service area, the order of the area pages and the map-pack competitors that matter most.
- Map pack check (see the limitation at the top).
- Whether GP holds CHAS / Constructionline / SafeContractor. Commercial buyers in Leeds will ask, and the competitors show these logos.

---

## Sources
- [MyJobQuote: tree surgeons in Leeds](https://www.myjobquote.co.uk/tree-surgeon/west-yorkshire/leeds)
- [Checkatrade: tree surgeons in Leeds](https://www.checkatrade.com/Search/Tree-Surgeon/in/Leeds)
- [Checkatrade: Primrose Tree Services](https://www.checkatrade.com/trades/primrosetreeservices)
- [Stewarts, Halifax](https://stewarts-halifax.pages.dev/)
- [MyBuilder: Yorkshire Trees & Fencing](https://www.mybuilder.com/profile/yorkshire-trees-fencing/reviews)
- [Bark: Yorkshire Trees & Fencing](https://www.bark.com/en/gb/b/yorkshire-trees--fencing/KNNkwG)
- [Checkatrade: JT Fencing & Security](https://www.checkatrade.com/trades/jtfencingandsecurity)
- [MyBuilder: Shelton Fencing](https://www.mybuilder.com/profile/sheltonfencingltd/reviews)
- [Bark: fencers in Wakefield](https://www.bark.com/en/gb/fence-installers/west-yorkshire/wakefield/)
- [TrustATrader: Yorkshire Smart Fencing & Paving](https://www.trustatrader.com/traders/yorkshire-smart-fencing-paving-leeds-west)
- [TrustATrader: Clark Construction Fencing](https://www.trustatrader.com/traders/clark-construction-fencing---commercial-leeds-south)
- [SafeSite Facilities: hoarding in West Yorkshire](https://safesitefacilities.co.uk/products/construction-site-hoarding-in-west-yorkshire-area)
- [SafeSite Facilities: hoarding in Leeds](https://safesitefacilities.co.uk/products/construction-site-hoarding-in-leeds-area)
- [First Fence: BS 5837 tree protection fencing](https://firstfence.co.uk/blog/firstshield-tree-protection-fencing-product-launch)
- [Wakefield Council: tree preservation orders](https://www.wakefield.gov.uk/planning/heritage-conservation-and-tree-preservation/tree-preservation-orders/)
- [Leeds Council: protected tree mapping service](https://news.leeds.gov.uk/news/log-on-and-twig-protected-tree-locations-in-leeds-as-council-branches-out-with-new-online-mapping-service)
- [Bradford Council: TPO open data](https://gis.bradford.gov.uk/server/rest/services/Open_Data/Tree_Preservation_Orders/MapServer/info/iteminfo)
- [Kirklees Council: TPO data on data.gov.uk](https://ckan.publishing.service.gov.uk/organization/kirklees-council?tags=TPO)
