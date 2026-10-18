import {
	createEffect,
	createMemo,
	createSignal,
	For,
	on,
	onCleanup,
	onMount,
	Show,
} from "solid-js";
import { loadAnalytics } from "./analytics";
import type { GuideCopy, Translation } from "./i18n";
import { Icon } from "./icons";
import {
	guides,
	type Locale,
	locales,
	projects,
	type Route,
	repository,
	routePath,
	siteUrl,
} from "./site";
import { connectStars, type Stars } from "./stars";
import { revealTheme } from "./theme";

type Theme = "system" | "light" | "dark";
export function App(props: { route: Route; copy: Translation }) {
	const locale = () => props.route.locale;
	const guideId = () => props.route.guide;
	const t = () => props.copy.ui;
	const guide = () => {
		const id = guideId();
		return id ? props.copy.guides[id] : null;
	};
	const rtl = () => locales[locale()].dir === "rtl";
	const [stars, setStars] = createSignal<Stars>({ status: "loading" });
	const [theme, setTheme] = createSignal<Theme>("system");
	const [darkTheme, setDarkTheme] = createSignal(false);
	const [changingTheme, setChangingTheme] = createSignal(false);
	const [checked, setChecked] = createSignal<boolean[]>([
		false,
		false,
		false,
		false,
	]);
	const [showShare, setShowShare] = createSignal(false);
	const [copyState, setCopyState] = createSignal("");
	let mobileMenu: HTMLDetailsElement | undefined;
	let template: HTMLTextAreaElement | undefined;
	let shareInput: HTMLInputElement | undefined;
	let messageTimer: ReturnType<typeof setTimeout> | undefined;
	const formatter = createMemo(() => new Intl.NumberFormat(locale()));
	const shareUrl = () => `${siteUrl}${routePath(locale(), guideId() ?? "ask")}`;
	function setAppearance(value: Theme) {
		setTheme(value);
		setDarkTheme(value === "dark");
		document.documentElement.dataset.theme = value;
		try {
			localStorage.setItem("appearance", value);
		} catch {
			/* Storage is optional. */
		}
	}
	async function toggleAppearance(button: HTMLButtonElement) {
		if (changingTheme()) return;
		const next = darkTheme() ? "light" : "dark";
		setChangingTheme(true);
		try {
			await revealTheme(button, () => setAppearance(next));
		} finally {
			setChangingTheme(false);
		}
	}
	onMount(() => {
		const systemTheme = matchMedia("(prefers-color-scheme: dark)");
		setDarkTheme(systemTheme.matches);
		try {
			const stored = localStorage.getItem("appearance");
			if (stored === "dark" || stored === "light") setAppearance(stored);
		} catch {
			/* System appearance works without storage. */
		}
		const syncSystemTheme = () => {
			if (theme() === "system") setDarkTheme(systemTheme.matches);
		};
		systemTheme.addEventListener("change", syncSystemTheme);
		onCleanup(() => systemTheme.removeEventListener("change", syncSystemTheme));
		onCleanup(connectStars(setStars));
		loadAnalytics();
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && mobileMenu?.open) {
				mobileMenu.open = false;
				mobileMenu.querySelector("summary")?.focus();
			}
		};
		document.addEventListener("keydown", handleEscape);
		onCleanup(() => document.removeEventListener("keydown", handleEscape));
		if ("serviceWorker" in navigator)
			void navigator.serviceWorker
				.getRegistrations()
				.then((registrations) =>
					Promise.all(
						registrations
							.filter(
								(registration) => registration.scope === `${location.origin}/`,
							)
							.map((registration) => registration.unregister()),
					),
				)
				.catch(() => {});
	});
	createEffect(
		on(
			() => props.route,
			() => {
				setChecked([false, false, false, false]);
				setShowShare(false);
				setCopyState("");
				clearTimeout(messageTimer);
				for (const details of document.querySelectorAll<HTMLDetailsElement>(
					"#site details[open]",
				))
					details.open = false;
				if (template) template.value = guide()?.template ?? "";
			},
			{ defer: true },
		),
	);
	onCleanup(() => clearTimeout(messageTimer));
	async function copyText(
		text: string,
		fallback?: HTMLInputElement | HTMLTextAreaElement,
	) {
		clearTimeout(messageTimer);
		try {
			await navigator.clipboard.writeText(text);
			setCopyState(t().copied);
		} catch {
			fallback?.focus();
			fallback?.select();
			setCopyState(t().copyFailed);
		}
		messageTimer = setTimeout(() => setCopyState(""), 3500);
	}
	const StarsLink = () => (
		<a
			class="dt-quiet dt-star"
			href={repository}
			target="_blank"
			aria-label={
				stars().status === "ready"
					? `${formatter().format(stars().count!)} ${t().stars}`
					: t().github
			}
		>
			<Icon name="star" />
			<span>GitHub</span>
			<span
				data-stars
				role="status"
				aria-live="polite"
				aria-label={
					stars().status === "loading"
						? t().starsLoading
						: stars().status === "error"
							? t().starsUnavailable
							: undefined
				}
			>
				{stars().status === "ready"
					? formatter().format(stars().count!)
					: stars().status === "loading"
						? "…"
						: "—"}
			</span>
		</a>
	);
	const LanguagePicker = () => (
		<details class="language-picker">
			<summary class="dt-quiet">
				<Icon name="languages" />
				<span>{locales[locale()].name}</span>
			</summary>
			<div class="language-options">
				<For each={Object.entries(locales)}>
					{([code, info]) => (
						<a
							href={routePath(code as Locale, guideId() ?? "ask")}
							lang={code}
							dir={info.dir}
							hreflang={code}
							aria-current={locale() === code ? "true" : undefined}
						>
							{info.name}
						</a>
					)}
				</For>
			</div>
		</details>
	);
	const Appearance = () => (
		<button
			type="button"
			class="theme-toggle dt-quiet"
			classList={{ "is-dark": darkTheme() }}
			aria-label={`${t().theme}: ${t().dark}`}
			aria-pressed={darkTheme()}
			aria-disabled={changingTheme()}
			title={`${t().theme}: ${darkTheme() ? t().dark : t().light}`}
			onClick={(event) => void toggleAppearance(event.currentTarget)}
		>
			<span class="theme-icon theme-sun">
				<Icon name="sun" />
			</span>
			<span class="theme-icon theme-moon">
				<Icon name="moon" />
			</span>
		</button>
	);
	const Controls = () => (
		<>
			<StarsLink />
			<LanguagePicker />
			<Appearance />
		</>
	);
	const GuideNav = () => (
		<nav class="dt-nav" aria-label={t().guideLabel}>
			<For
				each={[
					["ask", t().askGroup],
					["respond", t().respondGroup],
					["learn", t().learnGroup],
				]}
			>
				{([group, title]) => (
					<>
						<div class="dt-nav-group-title">{title}</div>
						<For each={guides.filter((item) => item.group === group)}>
							{(item) => (
								<a
									href={routePath(locale(), item.id)}
									aria-current={guideId() === item.id ? "page" : undefined}
								>
									<Icon name={item.icon} />
									<span>{props.copy.guides[item.id].nav}</span>
								</a>
							)}
						</For>
					</>
				)}
			</For>
		</nav>
	);
	const Question = (p: { good?: boolean; data: GuideCopy }) => (
		<article class={`dt-chat${p.good ? " dt-good" : ""}`}>
			<h2 class="dt-chat-label">
				<Icon name={p.good ? "circle-check" : "circle-minus"} />
				<span>{p.good ? t().after : t().before}</span>
			</h2>
			<div class="dt-person">
				<span class="dt-avatar" aria-hidden="true">
					{t().initial}
				</span>
				<span>{t().questionAuthor}</span>
			</div>
			<p class="dt-bubble">
				{(p.good ? p.data.after : p.data.before)
					.split(
						/(Integer\.parseInt|NumberFormatException|yyyy-MM-dd|fetch\("\/api\/send", \{ method: "POST" \}\))/g,
					)
					.map((part, index) =>
						index % 2 ? (
							<bdi>
								<code>{part}</code>
							</bdi>
						) : (
							part
						),
					)}
			</p>
			<div class="dt-chat-result">
				<Icon name={p.good ? "message-circle" : "clock-3"} />
				<span>{p.good ? p.data.afterResult : p.data.beforeResult}</span>
			</div>
		</article>
	);
	return (
		<div
			id="site"
			data-guide={guideId() ?? "not-found"}
			lang={locale()}
			dir={locales[locale()].dir}
		>
			<a href="#main" class="skip-link">
				{t().skip}
			</a>
			<header class="site-header">
				<div class="dt-top">
					<a class="dt-brand" href={routePath(locale(), "ask")}>
						<img src="/icon.svg" width="35" height="35" alt="" />
						<span>{t().brand}</span>
					</a>
					<div class="dt-top-actions">
						<Controls />
					</div>
				</div>
				<details class="mobile-menu" ref={mobileMenu}>
					<summary aria-label={t().menu}>
						<Icon name="menu" />
					</summary>
					<div class="mobile-panel">
						<div class="dt-mobile-controls">
							<Controls />
						</div>
						<GuideNav />
					</div>
				</details>
			</header>
			<div class="dt-shell">
				<aside class="dt-sidebar">
					<GuideNav />
					<p class="dt-sidebar-note">
						<strong>{t().sideTitle}</strong>
						<span>{t().sideBody}</span>
					</p>
				</aside>
				<main class="dt-reading" id="main" tabIndex={-1}>
					<Show
						when={guide()}
						fallback={
							<section class="dt-hero">
								<h1>{t().notFound}</h1>
								<p class="dt-deck">{t().notFoundBody}</p>
								<a class="dt-primary" href={routePath(locale(), "ask")}>
									{t().home}
								</a>
							</section>
						}
					>
						{(data) => (
							<>
								<div class="dt-breadcrumb">
									<Icon name="book-open" />
									<span>{t().guideLabel}</span>
									<span aria-hidden="true">/</span>
									<span>{data().nav}</span>
								</div>
								<section class="dt-hero" aria-labelledby="guide-title">
									<h1 id="guide-title">
										{data()
											.title.split("\n")
											.map((line, index) => (
												<>
													{index > 0 && <br />}
													{line}
												</>
											))}
									</h1>
									<p class="dt-deck">{data().deck}</p>
									<div class="dt-hero-actions">
										<button
											class="dt-primary"
											type="button"
											aria-expanded={showShare()}
											aria-controls="share-guide"
											onClick={() => setShowShare(!showShare())}
										>
											<Icon name="link" />
											{t().share}
										</button>
										<span class="dt-minute">{t().readingTime}</span>
									</div>
									<div
										id="share-guide"
										class="dt-share-box"
										hidden={!showShare()}
									>
										<label for="share-url">{t().shareHelp}</label>
										<div class="copy-row">
											<input
												id="share-url"
												ref={shareInput}
												readOnly
												value={shareUrl()}
												dir="ltr"
											/>
											<button
												type="button"
												class="dt-quiet"
												onClick={() => void copyText(shareUrl(), shareInput)}
											>
												{t().copy}
											</button>
										</div>
									</div>
								</section>
								<section
									class="dt-comparison"
									aria-label={`${t().before} / ${t().after}`}
								>
									<Question data={data()} />
									<Question data={data()} good />
								</section>
								<section class="dt-body" aria-labelledby="body-title">
									<h2 id="body-title">{data().bodyTitle}</h2>
									<p>{data().bodyOne}</p>
									<p>{data().bodyTwo}</p>
									<div class="dt-kind-note">{data().note}</div>
								</section>
								<section class="dt-checklist" aria-labelledby="check-title">
									<div class="dt-section-heading">
										<h2 id="check-title">
											{guideId() === "answer"
												? t().answerCheckTitle
												: t().checkTitle}
										</h2>
										<span class="dt-count" aria-live="polite">
											{t()
												.count.replace(
													"{count}",
													formatter().format(checked().filter(Boolean).length),
												)
												.replace(
													"{total}",
													formatter().format(data().checks.length),
												)}
										</span>
									</div>
									<div class="dt-check-grid">
										<For each={data().checks}>
											{(label, index) => (
												<label class="dt-check">
													<input
														type="checkbox"
														checked={checked()[index()]}
														onChange={(event) =>
															setChecked((values) =>
																values.map((value, i) =>
																	i === index()
																		? event.currentTarget.checked
																		: value,
																),
															)
														}
													/>
													<span>{label}</span>
												</label>
											)}
										</For>
									</div>
									<details class="dt-template">
										<summary>{t().templateTitle}</summary>
										<textarea
											ref={template}
											aria-label={t().templateTitle}
											rows="7"
											value={data().template}
										/>
										<button
											type="button"
											class="dt-quiet"
											onClick={() =>
												void copyText(
													template?.value ?? data().template,
													template,
												)
											}
										>
											{t().copy}
										</button>
									</details>
								</section>
								<div class="copy-status" role="status">
									{copyState()}
								</div>
								<div class="dt-next">
									<span>{t().nextLabel}</span>
									<a
										href={routePath(
											locale(),
											guides[
												(guides.findIndex((item) => item.id === guideId()) +
													1) %
													guides.length
											].id,
										)}
									>
										{
											props.copy.guides[
												guides[
													(guides.findIndex((item) => item.id === guideId()) +
														1) %
														guides.length
												].id
											].nav
										}
										<Icon name={rtl() ? "arrow-left" : "arrow-right"} />
									</a>
								</div>
							</>
						)}
					</Show>
					<section class="dt-projects" aria-labelledby="projects-title">
						<div class="dt-section-heading">
							<h2 id="projects-title">{t().projectTitle}</h2>
						</div>
						<p class="dt-intro">{t().projectsIntro}</p>
						<div class="dt-project-list">
							<For each={projects}>
								{(project) => {
									const copy = () =>
										props.copy.projects[
											project.id as keyof Translation["projects"]
										];
									return (
										<a
											class="dt-project"
											href={
												locale() === "en" && project.enUrl
													? project.enUrl
													: project.url
											}
											target="_blank"
										>
											<span class="dt-project-icon">
												<Icon name={project.icon} />
											</span>
											<div>
												<h3>{copy().title}</h3>
												<p>{copy().description}</p>
												<small>
													<bdi>{new URL(project.url).hostname}</bdi>
												</small>
											</div>
										</a>
									);
								}}
							</For>
						</div>
					</section>
					<details class="sources">
						<summary>{t().sources}</summary>
						<a href="https://dontasktoask.com/" target="_blank">
							Don’t Ask to Ask
						</a>
						<a href="https://nohello.net/" target="_blank">
							No Hello
						</a>
						<a href="https://xyproblem.info/" target="_blank">
							The XY Problem
						</a>
						<a
							href="https://stackoverflow.com/help/minimal-reproducible-example"
							target="_blank"
						>
							Minimal, Reproducible Example
						</a>
						<a
							href="https://github.com/erfanmola/TheBestLanguage"
							target="_blank"
						>
							TheBestLanguage
						</a>
					</details>
				</main>
			</div>
			<footer class="site-footer">
				<div class="dt-footer">
					<span>{t().footer}</span>
					<div class="dt-footer-links">
						<a href={repository} target="_blank">
							<Icon name="git-pull-request" />
							{t().contribute}
						</a>
						<a href="https://developix.ir" target="_blank">
							Developix
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
