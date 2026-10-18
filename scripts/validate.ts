import { existsSync, readFileSync } from "node:fs";
import { guideIds, guides, locales, projects } from "../src/site";

const reference = JSON.parse(readFileSync("src/locales/en.json", "utf8"));
function shape(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(shape);
	if (value && typeof value === "object")
		return Object.fromEntries(
			Object.entries(value)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([key, child]) => [key, shape(child)]),
		);
	return typeof value;
}
const expected = JSON.stringify(shape(reference));
for (const locale of Object.keys(locales)) {
	const translation = JSON.parse(
		readFileSync(`src/locales/${locale}.json`, "utf8"),
	);
	if (JSON.stringify(shape(translation)) !== expected)
		throw new Error(`Translation shape mismatch: ${locale}`);
	for (const id of guideIds) {
		const guide = translation.guides[id];
		if (
			guide.checks.length !== 4 ||
			!guide.checks.every((value: string) => value.trim().length > 0)
		)
			throw new Error(`Invalid checklist: ${locale}/${id}`);
		for (const [key, value] of Object.entries(guide))
			if (typeof value === "string" && !value.trim())
				throw new Error(`Empty ${locale}/${id}/${key}`);
	}
	for (const placeholder of ["{count}", "{total}"])
		if (!translation.ui.count.includes(placeholder))
			throw new Error(`Missing ${placeholder}: ${locale}`);
}
if (new Set(guides.map((guide) => guide.path)).size !== guides.length)
	throw new Error("Duplicate guide path");
if (new Set(projects.map((project) => project.id)).size !== projects.length)
	throw new Error("Duplicate project id");
for (const project of projects)
	if (
		!project.url.startsWith("https://") ||
		!project.source.startsWith("https://")
	)
		throw new Error(`Invalid project link: ${project.id}`);
for (const asset of [
	"icon.svg",
	"favicon.ico",
	"apple-touch-icon.png",
	"icon-192.png",
	"icon-512.png",
	"icon-maskable-512.png",
	"cover-fa.png",
	"cover-en.png",
	"github-cover.png",
	"site.webmanifest",
	"CNAME",
	"sw.js",
])
	if (!existsSync(`public/${asset}`))
		throw new Error(`Missing release asset: ${asset}`);
console.log(
	`Validated ${Object.keys(locales).length} complete locales, ${guideIds.length} guides, ${projects.length} sourced projects and release assets.`,
);
