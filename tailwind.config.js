/** @type {import('tailwindcss').Config} */
module.exports = {
	// Scan every page in the repo root so utility classes used in markup are kept.
	// Note: classes built dynamically in JS would NOT be seen here — this site only
	// toggles custom classes from main.css (is-preload, inactive, ...), so scanning
	// the HTML is sufficient.
	content: ["./*.html"],
	theme: {
		extend: {},
	},
	plugins: [],
};
