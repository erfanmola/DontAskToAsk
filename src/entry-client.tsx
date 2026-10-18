import { hydrate, render } from "solid-js/web";
import { App } from "./App";
import { getTranslation } from "./i18n";
import { parseRoute } from "./site";
import "./styles.css";

const route = parseRoute(location.pathname);
if (route.redirect)
	location.replace(route.redirect + location.search + location.hash);
else {
	const copy = await getTranslation(route.locale);
	document.documentElement.lang = route.locale;
	document.documentElement.dir = ["fa", "ar"].includes(route.locale)
		? "rtl"
		: "ltr";
	document.title = `${route.guide ? copy.guides[route.guide].nav : copy.ui.notFound} | ${copy.ui.brand}`;
	const root = document.getElementById("app");
	if (!root) throw new Error("Missing app root");
	const serverRoot = root.querySelector<HTMLElement>("#site");
	const matches =
		serverRoot?.lang === route.locale &&
		serverRoot.dataset.guide === (route.guide ?? "not-found");
	if (!matches) root.replaceChildren();
	const mount = matches ? hydrate : render;
	mount(() => <App route={route} copy={copy} />, root);
}
