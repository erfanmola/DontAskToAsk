<p align="center"><img src="public/cover-en.png" alt="Don’t ask to ask. Just ask. Better questions. Better conversations." width="1200"></p>

# Don't Ask to Ask

Practical, multilingual guides to asking clear questions, giving useful answers, sharing solutions, and choosing programming tools for the task.

**[Read the guides](https://dontasktoask.ir)** · **[فارسی](https://dontasktoask.ir/)** · **[English](https://dontasktoask.ir/en)**

## Guides

| Guide | Persian URL | English URL |
| --- | --- | --- |
| Just ask | `/` | `/en` |
| Hello, with a question | `/nohello` | `/en/nohello` |
| Explain the real problem | `/xy` | `/en/xy` |
| Ask in the open | `/nopv` | `/en/nopv` |
| Include code and errors | `/nocode` | `/en/nocode` |
| The best programming language | `/best-language` | `/en/best-language` |
| Write a useful bug report | `/bug-report` | `/en/bug-report` |
| Share what solved it | `/follow-up` | `/en/follow-up` |
| Help without belittling | `/answer` | `/en/answer` |
| Getting help with AI code | `/ai-help` | `/en/ai-help` |

The original Persian routes remain unchanged. `/xyproblem` still redirects to `/xy`.

All ten guides, checklists, templates, interface strings, and project descriptions are available in **فارسی**, **English**, **Deutsch**, **Русский**, **العربية**, **Español**, **हिन्दी**, and **Türkçe**. Persian stays at the existing unprefixed URLs; other languages use `/en`, `/de`, `/ru`, `/ar`, `/es`, `/hi`, and `/tr`. Changing languages keeps the selected guide. Persian and Arabic use right-to-left layouts.

## What is included

- SolidJS, strict TypeScript, Vite, and Biome, with Bun and a committed lockfile.
- Eighty prerendered guide pages, so articles and project links remain readable without JavaScript.
- System appearance on first visit, with a persistent sun/moon toggle and animated icons. Theme changes use a circular View Transition from the toggle; reduced-motion preferences and browsers without the API get an immediate update.
- A compact mobile menu, keyboard navigation, and reduced-motion support.
- Editable question templates, clipboard actions, guide sharing, and interactive checklists.
- Live GitHub stars fetched at runtime with `cache: "no-store"`, refreshed on return to the page and every five minutes while visible. Counts are never stored, prerendered, or replaced by a stale snapshot. If GitHub fails or rate-limits a request, the count becomes a dash and the repository link remains available.
- The full list of thirteen other Developix projects, with descriptions checked against their source. Project links intentionally omit `noopener` and `noreferrer`, preserving normal referral behavior.
- Self-hosted variable fonts, localized titles and descriptions, canonical URLs, `hreflang`, a sitemap, social covers, an SVG/ICO favicon family, touch icons, and a web manifest.
- Plausible pageviews and outbound-link events through `https://plausible.developex.ir`, enabled only on the production domain. Local development and previews do not send analytics.

No third-party credentials are embedded in the browser. The star counter uses GitHub’s public repository API and is subject to its availability and rate limits.

## Development

Requires **Bun 1.4.3**. Node tooling expects Node **22.12 or newer**.

```sh
bun install --frozen-lockfile
bun run dev
```

```sh
bun run check       # TypeScript, Biome, locale/catalog/asset validation
bun test            # Public route compatibility tests
bun run artwork     # Rebuild icons and Persian/English social artwork
bun run build       # Validate, build browser + SSR bundles, prerender into docs/
bun run preview     # Serve the built site locally
```

Artwork generation uses local font files and vector paths; it does not require an image-generation service, a browser installation, or system fonts. Artwork sources and design direction live in `scripts/`.

## Publishing on GitHub Pages

This repository keeps its existing deployment configuration: **`master` → `/docs`** with the custom domain in `public/CNAME`. The built `docs/` directory is intentionally versioned.

1. Run `bun install --frozen-lockfile`, `bun test`, and `bun run build`.
2. Review and commit both sources and regenerated `docs/` output.
3. Push the reviewed changes to `master` when ready to publish. Pushing a feature branch alone does not update the live site.

The quality workflow repeats the checks and verifies that committed `docs/` output matches a fresh build. It does not change Pages settings or create deployment commits.

Static directories support direct visits to every guide and language, with localized metadata already in the HTML. GitHub Pages may normalize directory URLs with a trailing slash; canonical links use the documented URLs. Legacy `/xyproblem` pages use an immediate HTML redirect because GitHub Pages does not offer per-path server redirect rules. Unknown paths receive a real 404 page.

A retiring service worker at `/sw.js` clears the former Workbox cache and unregisters itself. The new app does not install an offline cache that could retain obsolete content or star counts.

## TheBestLanguage migration

A rewritten language-choice guide is included at `/best-language` and its translated routes, with credit to [TheBestLanguage](https://github.com/erfanmola/TheBestLanguage). The old repository and domain have **not** been archived or redirected by this rewrite.

After owner approval and deployment, configure a permanent server/CDN redirect from `thebestlanguage.ir` to the corresponding new guide, update the old README, verify the redirects, then archive that repository. Keep the old domain and HTTPS active for the redirects. Do not archive it as a substitute for configuring domain redirects.

## Contributing and translations

Content lives in `src/locales/{language}.json`. Shared guide paths and project source references live in `src/catalog.json`; language names and direction are declared in `src/site.ts`.

When editing a guide, keep its goal, before/after examples, explanation, checklist, and template consistent across languages. Preserve technical identifiers and interpolation tokens such as `{count}` and `{total}`. Run `bun run check` before building. Corrections from fluent speakers are welcome.

Source references for project descriptions are stored alongside each project in the catalog. Update the reference when changing a description, and avoid adding capabilities that the project does not provide.

## Sources and credit

Inspired by [Don't Ask to Ask](https://dontasktoask.com/), [No Hello](https://nohello.net/), [The XY Problem](https://xyproblem.info/), and [Stack Overflow's minimal reproducible example guide](https://stackoverflow.com/help/minimal-reproducible-example). The language-choice guide builds on Erfan Mola's [TheBestLanguage](https://github.com/erfanmola/TheBestLanguage).

Created and maintained by **Erfan Mola**, part of **[Developix](https://developix.ir)**. Original Git history is retained. The repository uses **[AGPL-3.0](LICENSE)**. Font licenses are included under `public/font-licenses/`.

## GitHub description

```text
Multilingual guides to better questions, helpful answers, and choosing tools. Built with SolidJS, TypeScript, Vite, and Biome.
```

Use `public/github-cover.png` (1280 × 640) as the repository social preview. `public/cover-fa.png` and `public/cover-en.png` are 1200 × 630 social images. Uploading a custom GitHub social preview is a separate repository-settings action.

---

## دربارهٔ پروژه

**نپرس که بپرسم، فقط بپرس** مجموعه‌ای از راهنماهای کوتاه برای پرسیدن سؤال روشن، پاسخ‌دادن محترمانه و به‌اشتراک‌گذاشتن راه‌حل‌هاست. هدف این راهنماها آسان‌ترکردن کمک‌گرفتن و کمک‌کردن است؛ نه سرزنش‌کردن تازه‌کارها.

مسیرهای قبلی فارسی حفظ شده‌اند. راهنماها، الگوها و توضیحات پروژه‌ها به هشت زبان ارائه می‌شوند. در نسخهٔ جدید، حالت روشن و تیره، منوی جمع‌وجور موبایل، تعداد زندهٔ ستاره‌های گیت‌هاب و صفحات مستقل برای گزارش خطا، پیگیری پاسخ، کمک محترمانه و انتخاب زبان برنامه‌نویسی اضافه شده‌اند.

برای مشارکت، متن‌های `src/locales/` را ویرایش کنید و دستورهای بررسی و ساخت بالا را اجرا کنید. راهنمای انتخاب زبان به این مجموعه اضافه شده، اما انتقال دامنه و بایگانی مخزن TheBestLanguage هنوز انجام نشده است.
