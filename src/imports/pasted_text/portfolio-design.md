Design a personal portfolio website for a Computer Engineering student
specializing in digital VLSI, ASIC design, and ML hardware acceleration.
Audience: technical recruiters at semiconductor companies (Nvidia, AMD,
Apple, Tenstorrent, Google TPU, etc.) and graduate admissions readers in
ECE programs. The site must read as serious engineering work, not a
marketing site.

AESTHETIC DIRECTION
Clean, technical, minimalist. Reference points: Andrej Karpathy's site,
Bunnie Huang (bunniestudios.com), Sam Zeloof (sam.zeloof.xyz), Julia Evans
(jvns.ca), Fabien Sanglard (fabiensanglard.net), faculty pages of Onur
Mutlu and Vladimir Stojanović. The visual language should feel closer to
an academic homepage or a technical spec sheet than a designer portfolio.
No hero animations, no gradient meshes, no marketing-deck flourishes.

THEMES
Two themes with a toggle, dark default.
- Dark: near-black background (#0e0f12), off-white text (#e7e9ec),
  muted gray secondary text (#9ba1a8), hairline borders (#23262c),
  one accent — desaturated cyan (#7ec4d4) used sparingly for hover
  states and active nav.
- Light: paper off-white background (#fafaf7), near-black text (#181a1d),
  muted gray (#555a62), hairline borders (#d9d6cf), accent (#1f6f80).

TYPOGRAPHY
IBM Plex family throughout.
- IBM Plex Sans: UI, navigation, headings (weights 400, 500, 600).
- IBM Plex Mono: code blocks, metadata, dates, tags, the brand name in
  the nav.
- IBM Plex Serif: long-form body text in blog posts and project
  descriptions only.
Type scale: 13/14/16/18/22/28/36 px. Tight letter-spacing on display
sizes (-0.02em on H1, -0.01em on H2/H3). Line height 1.55 for UI,
1.7 for serif body prose.

LAYOUT
- Single-column reading width capped at 68ch (~720px) for prose pages.
- Wider 88ch (~960px) container for index pages and project pages with
  metadata sidebars.
- 4px spacing base unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Sections separated by 1px horizontal rules in the border color, never
  by card containers or shadows.
- Generous vertical rhythm. Don't crowd.

PAGES TO DESIGN
1. Landing page (/)
   - Top nav bar: monospace name on the left ("Karan Sharma"), nav links
     center-right (Projects, Writing, Research, About, Contact),
     theme toggle far right. Single 1px bottom border on the nav.
   - Below nav: name as H1, one-line positioning statement in monospace
     muted gray ("Computer Engineering, McMaster University. Digital
     VLSI, ASIC design, ML hardware acceleration."), then 2-3
     paragraphs of bio in serif body.
   - "Selected projects" section: "Selected projects" as H2 on left,
     "all →" link as monospace small on right. Below: list (not grid)
     of 3 project entries. Each entry: title (sans-serif H3), one-line
     summary (muted serif), then a metadata row with year (mono) and
     tags (small mono in bordered pill chips). 1px rules between
     entries.
   - "Recent writing" section, same list pattern, with formatted dates
     (e.g. "Oct 22, 2025") instead of years.
   - Footer: 1px top border, copyright on left in mono small,
     RSS / GitHub / Email links on right in mono small.
   - No images on this page. Pure typography and rules.

2. Projects index (/projects/)
   - Same nav. Header: "Index" kicker in tiny uppercase mono, "Projects"
     as H1, one-line description in serif.
   - Then a long entry list, same row pattern as the landing page.

3. Project detail page (/projects/<slug>/)
   - Same nav. Header block with "Project" kicker, project title H1,
     one-line summary in serif lead.
   - Below header: TWO-COLUMN GRID. Left column is a sticky metadata
     sidebar (~14rem wide). Right column is the prose body
     (max-width 68ch).
   - Sidebar: definition-list pattern. Each row has a tiny uppercase
     mono label (Date, Updated, Status, Stack, Tags, Source, Paper)
     and a value below in either sans-serif or mono. Stack and Tags
     render as vertical lists / pill chips.
   - Body: rendered markdown with serif body. Headings in sans. H2
     gets a top border and top padding. Tables of synthesis/timing
     results are first-class — mono numerics, tabular-nums, hairline
     row borders, header in muted color. Code blocks have a 1px
     border and use github-light/github-dark-dimmed Shiki themes
     for SystemVerilog highlighting. Figures have hairline borders
     and small sans-serif captions centered below.
   - On mobile (<800px): sidebar collapses above the content as a
     horizontal-flowing dl.
   - Mock the page with content from a hypothetical "8x8 INT8
     Systolic Array Accelerator" project: a results table with
     Frequency / Area / Peak power / Throughput / Energy efficiency
     rows; a Verilog code block; a synthesis-results table with
     stage / frequency / slack / area columns.

4. Writing index (/blog/)
   - Same nav and header pattern as projects index.
   - Entries grouped by year. Year heading is a muted mono label
     above each group.

5. Blog post (/blog/<slug>/)
   - Same nav. Header: "Note" kicker, post title H1, then a metadata
     row with date, optional updated date, and tag chips.
   - Body: single column, 68ch, serif prose. Same code/math/figure/
     table styling as project pages. Math equations rendered as
     KaTeX (display equations centered, with extra vertical space).
     References list at bottom, separated by 1px rule, in smaller
     muted text.

6. Research page (/research/)
   - "Research" kicker, "Interests & reading" H1, lede.
   - Three sections: "Current interests" (bulleted, each item has a
     bold sans-serif lead-in followed by 1-2 sentences of serif),
     "Selected reading" (numbered annotated bibliography — author/
     title/venue/year in serif, italicized title, then a muted
     1-2-sentence note below each), "Open questions" (numbered list).

7. About page (/about/)
   - "About" kicker, name H1, then bio paragraphs in serif. Education
     as a proper HTML table (Years / Program / Institution columns).
     Awards & scholarships, Talks & posters, Teaching as bulleted
     lists. CV download link in mono at the bottom.

8. Contact page (/contact/)
   - "Contact" kicker, "Get in touch" H1.
   - Contact methods as a definition list with mono labels: Email,
     GitHub, LinkedIn, Medium, CV. Two-column grid on desktop,
     stacked on mobile. Email address obfuscated as
     "you [at] example [dot] com". One closing paragraph noting
     current availability.

COMPONENTS TO DEFINE AS REUSABLE
- Top nav bar (with theme toggle)
- Footer
- Theme toggle button (small, bordered, mono "moon"/"sun" label
  swap on toggle, NOT an icon)
- Entry list row (used for project and post entries on indexes
  and landing)
- Tag chip (small, 1px border, mono, x-small text)
- Metadata sidebar (definition-list pattern)
- Page header block (kicker + H1 + lede)
- Year heading (mono, muted, used on writing index)

DELIVERABLES
- Show all 8 pages in dark theme.
- Show landing and project detail page in light theme too, for
  reference.
- Mobile (375px) breakpoint: show landing, projects index, and
  project detail.
- Establish a design tokens panel: color tokens for both themes,
  type scale, spacing scale, border radii (use 2px and 4px only).

CRITICAL "DO NOTS"
- No card-style containers with rounded corners and box shadows for
  project entries. Use rules.
- No hero images, no decorative graphics.
- No purple/blue gradients. No "AI portfolio" aesthetics.
- No more than one accent color used on any page.
- No emoji as visual elements.
- No icons in the nav (text only).
- No center-aligned body text.
- No sans-serif body text in long-form prose. Serif only for prose.
- No font sizes outside the scale defined above.
- Don't substitute Inter, Roboto, or Space Grotesk for IBM Plex.