/** Reveal a theme from the control that changed it, without blocking the fallback. */
export async function revealTheme(
	button: HTMLElement,
	update: () => void,
): Promise<void> {
	if (
		!document.startViewTransition ||
		matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		update();
		return;
	}
	const bounds = button.getBoundingClientRect();
	const x = bounds.left + bounds.width / 2;
	const y = bounds.top + bounds.height / 2;
	const radius = Math.hypot(
		Math.max(x, innerWidth - x),
		Math.max(y, innerHeight - y),
	);
	let updated = false;
	const apply = () => {
		if (!updated) {
			updated = true;
			update();
		}
	};
	let transition: ViewTransition | undefined;
	try {
		transition = document.startViewTransition(apply);
		await transition.ready;
		await document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${radius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 500,
				easing: "cubic-bezier(.22, 1, .36, 1)",
				pseudoElement: "::view-transition-new(root)",
			},
		).finished;
		await transition.finished;
	} catch {
		transition?.skipTransition();
		// A skipped or unsupported animation must still apply the user's choice.
		if (transition) await transition.updateCallbackDone.catch(() => {});
		apply();
	}
}
