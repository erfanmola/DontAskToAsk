import { describe, expect, test } from "bun:test";
import {
	guideDestination,
	guides,
	type Locale,
	locales,
	parseRoute,
	routePath,
} from "../src/site";

describe("public URL compatibility", () => {
	test("existing Persian links are preserved", () => {
		for (const [path, guide] of [
			["/", "ask"],
			["/nohello", "hello"],
			["/xy", "xy"],
			["/nopv", "pv"],
			["/nocode", "code"],
		] as const)
			expect(parseRoute(path)).toEqual({ locale: "fa", guide });
		expect(parseRoute("/xyproblem")).toEqual({
			locale: "fa",
			guide: "xy",
			redirect: "/xy",
		});
	});
	test("each translated guide round-trips without changing its identity", () => {
		for (const locale of Object.keys(locales) as Locale[])
			for (const guide of guides)
				expect(parseRoute(routePath(locale, guide.id))).toEqual({
					locale,
					guide: guide.id,
				});
	});
	test("missing pages do not silently become the home guide", () => {
		expect(parseRoute("/missing").guide).toBeNull();
		expect(parseRoute("/de/missing")).toEqual({ locale: "de", guide: null });
	});
	test("legacy aliases and trailing slash variants use canonical routes", () => {
		expect(parseRoute("/en/xyproblem").redirect).toBe("/en/xy");
		expect(parseRoute("/xy/")).toEqual({ locale: "fa", guide: "xy" });
		expect(parseRoute("/en/")).toEqual({ locale: "en", guide: "ask" });
		expect(parseRoute("/constructor/").guide).toBeNull();
	});
});

describe("instant guide navigation", () => {
	test("all guide and language destinations are recognized", () => {
		for (const locale of Object.keys(locales) as Locale[])
			for (const guide of guides) {
				const href = routePath(locale, guide.id);
				expect(
					guideDestination(href, "https://dontasktoask.ir/404")?.pathname,
				).toBe(href);
			}
	});
	test("external sites, files, unknown routes, and same-page fragments retain native behavior", () => {
		for (const href of [
			"https://example.com/en",
			"/cover-en.png",
			"/en/missing",
			"/en#main",
			"#main",
			"mailto:hello@example.com",
		])
			expect(guideDestination(href, "https://dontasktoask.ir/en")).toBeNull();
	});
	test("legacy aliases keep queries and fragments when canonicalized", () => {
		expect(
			guideDestination(
				"/en/xyproblem?utm_source=guide#main",
				"https://dontasktoask.ir/",
			)?.href,
		).toBe("https://dontasktoask.ir/en/xy?utm_source=guide#main");
	});
});
