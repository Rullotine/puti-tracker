import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BmVYg6nh.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var cloudRegister_createServerFn_handler = createServerRpc({
	id: "23bd0378e4ec83198d282ff3b625fbf356335013869c72bc99f293b4dc9468e3",
	name: "cloudRegister",
	filename: "src/lib/cloud/api.ts"
}, (opts) => cloudRegister.__executeServer(opts));
var cloudRegister = createServerFn({ method: "POST" }).validator((data) => data).handler(cloudRegister_createServerFn_handler, async ({ data }) => {
	return (await import("./cloud.server-DiF6zlmt.mjs")).register(data);
});
var cloudLogin_createServerFn_handler = createServerRpc({
	id: "f28f01621dc52d02dfc02b578f511b540b2c7fb1387b6be367c65c05e7ef034d",
	name: "cloudLogin",
	filename: "src/lib/cloud/api.ts"
}, (opts) => cloudLogin.__executeServer(opts));
var cloudLogin = createServerFn({ method: "POST" }).validator((data) => data).handler(cloudLogin_createServerFn_handler, async ({ data }) => {
	return (await import("./cloud.server-DiF6zlmt.mjs")).login(data);
});
var cloudPull_createServerFn_handler = createServerRpc({
	id: "47b637c7df428224c5521f385dce74e2de3a932d283a5e8310474aa485f41c62",
	name: "cloudPull",
	filename: "src/lib/cloud/api.ts"
}, (opts) => cloudPull.__executeServer(opts));
var cloudPull = createServerFn({ method: "POST" }).validator((data) => data).handler(cloudPull_createServerFn_handler, async ({ data }) => {
	return (await import("./cloud.server-DiF6zlmt.mjs")).pull(data);
});
var cloudPush_createServerFn_handler = createServerRpc({
	id: "427ed08c54ab7ab30e8e7a1ab8459ae9bdbf65ca2b672b77ed815480d55292d3",
	name: "cloudPush",
	filename: "src/lib/cloud/api.ts"
}, (opts) => cloudPush.__executeServer(opts));
var cloudPush = createServerFn({ method: "POST" }).validator((data) => data).handler(cloudPush_createServerFn_handler, async ({ data }) => {
	return (await import("./cloud.server-DiF6zlmt.mjs")).push(data);
});
var cloudLogout_createServerFn_handler = createServerRpc({
	id: "12d2a2fbe473400b70f1f0299a329880a2397d7e47810900f92a15bb954bd26a",
	name: "cloudLogout",
	filename: "src/lib/cloud/api.ts"
}, (opts) => cloudLogout.__executeServer(opts));
var cloudLogout = createServerFn({ method: "POST" }).validator((data) => data).handler(cloudLogout_createServerFn_handler, async ({ data }) => {
	return (await import("./cloud.server-DiF6zlmt.mjs")).logout(data);
});
//#endregion
export { cloudLogin_createServerFn_handler, cloudLogout_createServerFn_handler, cloudPull_createServerFn_handler, cloudPush_createServerFn_handler, cloudRegister_createServerFn_handler };
