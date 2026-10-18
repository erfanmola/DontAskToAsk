import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { hydrate, render } from "solid-js/web";
import { App } from "./App";
import { getTranslation } from "./i18n";
import { connectNavigation, updatePageMetadata } from "./navigation";
import { parseRoute } from "./site";
import "./styles.css";

const route = parseRoute(location.pathname);
if (route.redirect)
	location.replace(route.redirect + location.search + location.hash);
else {
	updatePageMetadata(route);
	const root = document.getElementById("app");
	if (!root) throw new Error("Missing app root");
	const serverRoot = root.querySelector<HTMLElement>("#site");
	const matches =
		serverRoot?.lang === route.locale &&
		serverRoot.dataset.guide === (route.guide ?? "not-found");
	if (!matches) root.replaceChildren();
	const mount = matches ? hydrate : render;
	mount(() => {
		const [currentRoute, setRoute] = createSignal(route);
		const copy = createMemo(() => getTranslation(currentRoute().locale));
		onMount(() => onCleanup(connectNavigation(setRoute)));
		return <App route={currentRoute()} copy={copy()} />;
	}, root);
}
