import { getTranslation } from "./i18n";
import {
	guideDestination,
	locales,
	parseRoute,
	type Route,
	routePath,
	siteUrl,
} from "./site";

export function updatePageMetadata(route: Route) {
	const copy = getTranslation(route.locale);
	const guide = route.guide ? copy.guides[route.guide] : null;
	const title = `${guide?.nav ?? copy.ui.notFound} | ${copy.ui.brand}`;
	document.documentElement.lang = route.locale;
	document.documentElement.dir = locales[route.locale].dir;
	document.title = title;
	const robots = document.querySelector('meta[name="robots"]');
	if (!route.guide || !guide) {
		if (!robots) {
			const meta = document.createElement("meta");
			meta.name = "robots";
			meta.content = "noindex";
			document.head.append(meta);
		}
		document.querySelector('link[rel="canonical"]')?.remove();
		return;
	}
	robots?.remove();
	const url = `${siteUrl}${routePath(route.locale, route.guide)}`;
	const image = `${siteUrl}/cover-${route.locale === "fa" ? "fa" : "en"}.png`;
	for (const [attribute, key, value] of [
		["name", "description", guide.deck],
		["property", "og:title", title],
		["property", "og:description", guide.deck],
		["property", "og:url", url],
		["property", "og:locale", locales[route.locale].og],
		["property", "og:image", image],
		["name", "twitter:title", title],
		["name", "twitter:description", guide.deck],
		["name", "twitter:image", image],
	]) {
		const meta =
			document.querySelector(`meta[${attribute}="${key}"]`) ??
			document.createElement("meta");
		meta.setAttribute(attribute, key);
		meta.setAttribute("content", value);
		if (!meta.isConnected) document.head.append(meta);
	}
	const canonical =
		document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
		document.createElement("link");
	canonical.rel = "canonical";
	canonical.href = url;
	if (!canonical.isConnected) document.head.append(canonical);
	for (const language of [...Object.keys(locales), "x-default"]) {
		const link =
			document.querySelector<HTMLLinkElement>(
				`link[rel="alternate"][hreflang="${language}"]`,
			) ?? document.createElement("link");
		link.rel = "alternate";
		link.hreflang = language;
		link.href = `${siteUrl}${routePath(language === "x-default" ? "fa" : (language as Route["locale"]), route.guide)}`;
		if (!link.isConnected) document.head.append(link);
	}
}

// Keep native anchors for direct visits, modified clicks, downloads, and no-JS use.
export function connectNavigation(changeRoute: (route: Route) => void) {
	let current = parseRoute(location.pathname);
	const applyRoute = (route: Route) => {
		if (route.locale !== current.locale || route.guide !== current.guide)
			changeRoute(route);
		current = route;
		updatePageMetadata(route);
	};
	const update = () => {
		applyRoute(parseRoute(location.pathname));
	};
	const click = (event: MouseEvent) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;
		const link =
			event.target instanceof Element
				? event.target.closest<HTMLAnchorElement>("a[href]")
				: null;
		if (
			!link ||
			link.hasAttribute("download") ||
			(link.target && link.target !== "_self") ||
			link.relList.contains("external")
		)
			return;
		const url = guideDestination(link.href, location.href);
		if (!url) return;
		event.preventDefault();
		const route = parseRoute(url.pathname);
		applyRoute(route);
		for (const details of document.querySelectorAll<HTMLDetailsElement>(
			".site-header details[open]",
		))
			details.open = false;
		if (url.href !== location.href) history.pushState(null, "", url);
		document.getElementById("main")?.focus({ preventScroll: true });
		let anchor: HTMLElement | null = null;
		try {
			anchor = document.getElementById(decodeURIComponent(url.hash.slice(1)));
		} catch {
			/* A malformed fragment still opens the guide. */
		}
		if (anchor) anchor.scrollIntoView({ behavior: "instant" });
		else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	};
	document.addEventListener("click", click);
	window.addEventListener("popstate", update);
	return () => {
		document.removeEventListener("click", click);
		window.removeEventListener("popstate", update);
	};
}
