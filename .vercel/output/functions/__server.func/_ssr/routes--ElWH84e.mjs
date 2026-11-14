import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--ElWH84e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-surface shadow-[0_0_48px_-10px_var(--color-primary)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-3xl font-bold text-primary",
						children: "T"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Tracker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "loading your space…"
				})
			]
		})
	});
}
function Home() {
	const [App, setApp] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		import("./app-shell-BWuWfks9.mjs").then((mod) => setApp(() => mod.AppShell));
	}, []);
	if (!App) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
