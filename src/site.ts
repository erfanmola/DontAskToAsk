import catalog from "./catalog.json";

export const siteUrl = "https://dontasktoask.ir";
export const repository = "https://github.com/erfanmola/DontAskToAsk";
export const analyticsUrl = "https://plausible.developex.ir";
export const locales = {
	fa: { name: "فارسی", dir: "rtl", og: "fa_IR" },
	en: { name: "English", dir: "ltr", og: "en_US" },
	de: { name: "Deutsch", dir: "ltr", og: "de_DE" },
	ru: { name: "Русский", dir: "ltr", og: "ru_RU" },
	ar: { name: "العربية", dir: "rtl", og: "ar_SA" },
	es: { name: "Español", dir: "ltr", og: "es_ES" },
	hi: { name: "हिन्दी", dir: "ltr", og: "hi_IN" },
	tr: { name: "Türkçe", dir: "ltr", og: "tr_TR" },
} as const;
export type Locale = keyof typeof locales;
export const guideIds = [
	"ask",
	"hello",
	"xy",
	"pv",
	"code",
	"bestlanguage",
	"bugreport",
	"followup",
	"answer",
	"aihelp",
] as const;
export type GuideId = (typeof guideIds)[number];
export const guides = guideIds.map((id) => ({
	...catalog.guides.find((guide) => guide.id === id)!,
	id,
}));
export const projects = catalog.projects;
export interface Route {
	locale: Locale;
	guide: GuideId | null;
	redirect?: string;
}
export function routePath(locale: Locale, guide: GuideId): string {
	const path = guides.find((item) => item.id === guide)!.path;
	return `${locale === "fa" ? "" : `/${locale}`}${path === "/" && locale !== "fa" ? "" : path}`;
}
export function parseRoute(pathname: string): Route {
	const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
	const locale: Locale =
		parts[0] && Object.hasOwn(locales, parts[0])
			? (parts.shift() as Locale)
			: "fa";
	const path = `/${parts.join("/")}`;
	const guide = guides.find((item) => item.path === path)?.id ?? null;
	if (path === "/xyproblem")
		return { locale, guide: "xy", redirect: routePath(locale, "xy") };
	if (guide && pathname.startsWith("/fa/"))
		return { locale, guide, redirect: routePath(locale, guide) };
	return { locale, guide };
}

export function guideDestination(href: string, current: string): URL | null {
	const url = new URL(href, current);
	const from = new URL(current);
	if (url.origin !== from.origin) return null;
	if (url.pathname === from.pathname && url.search === from.search && url.hash)
		return null;
	const route = parseRoute(url.pathname);
	if (!route.guide) return null;
	if (route.redirect) url.pathname = route.redirect;
	return url;
}
