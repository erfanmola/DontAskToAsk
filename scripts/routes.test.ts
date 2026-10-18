import { describe, expect, test } from "bun:test";
import {
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
