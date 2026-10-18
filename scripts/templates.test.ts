import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { guides, type Locale, locales, routePath } from "../src/site";

const decodeText = (text: string) =>
	text.replace(
		/&(amp|lt|gt|quot|#39|#\d+|#x[\da-f]+);/gi,
		(_, entity: string) => {
			if (entity.startsWith("#"))
				return String.fromCodePoint(
					entity[1].toLowerCase() === "x"
						? Number.parseInt(entity.slice(2), 16)
						: Number.parseInt(entity.slice(1), 10),
				);
			return { amp: "&", lt: "<", gt: ">", quot: '"' }[entity.toLowerCase()]!;
		},
	);

test("every published template contains its editable text on direct visits", () => {
	for (const locale of Object.keys(locales) as Locale[]) {
		const copy = JSON.parse(readFileSync(`src/locales/${locale}.json`, "utf8"));
		for (const guide of guides) {
			const path = routePath(locale, guide.id);
			const html = readFileSync(
				`docs${path === "/" ? "" : path}/index.html`,
				"utf8",
			);
			const textarea = html.match(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/);
			expect(textarea, path).not.toBeNull();
			expect(decodeText(textarea![1]), path).toBe(
				copy.guides[guide.id].template,
			);
		}
	}
});
