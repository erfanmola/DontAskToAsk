import { generateHydrationScript, renderToString } from "solid-js/web";
import { App } from "./App";
import { getTranslation } from "./i18n";
import { parseRoute } from "./site";

export async function renderPage(path: string) {
	const route = parseRoute(path);
	const copy = await getTranslation(route.locale);
	return {
		hydration: generateHydrationScript(),
		html: renderToString(() => <App route={route} copy={copy} />),
		copy,
		route,
	};
}
