import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DomYr5pS.js
var socialCall_createServerFn_handler = createServerRpc({
	id: "b915fbaadf83500a1a1c30538c082b3f2bede60ec749b949c3f3f0ae4b2dd15d",
	name: "socialCall",
	filename: "src/lib/social/api.ts"
}, (opts) => socialCall.__executeServer(opts));
var socialCall = createServerFn({ method: "POST" }).validator((data) => data).handler(socialCall_createServerFn_handler, async ({ data }) => {
	return (await import("./social.server-Bd7uKQIl.mjs")).handle(data);
});
//#endregion
export { socialCall_createServerFn_handler };
