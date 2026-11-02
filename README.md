# Nearby Calls — nearbycalls.com

Static marketing site for Nearby Calls (by Sportsman Creative). Plain HTML/CSS/JS — no build step, no framework. Deploys as-is on Vercel.

## Structure

```
index.html                  Homepage (the sales landing page)
privacy-policy.html         DRAFT — paste live legal text before launch
terms-and-conditions.html   DRAFT — paste live legal text + add guarantee clause
css/styles.css              All styling; brand tokens at the top in :root
js/main.js                  Mobile nav, revenue calculator, sticky mobile buy bar
assets/                     Logo, favicon, headshot, section graphics, case study PDFs
robots.txt / sitemap.xml / llms.txt
vercel.json                 Clean URLs (/privacy-policy works without .html)
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New Project → Import** the repo. Framework preset: **Other**. No build command, output directory: root.
3. Add the `nearbycalls.com` and `www.nearbycalls.com` domains to the project and move DNS when ready to launch.

Preview deployments: every push gets a preview URL automatically.

## Before pointing the domain here (launch checklist)

- [ ] **Legal pages**: paste the full text from the live Brizy pages into `privacy-policy.html` and `terms-and-conditions.html` (each page has a TODO banner and an HTML comment with instructions). In the terms, update the refund section to include the **30-Day Visibility Guarantee** ($197 refunded if GBP visibility hasn't improved in the first 30 days) — the live terms currently say all fees are non-refundable, which would contradict the homepage.
- [ ] **Sportsman Creative links**: the site links to `https://www.sportsmancreative.com/` in the footer, reviews intro, founder block, and FAQ — confirm that's the right URL.
- [ ] **"Text EXAMPLE" button** (review automation section): currently an `sms:` link to (877) 848-5774. If the personalized-example flow lives in GoHighLevel, swap in the GHL popup/form embed there instead.
- [ ] **Email list signup**: the old site had a subscribe form. There's a marked spot in the Learning Center section (`index.html`, HTML comment) to paste a GoHighLevel form embed.
- [ ] **Analytics**: add your tracking snippet (GA4 / GHL) before `</head>` in all three pages. Every checkout button carries a `?source=` tag (hero, revenue, pricing, final, sticky) so you can see which section converts.
- [ ] **Verify two testimonial labels**: "Next Level Sales" has no industry/city label (unknown), and "Hail Gone" is labeled "Auto Hail Repair" — confirm or correct.
- [ ] **Google Search Console**: after launch, submit `sitemap.xml` and request re-indexing of the homepage.

## Facts baked into the page (update here if they change)

- Pricing: $197 first month (normally $497) → $497/month after. No contracts.
- Guarantee: 30-Day Visibility Guarantee — $197 refunded if GBP visibility hasn't improved in the first 30 days. (FAQ + pricing section + founder block.)
- Rating: 5.0 from 54 reviews across Google, Facebook & Trustpilot (hero, footer, and JSON-LD `aggregateRating` — keep these in sync as the count grows).
- Case study stats: Precise Plumbing #20→#1 avg Maps rank; Ozarks Overhead Door 61 new reviews at 5.0; Stop Eviction Consultants 1,660 call clicks. PDFs in `assets/case-studies/`.
- The "(Normally $497)" strikethrough stays, but "Limited Time" was removed on purpose — the offer has no end date, and permanent countdown language reads as fake urgency and carries deceptive-pricing risk. If you later set a real end date, add it back with the date.

## Editing

- **Copy**: everything is plain text in `index.html`, organized by commented section banners.
- **Colors/fonts**: `:root` block at the top of `css/styles.css`. Navy `#002348`, CTA green `#3ebe29` (sampled from the logo and the previous site).
- **Revenue calculator**: default customer value is `value="500"` on the `#customerValue` input; tiles multiply by 1 / 10 / 20 (`data-mult` attributes).
- **Schema**: JSON-LD in the `<head>` of `index.html` (business info, offers, rating). The FAQ section uses native `<details>` elements; if you add/remove questions, mirror them in a FAQPage JSON-LD block if you add one later.
