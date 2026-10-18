import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { create, type Font } from "fontkit";
import sharp from "sharp";

await mkdir("public", { recursive: true });
const icon = await readFile("public/icon.svg");
for (const [filename, size] of [
	["icon-192.png", 192],
	["icon-512.png", 512],
	["apple-touch-icon.png", 180],
	["favicon-32.png", 32],
] as const)
	await sharp(icon).resize(size, size).png().toFile(`public/${filename}`);
await sharp({
	create: { width: 512, height: 512, channels: 4, background: "#5951c9" },
})
	.composite([
		{ input: await sharp(icon).resize(410, 410).toBuffer(), left: 51, top: 51 },
	])
	.png()
	.toFile("public/icon-maskable-512.png");
// ICO container with PNG images is supported by modern Windows browsers.
const sizes = [16, 32, 48];
const frames = await Promise.all(
	sizes.map((size) => sharp(icon).resize(size, size).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
	const entry = 6 + index * 16;
	header[entry] = sizes[index];
	header[entry + 1] = sizes[index];
	header.writeUInt16LE(1, entry + 4);
	header.writeUInt16LE(32, entry + 6);
	header.writeUInt32LE(frame.length, entry + 8);
	header.writeUInt32LE(offset, entry + 12);
	offset += frame.length;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...frames]));
console.log("Generated favicon, touch, app and maskable icons.");

const font = (name: string, file: string, _weight: number) => {
	const loaded = create(
		readFileSync(`node_modules/@fontsource-variable/${name}/files/${file}`),
	) as Font;
	return loaded;
};
const latin = font("manrope", "manrope-latin-wght-normal.woff2", 800);
const latinRegular = font("manrope", "manrope-latin-wght-normal.woff2", 500);
const persian = font("vazirmatn", "vazirmatn-arabic-wght-normal.woff2", 800);
const persianRegular = font(
	"vazirmatn",
	"vazirmatn-arabic-wght-normal.woff2",
	500,
);
function lettering(
	text: string,
	face: Font,
	size: number,
	x: number,
	y: number,
	fill: string,
	rtl = false,
) {
	const run = face.layout(
		text,
		undefined,
		undefined,
		rtl ? "fa" : "en",
		rtl ? "rtl" : "ltr",
	);
	const scale = size / face.unitsPerEm;
	const width =
		run.positions.reduce((total, position) => total + position.xAdvance, 0) *
		scale;
	let cursor = rtl ? x - width : x;
	return `<g fill="${fill}">${run.glyphs
		.map((glyph, index) => {
			const position = run.positions[index];
			const path = `<path transform="translate(${cursor + position.xOffset * scale} ${y - position.yOffset * scale}) scale(${scale} ${-scale})" d="${glyph.path.toSVG()}"/>`;
			cursor += position.xAdvance * scale;
			return path;
		})
		.join("")}</g>`;
}
const mark = icon
	.toString()
	.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">', "")
	.replace("</svg>", "");
for (const language of ["en", "fa"] as const) {
	const rtl = language === "fa";
	const left = rtl ? 64 : 790;
	const content = `<rect width="1200" height="630" fill="#171b2a"/>
<g transform="translate(${rtl ? 1072 : 60} 45) scale(.135)">${mark}</g>
${lettering(rtl ? "نپرس که بپرسم" : "Don't Ask to Ask", rtl ? persian : latin, rtl ? 24 : 23, rtl ? 1052 : 144, 90, "#edf0fc", rtl)}
${lettering(rtl ? "نپرس که بپرسم." : "Don't ask to ask.", rtl ? persian : latin, rtl ? 74 : 70, rtl ? 1136 : 64, 266, "#edf0fc", rtl)}
${lettering(rtl ? "فقط بپرس." : "Just ask.", rtl ? persian : latin, rtl ? 82 : 82, rtl ? 1136 : 64, 365, "#edf0fc", rtl)}
${lettering(rtl ? "سؤال بهتر، گفت‌وگوی بهتر." : "Better questions. Better conversations.", rtl ? persianRegular : latinRegular, 25, rtl ? 1136 : 68, 448, "#aeb6ce", rtl)}
<rect x="${left}" y="164" width="282" height="108" rx="22" fill="#252a3e"/>
<rect x="${left + 24}" y="190" width="154" height="10" rx="5" fill="#aeb6ce"/>
<rect x="${left + 24}" y="214" width="94" height="10" rx="5" fill="#aeb6ce" opacity=".5"/>
<path d="M${left + 230} 254l28 35v-36" fill="#252a3e"/>
<rect x="${left + 20}" y="313" width="310" height="166" rx="25" fill="#b9b2ff"/>
${lettering("Goal.", latin, 27, left + 47, 357, "#252842")}
${lettering("Context.", latin, 27, left + 47, 399, "#252842")}
${lettering("Question.", latin, 27, left + 47, 441, "#252842")}
<circle cx="${left + 279}" cy="344" r="10" fill="#252842"/>
<path d="M${left + 275} 344l3 3 5-6" fill="none" stroke="#b9b2ff" stroke-width="2" stroke-linecap="round"/>
${lettering("dontasktoask.ir", latinRegular, 19, 67, 570, "#aeb6ce")}
${lettering("SolidJS / TypeScript", latinRegular, 16, 957, 570, "#aeb6ce")}`;
	const svg = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${content}</svg>`,
	);
	await sharp(svg).png().toFile(`public/cover-${language}.png`);
	if (language === "en")
		await sharp(svg)
			.resize(1280, 640, { fit: "contain", background: "#171b2a" })
			.png()
			.toFile("public/github-cover.png");
}
await mkdir("public/font-licenses", { recursive: true });
for (const name of [
	"manrope",
	"vazirmatn",
	"noto-sans-arabic",
	"noto-sans-devanagari",
])
	await writeFile(
		`public/font-licenses/${name}.txt`,
		await readFile(`node_modules/@fontsource-variable/${name}/LICENSE`),
	);
console.log(
	"Generated Persian/English social covers and GitHub artwork with shaped vector lettering.",
);
// Preserve the cover and social-icon URLs used by the previous site.
await writeFile(
	"public/DontAskToAsk.png",
	await readFile("public/cover-fa.png"),
);
await mkdir("public/assets/icons", { recursive: true });
await writeFile(
	"public/assets/icons/android-chrome-512x512.png",
	await readFile("public/icon-512.png"),
);
