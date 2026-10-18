import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
	type GuideId,
	guides,
	type Locale,
	locales,
	routePath,
	siteUrl,
} from "../src/site";

// The SSR bundle is produced immediately before this script.
const { renderPage } = await import(`${process.cwd()}/.ssr/entry-server.js`);
const template = await readFile("docs/index.html", "utf8");
const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(char) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				char
			] ?? char,
	);
const urls: string[] = [];
for (const locale of Object.keys(locales) as Locale[]) {
	for (const guide of guides) {
		const path = routePath(locale, guide.id);
		const { html, copy, hydration } = await renderPage(path);
		const article = copy.guides[guide.id];
		const url = `${siteUrl}${path}`;
		const title = `${article.nav} | ${copy.ui.brand}`;
		const alternates = (Object.keys(locales) as Locale[])
			.map(
				(language) =>
					`<link rel="alternate" hreflang="${language}" href="${siteUrl}${routePath(language, guide.id)}">`,
			)
			.join("\n");
		const meta = `<title>${escapeHtml(title)}</title>\n<meta name="description" content="${escapeHtml(article.deck)}">\n<link rel="canonical" href="${url}">\n${alternates}\n<link rel="alternate" hreflang="x-default" href="${siteUrl}${routePath("fa", guide.id)}">\n<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(article.deck)}">\n<meta property="og:url" content="${url}">\n<meta property="og:locale" content="${locales[locale].og}">\n<meta property="og:image" content="${siteUrl}/cover-${locale === "fa" ? "fa" : "en"}.png">\n<meta name="twitter:title" content="${escapeHtml(title)}">\n<meta name="twitter:description" content="${escapeHtml(article.deck)}">\n<meta name="twitter:image" content="${siteUrl}/cover-${locale === "fa" ? "fa" : "en"}.png">`;
		const document = template
			.replace(
				'<html lang="fa" dir="rtl">',
				`<html lang="${locale}" dir="${locales[locale].dir}">`,
			)
			.replace("<!--page-meta-->", meta)
			.replace("<!--hydration-->", hydration)
			.replace("<!--app-html-->", html);
		const file = `docs${path === "/" ? "" : path}/index.html`;
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, document);
		urls.push(
			`<url><loc>${url}</loc>${(Object.keys(locales) as Locale[]).map((language) => `<xhtml:link rel="alternate" hreflang="${language}" href="${siteUrl}${routePath(language, guide.id)}"/>`).join("")}</url>`,
		);
	}
	const canonical = routePath(locale, "xy");
	const alias = locale === "fa" ? "/xyproblem" : `/${locale}/xyproblem`;
	await mkdir(`docs${alias}`, { recursive: true });
	await writeFile(
		`docs${alias}/index.html`,
		`<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${canonical}"><link rel="canonical" href="${siteUrl}${canonical}"><title>${escapeHtml((await renderPage(canonical)).copy.guides.xy.nav)}</title><a href="${canonical}">${escapeHtml((await renderPage(canonical)).copy.guides.xy.nav)}</a></html>`,
	);
}
const notFound = await renderPage("/__not_found__");
await writeFile(
	"docs/404.html",
	template
		.replace(
			"<!--page-meta-->",
			`<title>${escapeHtml(notFound.copy.ui.notFound)}</title><meta name="robots" content="noindex">`,
		)
		.replace("<!--hydration-->", notFound.hydration)
		.replace("<!--app-html-->", notFound.html),
);
await writeFile(
	"docs/sitemap.xml",
	`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`,
);
await writeFile("docs/.nojekyll", "");
console.log(
	`Prerendered ${urls.length} translated guides, eight redirects, a sitemap and a genuine 404 page.`,
);

export type BuiltGuide = GuideId;
