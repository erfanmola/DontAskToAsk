export type Stars = { status: "loading" | "ready" | "error"; count?: number };

export function connectStars(update: (stars: Stars) => void): () => void {
	let pending = false;
	let disposed = false;
	let controller: AbortController | undefined;
	async function refresh() {
		if (pending || disposed || document.visibilityState === "hidden") return;
		pending = true;
		update({ status: "loading" });
		controller = new AbortController();
		const timeout = setTimeout(() => controller?.abort(), 8000);
		try {
			const response = await fetch(
				"https://api.github.com/repos/erfanmola/DontAskToAsk",
				{
					cache: "no-store",
					headers: { Accept: "application/vnd.github+json" },
					signal: controller.signal,
				},
			);
			if (!response.ok) throw new Error(`GitHub ${response.status}`);
			const data: { stargazers_count?: unknown } = await response.json();
			if (
				typeof data.stargazers_count !== "number" ||
				!Number.isSafeInteger(data.stargazers_count) ||
				data.stargazers_count < 0
			)
				throw new Error("Invalid star count");
			if (!disposed) update({ status: "ready", count: data.stargazers_count });
		} catch {
			if (!disposed) update({ status: "error" });
		} finally {
			clearTimeout(timeout);
			pending = false;
		}
	}
	const visible = () => {
		if (document.visibilityState === "visible") void refresh();
	};
	void refresh();
	const interval = setInterval(refresh, 300000);
	window.addEventListener("focus", visible);
	window.addEventListener("online", visible);
	document.addEventListener("visibilitychange", visible);
	return () => {
		disposed = true;
		controller?.abort();
		clearInterval(interval);
		window.removeEventListener("focus", visible);
		window.removeEventListener("online", visible);
		document.removeEventListener("visibilitychange", visible);
	};
}
