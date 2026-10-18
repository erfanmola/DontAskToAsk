import type en from "./locales/en.json";
import type { GuideId, Locale } from "./site";

export interface GuideCopy {
	nav: string;
	title: string;
	deck: string;
	before: string;
	beforeResult: string;
	after: string;
	afterResult: string;
	bodyTitle: string;
	bodyOne: string;
	bodyTwo: string;
	note: string;
	checks: string[];
	template: string;
}
export interface Translation {
	ui: typeof en.ui;
	guides: Record<GuideId, GuideCopy>;
	projects: Record<
		keyof typeof en.projects,
		{ title: string; description: string }
	>;
}
const loaders = import.meta.glob<Translation>("./locales/*.json", {
	import: "default",
});
export async function getTranslation(locale: Locale): Promise<Translation> {
	const loader = loaders[`./locales/${locale}.json`];
	if (!loader) throw new Error(`Missing translation: ${locale}`);
	return loader();
}
