import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CP2Dkh8y.js
var aiChat_createServerFn_handler = createServerRpc({
	id: "efbbadc915482401f598f3c6379440f272758e73a7fe9f71c919d4dcf13b5adb",
	name: "aiChat",
	filename: "src/lib/ai/api.ts"
}, (opts) => aiChat.__executeServer(opts));
var aiChat = createServerFn({ method: "POST" }).validator((data) => data).handler(aiChat_createServerFn_handler, async ({ data }) => {
	return (await import("./ai.server-DO0CpTG4.mjs")).chat(data);
});
//#endregion
export { aiChat_createServerFn_handler };
