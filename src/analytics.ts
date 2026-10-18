import { analyticsUrl } from "./site";

export function loadAnalytics() {
	if (!["dontasktoask.ir", "www.dontasktoask.ir"].includes(location.hostname))
		return;
	if (document.querySelector("script[data-domain='dontasktoask.ir']")) return;
	const script = document.createElement("script");
	script.defer = true;
	script.dataset.domain = "dontasktoask.ir";
	script.src = `${analyticsUrl}/js/script.outbound-links.js`;
	document.head.append(script);
}
