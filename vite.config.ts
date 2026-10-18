import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig(({ isSsrBuild }) => ({
	plugins: [solid({ ssr: true })],
	build: {
		outDir: isSsrBuild ? ".ssr" : "docs",
		emptyOutDir: true,
		target: "es2022",
	},
}));
