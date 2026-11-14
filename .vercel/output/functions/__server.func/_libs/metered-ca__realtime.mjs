import { r as __exportAll } from "../_runtime.mjs";
//#region node_modules/@metered-ca/realtime/dist/index.mjs
var dist_exports = /* @__PURE__ */ __exportAll({
	MeteredPeer: () => MeteredPeer,
	MeteredPeerOversizedError: () => MeteredPeerOversizedError,
	MeteredPeerReplaceTrackError: () => MeteredPeerReplaceTrackError,
	MeteredPeerSendError: () => MeteredPeerSendError,
	MeteredPeerStateError: () => MeteredPeerStateError,
	NoopLogger: () => NoopLogger,
	OversizedPayloadError: () => OversizedPayloadError,
	SignallingClient: () => SignallingClient,
	SignallingConnectError: () => SignallingConnectError
});
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
/** Drops every log. Default when the customer doesn't supply one. */
var NoopLogger = {
	debug: () => {},
	info: () => {},
	warn: () => {},
	error: () => {}
};
var ONCE_ORIGINAL = Symbol("once-original");
var EventEmitter = class {
	constructor(opts = {}) {
		this.listeners = /* @__PURE__ */ new Map();
		this.warnedEvents = /* @__PURE__ */ new Set();
		this.onListenerError = opts.onListenerError ?? ((err, eventName) => {
			console.error(`[@metered-ca/realtime] listener for "${eventName}" threw`, err);
		});
		this.maxListenersWarn = opts.maxListenersWarn ?? 100;
		this.onListenerWarn = opts.onListenerWarn ?? ((msg, ctx) => {
			console.warn(`[@metered-ca/realtime] ${msg}`, ctx);
		});
	}
	on(event, handler) {
		const list = this.listeners.get(event);
		if (list) list.push(handler);
		else this.listeners.set(event, [handler]);
		this.checkListenerCountThreshold(event);
		return this;
	}
	/**
	* Remove a previously-registered handler. Noop if the handler ref
	* isn't currently registered (matches Node's behaviour — silent).
	* Only removes the FIRST matching entry so `on(e, h); on(e, h);`
	* needs two off() calls to fully unregister, again matching Node.
	*/
	off(event, handler) {
		const list = this.listeners.get(event);
		if (!list) return this;
		const idx = list.findIndex((h) => h === handler || h[ONCE_ORIGINAL] === handler);
		if (idx >= 0) list.splice(idx, 1);
		if (list.length === 0) this.listeners.delete(event);
		if (list.length < this.maxListenersWarn) this.warnedEvents.delete(event);
		return this;
	}
	/**
	* Emit a one-shot warning when an event's listener count crosses
	* the threshold for the first time (or after dropping back below
	* and re-crossing). Customers add listeners in many places —
	* React useEffects, addEventListener-style integrations — so a
	* runaway count usually points at a missing cleanup hook.
	*/
	checkListenerCountThreshold(event) {
		if (this.warnedEvents.has(event)) return;
		const count = this.listeners.get(event)?.length ?? 0;
		if (count < this.maxListenersWarn) return;
		this.warnedEvents.add(event);
		this.onListenerWarn(`EventEmitter: listener count for "${String(event)}" reached ${count}`, {
			event: String(event),
			count,
			threshold: this.maxListenersWarn
		});
	}
	/**
	* Register a one-shot handler. The wrapper auto-removes itself
	* BEFORE invoking the customer's handler, so a handler that
	* re-emits the same event won't infinite-loop (defensive — Node
	* orders the cleanup before invocation for the same reason).
	*/
	once(event, handler) {
		const wrapper = (payload) => {
			this.off(event, wrapper);
			handler(payload);
		};
		wrapper[ONCE_ORIGINAL] = handler;
		return this.on(event, wrapper);
	}
	/**
	* Synchronous dispatch in registration order. Snapshots the list
	* first so a handler that calls .off() on itself or another
	* listener during dispatch doesn't trip the iteration.
	*/
	emit(event, payload) {
		const list = this.listeners.get(event);
		if (!list || list.length === 0) return false;
		const snapshot = list.slice();
		for (const handler of snapshot) try {
			handler(payload);
		} catch (err) {
			this.onListenerError(err, String(event));
		}
		return true;
	}
	/** Test / introspection helper. */
	listenerCount(event) {
		return this.listeners.get(event)?.length ?? 0;
	}
	/** Remove every handler for every event. */
	removeAllListeners() {
		this.listeners.clear();
		this.warnedEvents.clear();
		return this;
	}
};
var DEFAULT_URL = "wss://rms.metered.ca";
var WS_PATH = "/v1";
/**
* Validate a customer-supplied base URL. Runs at SignallingClient
* construction, so misconfigurations surface immediately instead of
* mid-connect with a confusing close code.
*
* Rules:
*   - Must parse as a URL (TypeError otherwise)
*   - Protocol MUST be wss: — except plaintext ws: is allowed for
*     localhost / 127.0.0.1 / ::1 (dev convenience; never accept
*     plaintext over the network because the credential is in the
*     query string)
*   - Pathname MUST be "/" — the SDK appends "/v1" itself. A
*     customer typo like `wss://host/foo` would otherwise silently
*     become `wss://host/foo/v1?...` and confuse server-side path
*     routing.
*   - No trailing slash distinction — both "wss://host" and
*     "wss://host/" normalize to the same canonical form.
*
* Returns the normalized origin (no trailing slash, no pathname).
*/
function validateBaseUrl(baseUrl) {
	let parsed;
	try {
		parsed = new URL(baseUrl);
	} catch {
		throw new TypeError(`SignallingClient: invalid 'url' option — '${baseUrl}' is not a parseable URL`);
	}
	const isLocalhost = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1" || parsed.hostname === "[::1]" || parsed.hostname === "::1";
	if (parsed.protocol === "ws:") {
		if (!isLocalhost) throw new TypeError(`SignallingClient: insecure 'ws:' is only allowed for localhost — got '${baseUrl}'. Use 'wss:' in production; the credential travels in the URL query string and plaintext WebSocket exposes it on the wire.`);
	} else if (parsed.protocol !== "wss:") throw new TypeError(`SignallingClient: 'url' protocol must be 'wss:' (or 'ws:' for localhost) — got '${parsed.protocol}'`);
	if (parsed.pathname !== "/" && parsed.pathname !== "") throw new TypeError(`SignallingClient: 'url' must not include a path — got '${parsed.pathname}'. the SDK appends the '/v1' path itself.`);
	if (parsed.search.length > 0 || parsed.hash.length > 0) throw new TypeError(`SignallingClient: 'url' must not include query / hash — got '${baseUrl}'`);
	return parsed.origin;
}
/**
* Build the final connect URL. `baseOrigin` must already be a
* validated origin from validateBaseUrl (or the default constant).
*/
function buildConnectUrl(baseOrigin, cred) {
	return `${baseOrigin}${WS_PATH}?${cred.kind === "apiKey" ? "key" : "token"}=${encodeURIComponent(cred.value)}`;
}
var _CredentialStore_source;
var CredentialStore = class CredentialStore {
	constructor(source) {
		_CredentialStore_source.set(this, void 0);
		__classPrivateFieldSet(this, _CredentialStore_source, source, "f");
	}
	static fromApiKey(apiKey) {
		return new CredentialStore({
			kind: "apiKey",
			value: apiKey
		});
	}
	static fromTokenProvider(provider) {
		return new CredentialStore({
			kind: "tokenProvider",
			provider
		});
	}
	/** Tells the SignallingClient whether to apply a tokenProvider timeout. */
	get isTokenProvider() {
		return __classPrivateFieldGet(this, _CredentialStore_source, "f").kind === "tokenProvider";
	}
	/**
	* Sync resolution for the apiKey path. Returns the credential or
	* null if this store holds a tokenProvider — caller must then use
	* resolveToken().
	*
	* Split into sync/async paths so the apiKey case doesn't gratuitously
	* yield a microtask before opening the socket — tests + integrations
	* rely on the socket being created in the same task as connect().
	*/
	resolveSync() {
		if (__classPrivateFieldGet(this, _CredentialStore_source, "f").kind === "apiKey") return {
			kind: "apiKey",
			value: __classPrivateFieldGet(this, _CredentialStore_source, "f").value
		};
		return null;
	}
	/**
	* Async resolution for the tokenProvider path. Invokes the
	* customer's function and awaits it. The CALLER (signalling-client)
	* wraps this in a Promise.race-with-timeout so a hanging mint
	* endpoint can't hang connect() forever.
	*
	* Throws if called against an apiKey store — that path uses
	* resolveSync().
	*/
	async resolveToken() {
		if (__classPrivateFieldGet(this, _CredentialStore_source, "f").kind !== "tokenProvider") throw new Error("CredentialStore.resolveToken: not a tokenProvider — use resolveSync()");
		const token = await __classPrivateFieldGet(this, _CredentialStore_source, "f").provider();
		if (typeof token !== "string" || token.length === 0) throw new Error("tokenProvider returned an empty token");
		return {
			kind: "token",
			value: token
		};
	}
	/**
	* Custom JSON marshal — never leaks the credential. If Sentry /
	* console.dir / structuredClone tries to serialize a SignallingClient,
	* the embedded CredentialStore looks like `{}`. Belt-and-braces on
	* top of the private-field isolation.
	*/
	toJSON() {
		return {};
	}
};
_CredentialStore_source = /* @__PURE__ */ new WeakMap();
var SECRET_QUERY_PARAMS = ["token", "key"];
/**
* SDP attribute fields that carry TURN/ICE secrets. libwebrtc and
* Chromium's SDP parser interpolate offending source lines into
* parse-error messages — so an Error whose message contains
* "Failed to parse a=ice-pwd:SECRET..." can land in a customer's
* Sentry/Datadog if they wire `.on('negotiation-error', e => report(e.err))`.
*
* The patterns match SDP-style `field:value` AND URL/JSON-style
* `field=value`, anchored on field-name boundaries so a substring
* like "credential" inside a longer identifier doesn't get clobbered.
* Value is greedy up to the next whitespace / quote / comma / semicolon
* — covers real-world error-message shapes without over-scrubbing.
*/
var SDP_SECRET_FIELDS = [
	"ice-pwd",
	"ice-ufrag",
	"credential"
];
/**
* Replace `?token=…` / `&key=…` query-param values in any string
* with `<param>=***`. Idempotent and safe to call on strings that
* don't contain a URL.
*/
function scrubCredentialQueryParams(text) {
	let out = text;
	for (const p of SECRET_QUERY_PARAMS) {
		const re = new RegExp(`([?&])${p}=[^&\\s"']*`, "g");
		out = out.replace(re, `$1${p}=***`);
	}
	return out;
}
/**
* Replace SDP credential attributes like `a=ice-pwd:VAL` or
* `credential=VAL` (URL-style) with `<field>:***`. Catches both `:`
* and `=` separators with optional surrounding whitespace, and stops
* at the next whitespace / quote / comma / semicolon. Idempotent.
*
* Necessary on top of `scrubCredentialQueryParams` because WebRTC
* error messages don't go through URL query-param shapes — they
* interpolate SDP attribute lines directly.
*/
function scrubSdpCredentials(text) {
	let out = text;
	for (const f of SDP_SECRET_FIELDS) {
		const re = new RegExp(`(^|[^A-Za-z0-9_-])(${f})\\s*[:=]\\s*(?:"[^"]*"|'[^']*'|[^\\s,;]+)`, "gi");
		out = out.replace(re, `$1$2:***`);
	}
	return out;
}
/**
* Wrap an error so its `.message` / `.stack` has any embedded
* credential scrubbed. Returns a new Error (not a mutation) so the
* original prototype chain (e.g. `SyntaxError` from `new URL()`) is
* preserved on the cause field for debug purposes.
*
* If the input isn't an Error, coerce safely without leaking the
* raw value when it might be a serialized credential.
*
* Applies BOTH the query-param scrub (token/key in URLs) and the
* SDP-field scrub (ice-pwd / ice-ufrag / credential in SDP errors)
* — both layers are cheap, and a single emission site might carry
* either shape depending on which underlying throw bubbled up.
*/
function scrubError(err) {
	const scrub = (s) => scrubSdpCredentials(scrubCredentialQueryParams(s));
	if (err instanceof Error) {
		const scrubbed = new Error(scrub(err.message));
		scrubbed.name = err.name;
		if (typeof err.stack === "string") scrubbed.stack = scrub(err.stack);
		return scrubbed;
	}
	return new Error(scrub(String(err)));
}
var cachedEncoder;
function utf8ByteLength(s) {
	if (typeof TextEncoder !== "undefined") {
		if (cachedEncoder === void 0) cachedEncoder = new TextEncoder();
		return cachedEncoder.encode(s).length;
	}
	let bytes = 0;
	for (let i = 0; i < s.length; i++) {
		const code = s.charCodeAt(i);
		if (code < 128) bytes += 1;
		else if (code < 2048) bytes += 2;
		else if (code >= 55296 && code <= 56319 && i + 1 < s.length && s.charCodeAt(i + 1) >= 56320 && s.charCodeAt(i + 1) <= 57343) {
			bytes += 4;
			i++;
		} else bytes += 3;
	}
	return bytes;
}
/**
* The four IANA-registered ICE URL schemes. Matched case-insensitively
* — `STUN:` and `stun:` are both legal per the RFC.
*
* Anything else (`javascript:`, `http:`, `file:`, `data:`, …) is
* rejected. RTCPeerConnection itself would also reject them at
* construction; this is the SDK's first line of defense so the bad
* URL never reaches a customer's UI render path.
*/
var ALLOWED_ICE_SCHEMES = /^(stuns?|turns?):/i;
/**
* Per-field byte caps. Generous against real-world TURN configs but
* tight enough that a hostile sk_ key can't smuggle multi-megabyte
* blobs through to crash the customer's UI parser.
*
*   urls:       512 chars per URL — TURN URLs are typically <120
*   username:   1024 — TURN usernames embed timestamps + signatures
*   credential: 1024 — HMAC-SHA1 base64 fits in well under this
*
* Total iceServer ENTRIES capped at 16: real customers ship 1–5
* TURN endpoints; 16 leaves headroom without enabling an entry-count
* DoS.
*/
var MAX_URL_LEN = 512;
var MAX_USERNAME_LEN = 1024;
var MAX_CREDENTIAL_LEN = 1024;
var MAX_ENTRIES = 16;
function isString$1(v) {
	return typeof v === "string";
}
function isRecord$1(v) {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
/**
* Walks the welcome's `metadata` JSON looking for the conventional
* `iceServers` array. Returns undefined on ANY validation failure —
* fail-closed semantics: a partially-poisoned iceServers list is
* indistinguishable from a fully-poisoned one from the customer's
* perspective, so the SDK falls back to STUN-only / host candidates
* rather than silently dropping just the bad entries.
*
* Rejections:
*   - metadata absent / non-object
*   - metadata.iceServers absent / non-array
*   - > MAX_ENTRIES entries
*   - entry has non-string-or-string-array `urls`
*   - any URL fails the scheme allowlist (stun/stuns/turn/turns)
*   - any URL longer than MAX_URL_LEN
*   - username or credential present but longer than its cap
*
* Non-string username / credential fields on otherwise-valid entries
* are silently dropped (the entry stays, just without those fields).
* That mirrors what real RTCPeerConnection would do.
*/
function extractIceServersFromMetadata(metadata) {
	if (!isRecord$1(metadata)) return void 0;
	const raw = metadata.iceServers;
	if (!Array.isArray(raw)) return void 0;
	if (raw.length > MAX_ENTRIES) return void 0;
	const out = [];
	for (const entry of raw) {
		if (!isRecord$1(entry)) return void 0;
		const urls = entry.urls;
		if (!isValidUrlsField(urls)) return void 0;
		const item = { urls };
		if (isString$1(entry.username)) {
			if (entry.username.length > MAX_USERNAME_LEN) return void 0;
			item.username = entry.username;
		}
		if (isString$1(entry.credential)) {
			if (entry.credential.length > MAX_CREDENTIAL_LEN) return void 0;
			item.credential = entry.credential;
		}
		out.push(item);
	}
	return out;
}
/**
* Validate the `urls` field shape (string OR string-array) AND every
* member's scheme + length. Returns true iff every URL passes.
*/
function isValidUrlsField(v) {
	if (isString$1(v)) return isAllowedIceUrl(v);
	if (!Array.isArray(v)) return false;
	if (v.length === 0) return false;
	return v.every((u) => isString$1(u) && isAllowedIceUrl(u));
}
function isAllowedIceUrl(url) {
	if (url.length === 0 || url.length > MAX_URL_LEN) return false;
	return ALLOWED_ICE_SCHEMES.test(url);
}
function isRecord(v) {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isString(v) {
	return typeof v === "string";
}
function isNumber(v) {
	return typeof v === "number" && Number.isFinite(v);
}
function malformed(reason, raw) {
	return {
		type: "_malformed",
		reason,
		raw
	};
}
function parsePresencePeers(v) {
	if (!Array.isArray(v)) return null;
	const out = [];
	for (const entry of v) {
		if (!isRecord(entry)) return null;
		if (!isString(entry.peerId)) return null;
		const peer = { peerId: entry.peerId };
		if (isRecord(entry.metadata)) peer.metadata = entry.metadata;
		out.push(peer);
	}
	return out;
}
function parseServerFrame(raw) {
	let env;
	try {
		env = JSON.parse(raw);
	} catch {
		return malformed("invalid JSON");
	}
	if (!isRecord(env)) return malformed("envelope must be an object");
	const type = env.type;
	if (!isString(type)) return malformed("missing or non-string type");
	switch (type) {
		case "welcome": {
			if (!isString(env.peerId)) return malformed("welcome.peerId missing", env);
			const expRaw = env.expiresAt;
			if (expRaw !== null && !isNumber(expRaw)) return malformed("welcome.expiresAt must be number or null", env);
			if (!isNumber(env.serverTime)) return malformed("welcome.serverTime missing", env);
			if (!isNumber(env.maxMessageSize)) return malformed("welcome.maxMessageSize missing", env);
			const payload = {
				peerId: env.peerId,
				expiresAt: expRaw === null ? null : expRaw,
				serverTime: env.serverTime,
				maxMessageSize: env.maxMessageSize
			};
			if (isRecord(env.metadata)) payload.metadata = env.metadata;
			return {
				type: "welcome",
				payload
			};
		}
		case "ack":
			if (!isString(env.requestId)) return malformed("ack.requestId missing", env);
			return {
				type: "ack",
				requestId: env.requestId
			};
		case "error": {
			if (!isString(env.code) || env.code.length === 0) return malformed("error.code missing", env);
			const payload = { code: env.code };
			if (isString(env.requestId)) payload.requestId = env.requestId;
			if (isString(env.message)) payload.message = env.message;
			return {
				type: "error",
				payload
			};
		}
		case "message": {
			if (!isString(env.channel)) return malformed("message.channel missing", env);
			if (!isString(env.from)) return malformed("message.from missing", env);
			if (!("data" in env)) return malformed("message.data missing", env);
			const payload = {
				channel: env.channel,
				from: env.from,
				data: env.data
			};
			if (isRecord(env.fromMetadata)) payload.fromMetadata = env.fromMetadata;
			return {
				type: "message",
				payload
			};
		}
		case "direct": {
			if (!isString(env.from)) return malformed("direct.from missing", env);
			if (!("data" in env)) return malformed("direct.data missing", env);
			const payload = {
				from: env.from,
				data: env.data
			};
			if (isRecord(env.fromMetadata)) payload.fromMetadata = env.fromMetadata;
			return {
				type: "direct",
				payload
			};
		}
		case "presence": {
			if (!isString(env.channel)) return malformed("presence.channel missing", env);
			const joined = parsePresencePeers(env.joined);
			const left = parsePresencePeers(env.left);
			if (joined === null) return malformed("presence.joined invalid", env);
			if (left === null) return malformed("presence.left invalid", env);
			return {
				type: "presence",
				payload: {
					channel: env.channel,
					joined,
					left
				}
			};
		}
		case "going_away": return {
			type: "going_away",
			payload: { retryAfterMs: isNumber(env.retryAfterMs) && env.retryAfterMs > 0 ? env.retryAfterMs : 1e3 }
		};
		case "pong": return { type: "pong" };
		default: return malformed(`unknown type: ${type}`, env);
	}
}
/** Hard cap matching the server's MAX_REQUEST_ID_LENGTH (128 chars). */
var MAX_REQUEST_ID_LENGTH = 128;
/** Hard cap matching the server's MAX_CHANNEL_LENGTH. */
var MAX_CHANNEL_LENGTH = 256;
/** Hard cap matching the server's MAX_PEER_ID_LENGTH. */
var MAX_PEER_ID_LENGTH = 128;
function hasControlChars(s) {
	for (let i = 0; i < s.length; i++) {
		const code = s.charCodeAt(i);
		if (code <= 31 || code === 127 || code >= 128 && code <= 159) return true;
	}
	return false;
}
function validateChannel(channel) {
	if (typeof channel !== "string" || channel.length === 0) throw new TypeError("channel must be a non-empty string");
	if (channel.length > MAX_CHANNEL_LENGTH) throw new TypeError(`channel exceeds ${MAX_CHANNEL_LENGTH}-char cap (got ${channel.length})`);
	if (hasControlChars(channel)) throw new TypeError("channel contains control characters");
}
function validatePeerId(peerId) {
	if (typeof peerId !== "string" || peerId.length === 0) throw new TypeError("peerId must be a non-empty string");
	if (peerId.length > MAX_PEER_ID_LENGTH) throw new TypeError(`peerId exceeds ${MAX_PEER_ID_LENGTH}-char cap (got ${peerId.length})`);
	if (hasControlChars(peerId)) throw new TypeError("peerId contains control characters");
}
function validateRequestId(requestId) {
	if (requestId === void 0) return;
	if (typeof requestId !== "string" || requestId.length === 0) throw new TypeError("requestId must be a non-empty string when provided");
	if (requestId.length > MAX_REQUEST_ID_LENGTH) throw new TypeError(`requestId exceeds ${MAX_REQUEST_ID_LENGTH}-char cap (got ${requestId.length})`);
}
function buildSubscribe(channel, opts = {}) {
	validateChannel(channel);
	validateRequestId(opts.requestId);
	const frame = {
		type: "subscribe",
		channel
	};
	if (opts.requestId !== void 0) frame.requestId = opts.requestId;
	if (opts.includeSenderMetadata) frame.includeSenderMetadata = true;
	return JSON.stringify(frame);
}
function buildUnsubscribe(channel, opts = {}) {
	validateChannel(channel);
	validateRequestId(opts.requestId);
	const frame = {
		type: "unsubscribe",
		channel
	};
	if (opts.requestId !== void 0) frame.requestId = opts.requestId;
	return JSON.stringify(frame);
}
function buildPublish(channel, data, opts = {}) {
	validateChannel(channel);
	validateRequestId(opts.requestId);
	if (data === void 0) throw new TypeError("publish data must not be undefined");
	const frame = {
		type: "publish",
		channel,
		data
	};
	if (opts.requestId !== void 0) frame.requestId = opts.requestId;
	return JSON.stringify(frame);
}
function buildSend(toPeerId, data, opts = {}) {
	validatePeerId(toPeerId);
	validateRequestId(opts.requestId);
	if (data === void 0) throw new TypeError("send data must not be undefined");
	const frame = {
		type: "send",
		to: toPeerId,
		data
	};
	if (opts.requestId !== void 0) frame.requestId = opts.requestId;
	return JSON.stringify(frame);
}
/** Heartbeat ping (fire-and-forget; no requestId). Server replies pong. */
function buildPing() {
	return JSON.stringify({ type: "ping" });
}
/**
* Generate a request-id for ack correlation. RFC 4122 v4 via
* crypto.randomUUID() where available; fallback to a 22-char
* base36 random string otherwise (some embedded WebView contexts
* lack crypto.randomUUID).
*
* Length stays well under the 128-char server cap regardless of
* path so we never hit MAX_REQUEST_ID_LENGTH.
*/
function generateRequestId() {
	const c = globalThis.crypto;
	if (c && typeof c.randomUUID === "function") return c.randomUUID();
	return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 22);
}
var _SignallingClientImpl_credential;
var WELCOME_TIMEOUT_MS = 1e4;
var DEFAULT_ACK_TIMEOUT_MS = 15e3;
var DEFAULT_INACTIVITY_TIMEOUT_MS = 6e4;
var DEFAULT_RECONNECT = {
	initialDelayMs: 500,
	multiplier: 2,
	maxDelayMs: 3e4,
	jitterRatio: .2,
	maxAttempts: 100
};
var DEFAULT_TOKEN_PROVIDER_TIMEOUT_MS = 1e4;
var CLOSE_FLUSH_TIMEOUT_MS = 1e3;
var MAX_INBOUND_FRAME_BYTES = 1048576;
var TOKEN_PROVIDER_FAILURE_EVENT_THRESHOLD = 3;
var TERMINAL_CLOSE_CODES = /* @__PURE__ */ new Set([
	4001,
	4003,
	4012,
	4020
]);
var SUBSCRIBE_REPLAY_MAX_RETRIES = 3;
var SUBSCRIBE_REPLAY_RETRY_DELAY_MS = 2e3;
var SLOW_BACKOFF_CLOSE_CODES = /* @__PURE__ */ new Set([4010]);
var SLOW_BACKOFF_FLOOR_MS = 3e4;
/**
* Validate resolved reconnect knobs at construction. Garbage values
* don't fail loudly on their own — `multiplier: 0` or a NaN delay
* produces `setTimeout(NaN)` / 0 ms delays, i.e. a hot reconnect loop
* hammering the server — so reject them here, where the stack trace
* points at the customer's config.
*/
function validateReconnectOptions(o) {
	const finite = (v) => typeof v === "number" && Number.isFinite(v);
	if (!finite(o.initialDelayMs) || o.initialDelayMs < 0) throw new TypeError("SignallingClient: reconnect.initialDelayMs must be a finite number >= 0");
	if (!finite(o.multiplier) || o.multiplier < 1) throw new TypeError("SignallingClient: reconnect.multiplier must be a finite number >= 1 (use 1 for a constant delay)");
	if (!finite(o.maxDelayMs) || o.maxDelayMs < 0) throw new TypeError("SignallingClient: reconnect.maxDelayMs must be a finite number >= 0");
	if (!finite(o.jitterRatio) || o.jitterRatio < 0 || o.jitterRatio > 1) throw new TypeError("SignallingClient: reconnect.jitterRatio must be a finite number between 0 and 1");
	if (o.maxAttempts !== Infinity && (!Number.isInteger(o.maxAttempts) || o.maxAttempts < 1)) throw new TypeError("SignallingClient: reconnect.maxAttempts must be a positive integer or Infinity");
}
/**
* Error thrown when the server closes the connection with a 4xxx
* close code (auth failure, quota exceeded, admin kick). The
* `closeCode` field lets customers branch on the specific reason.
*
* `message` is a fixed string that NEVER interpolates server-supplied
* `reason` text — a malicious server could otherwise stuff control
* characters or HTML-ish content into a customer's
* `console.error(err.message)` output, or into a UI surface that
* renders `error.message`. The full server reason is available as
* the `closeReason` field for customers who explicitly need it.
*/
var SignallingConnectError = class extends Error {
	constructor(closeCode, closeReason) {
		super(`signalling connection closed before welcome (closeCode=${closeCode})`);
		this.name = "SignallingConnectError";
		this.closeCode = closeCode;
		this.closeReason = closeReason;
	}
};
var DEFAULT_MAX_MESSAGE_SIZE = 65536;
/**
* Thrown by `publish()` / `send()` when the JSON-serialized payload
* exceeds the server's per-message cap (advertised on the `connected`
* event as `maxMessageSize`). Rejecting client-side keeps the
* connection alive — an oversized frame reaching the server would
* close the socket with code 1009 and take every subscription down
* with it. Branch on `instanceof` or `err.name ===
* "OversizedPayloadError"`; the `size` / `cap` fields carry the
* measured payload size and the active limit in bytes.
*/
var OversizedPayloadError = class extends Error {
	constructor(size, cap) {
		super(`payload ${size} bytes exceeds server cap ${cap} bytes`);
		this.name = "OversizedPayloadError";
		this.size = size;
		this.cap = cap;
	}
};
var SignallingClientImpl = class {
	constructor(opts) {
		this._state = "idle";
		this.socket = null;
		_SignallingClientImpl_credential.set(this, void 0);
		this.pendingAcks = /* @__PURE__ */ new Map();
		this.welcomeResolver = null;
		this.inactivityTimer = null;
		this.heartbeatTimer = null;
		this.explicitlyClosed = false;
		this.reconnectAttempts = 0;
		this.reconnectTimer = null;
		this.consecutiveTokenFailures = 0;
		this.nextDelayFloorMs = null;
		this.lastCloseCode = null;
		this.activeSubscriptions = /* @__PURE__ */ new Map();
		this.replayRetryCounts = /* @__PURE__ */ new Map();
		this.replayRetryTimers = /* @__PURE__ */ new Set();
		this.connectEpoch = 0;
		this.serverMaxMessageSize = null;
		this.wasEverConnected = false;
		if (opts.apiKey && opts.tokenProvider) throw new TypeError("SignallingClient: pass exactly one of `apiKey` or `tokenProvider`, not both");
		if (!opts.apiKey && !opts.tokenProvider) throw new TypeError("SignallingClient: one of `apiKey` or `tokenProvider` is required");
		__classPrivateFieldSet(this, _SignallingClientImpl_credential, opts.apiKey ? CredentialStore.fromApiKey(opts.apiKey) : CredentialStore.fromTokenProvider(opts.tokenProvider), "f");
		this.baseOrigin = validateBaseUrl(opts.url ?? DEFAULT_URL);
		this.logger = opts.logger ?? NoopLogger;
		if (opts.inactivityTimeoutMs !== void 0 && Number.isNaN(opts.inactivityTimeoutMs)) throw new TypeError("SignallingClient: inactivityTimeoutMs must be a number (<= 0 disables the watchdog)");
		this.inactivityTimeoutMs = opts.inactivityTimeoutMs ?? DEFAULT_INACTIVITY_TIMEOUT_MS;
		this.heartbeatIntervalMs = Number.isFinite(this.inactivityTimeoutMs) && this.inactivityTimeoutMs > 0 ? Math.max(1e3, Math.floor(this.inactivityTimeoutMs / 3)) : 0;
		if (opts.tokenProviderTimeoutMs !== void 0 && (typeof opts.tokenProviderTimeoutMs !== "number" || !Number.isFinite(opts.tokenProviderTimeoutMs) || opts.tokenProviderTimeoutMs <= 0)) throw new TypeError("SignallingClient: tokenProviderTimeoutMs must be a finite number > 0");
		this.tokenProviderTimeoutMs = opts.tokenProviderTimeoutMs ?? DEFAULT_TOKEN_PROVIDER_TIMEOUT_MS;
		this.autoResubscribe = opts.autoResubscribe !== false;
		if (opts.reconnect === false) this.reconnectOpts = null;
		else {
			this.reconnectOpts = {
				...DEFAULT_RECONNECT,
				...opts.reconnect ?? {}
			};
			validateReconnectOptions(this.reconnectOpts);
		}
		if (opts.webSocketFactory) this.webSocketFactory = opts.webSocketFactory;
		else {
			const globalWS = globalThis.WebSocket;
			if (!globalWS) throw new Error("SignallingClient: no globalThis.WebSocket — pass `webSocketFactory` in options");
			this.webSocketFactory = (u) => new globalWS(u);
		}
		const onListenerError = (err, ev) => {
			this.logger.error("listener threw", {
				event: ev,
				err: String(err)
			});
		};
		this.events = new EventEmitter({ onListenerError });
	}
	/**
	* Custom JSON marshal — any Sentry breadcrumb / console.dir
	* snapshot that walks the SignallingClient sees an empty shape
	* instead of the credential, socket internals, or pending-ack
	* map (which could include sensitive customer payloads). Belt-
	* and-braces on top of the CredentialStore's own isolation.
	*/
	toJSON() {
		return { state: this._state };
	}
	get state() {
		return this._state;
	}
	/**
	* Public entry point. The caller awaits this for the FIRST connect;
	* subsequent reconnects after a drop happen automatically through
	* the close handler and don't go through this method.
	*/
	async connect() {
		if (this._state !== "idle" && this._state !== "closed") throw new Error(`SignallingClient.connect: invalid state '${this._state}'`);
		this.explicitlyClosed = false;
		this.reconnectAttempts = 0;
		this.wasEverConnected = false;
		return this.openSocket();
	}
	/**
	* Open a WS connection. Used by:
	*   1. The public connect() — caller awaits the returned promise
	*   2. The reconnect timer — caller doesn't await; the returned
	*      promise's rejection is caught internally and triggers
	*      another scheduled reconnect (until maxAttempts)
	*
	* Credential resolution is split into sync (apiKey) and async
	* (tokenProvider) paths so the apiKey case opens the socket in
	* the same task as the connect() call — preserving the
	* "factory-called-synchronously" contract that integration
	* harnesses rely on.
	*/
	async openSocket() {
		const epoch = ++this.connectEpoch;
		this.transitionTo(this.reconnectAttempts > 0 ? "reconnecting" : "connecting");
		let cred;
		const sync = __classPrivateFieldGet(this, _SignallingClientImpl_credential, "f").resolveSync();
		if (sync) cred = sync;
		else try {
			cred = await this.resolveTokenWithTimeout();
			this.consecutiveTokenFailures = 0;
		} catch (err) {
			const scrubbed = scrubError(err);
			this.consecutiveTokenFailures += 1;
			if (this.consecutiveTokenFailures >= TOKEN_PROVIDER_FAILURE_EVENT_THRESHOLD) this.events.emit("token-provider-error", {
				consecutiveFailures: this.consecutiveTokenFailures,
				err: scrubbed
			});
			if (this.shouldScheduleReconnect(null)) {
				this.logger.warn("credential resolve failed; scheduling reconnect", {
					err: scrubbed.message,
					consecutiveFailures: this.consecutiveTokenFailures
				});
				this.scheduleReconnect();
				return;
			}
			this.transitionTo("closed");
			throw scrubbed;
		}
		if (epoch !== this.connectEpoch) {
			this.logger.debug("openSocket aborted: superseded by a newer connect during credential resolution");
			throw new Error("SignallingClient.connect: superseded by a newer connect()");
		}
		if (this.explicitlyClosed) {
			this.logger.debug("openSocket aborted: client closed during credential resolution");
			if (this._state !== "closed") this.transitionTo("closed");
			return;
		}
		const url = buildConnectUrl(this.baseOrigin, cred);
		this.logger.debug("opening socket", {
			url: scrubCredentialQueryParams(url),
			attempt: this.reconnectAttempts
		});
		return new Promise((resolveConnect, rejectConnect) => {
			let socket;
			try {
				socket = this.webSocketFactory(url);
			} catch (err) {
				rejectConnect(scrubError(err));
				this.handleClose(1006, "websocket construction failed");
				return;
			}
			this.socket = socket;
			const resolver = {
				resolve: () => {
					this.reconnectAttempts = 0;
					this.wasEverConnected = true;
					this.transitionTo("connected");
					resolveConnect();
				},
				reject: (err) => {
					rejectConnect(err);
				},
				timer: setTimeout(() => {
					if (this.welcomeResolver !== resolver) return;
					this.welcomeResolver = null;
					resolver.reject(/* @__PURE__ */ new Error(`no welcome frame within ${WELCOME_TIMEOUT_MS}ms`));
					try {
						socket.close(4e3, "welcome timeout");
					} catch {}
				}, WELCOME_TIMEOUT_MS)
			};
			this.welcomeResolver = resolver;
			const ownedSocket = socket;
			const onOpen = () => {
				this.logger.debug("ws open");
				this.armInactivityTimer(ownedSocket);
				this.armHeartbeatTimer(ownedSocket);
			};
			const onMessage = (ev) => {
				const data = ev.data;
				if (typeof data !== "string") {
					this.logger.warn("ws non-string frame, dropping");
					return;
				}
				if (data.length > MAX_INBOUND_FRAME_BYTES) {
					this.logger.warn("ws frame exceeds size cap, closing connection", {
						size: data.length,
						cap: MAX_INBOUND_FRAME_BYTES
					});
					try {
						ownedSocket.close(1009, "frame exceeded client cap");
					} catch {}
					return;
				}
				this.armInactivityTimer(ownedSocket);
				this.armHeartbeatTimer(ownedSocket);
				this.handleFrame(data, ownedSocket);
			};
			const onClose = (ev) => {
				const code = ev.code ?? 1006;
				const reason = ev.reason ?? "";
				if (this.socket !== ownedSocket && this.socket !== null) {
					this.logger.warn("ignoring close event from stale socket", { code });
					return;
				}
				ownedSocket.removeEventListener("open", onOpen);
				ownedSocket.removeEventListener("message", onMessage);
				ownedSocket.removeEventListener("close", onClose);
				ownedSocket.removeEventListener("error", onError);
				this.handleClose(code, reason);
			};
			const onError = () => {
				this.logger.warn("ws error event");
			};
			ownedSocket.addEventListener("open", onOpen);
			ownedSocket.addEventListener("message", onMessage);
			ownedSocket.addEventListener("close", onClose);
			ownedSocket.addEventListener("error", onError);
		});
	}
	/**
	* Replay every tracked subscription as a fresh subscribe frame on
	* the new connection. Called from the welcome handler when
	* isReconnect=true and autoResubscribe is on.
	*
	* Failure handling: a replay whose ack is lost or that the server
	* rejects (transient authorization hiccup, rate pressure at
	* reconnect time) is retried up to SUBSCRIBE_REPLAY_MAX_RETRIES
	* times on this connection, spaced SUBSCRIBE_REPLAY_RETRY_DELAY_MS
	* apart. Without the retry the subscription would be silently dead
	* until the NEXT reconnect — the exact failure mode autoResubscribe
	* exists to prevent. We don't await the acks (replay shouldn't
	* block other welcome activity, and the 15s ack timeouts would
	* serialize and starve).
	*
	* If retries exhaust, the channel REMAINS in activeSubscriptions —
	* a future reconnect tries again with a fresh budget. Subscribe is
	* idempotent server-side, so a duplicate replay racing a customer
	* re-subscribe is harmless.
	*/
	replayActiveSubscriptions() {
		if (this.activeSubscriptions.size === 0) return;
		this.logger.info("replaying subscriptions on reconnect", { count: this.activeSubscriptions.size });
		for (const channel of this.activeSubscriptions.keys()) this.replaySubscription(channel);
	}
	/**
	* Issue one replay subscribe for `channel`, scheduling a bounded
	* retry on failure. Reads the options fresh from activeSubscriptions
	* at each attempt so a customer re-subscribe with new options
	* between retries wins.
	*/
	replaySubscription(channel) {
		const opts = this.activeSubscriptions.get(channel);
		if (opts === void 0) return;
		this.sendWithAck((requestId) => buildSubscribe(channel, {
			...opts,
			requestId
		})).catch((err) => {
			if (this._state !== "connected") return;
			const used = this.replayRetryCounts.get(channel) ?? 0;
			if (used >= SUBSCRIBE_REPLAY_MAX_RETRIES) {
				this.logger.warn("subscription replay failed; retries exhausted", {
					channel,
					err: err.message,
					attempts: used + 1
				});
				return;
			}
			this.replayRetryCounts.set(channel, used + 1);
			this.logger.warn("subscription replay failed; scheduling retry", {
				channel,
				err: err.message,
				retry: used + 1
			});
			const timer = setTimeout(() => {
				this.replayRetryTimers.delete(timer);
				if (this._state !== "connected") return;
				this.replaySubscription(channel);
			}, SUBSCRIBE_REPLAY_RETRY_DELAY_MS);
			this.replayRetryTimers.add(timer);
		});
	}
	clearReplayRetryTimers() {
		for (const timer of this.replayRetryTimers) clearTimeout(timer);
		this.replayRetryTimers.clear();
	}
	/**
	* Wrap `#credential.resolveToken()` in a Promise.race against a
	* timeout so a hanging customer mint endpoint can't pin connect()
	* forever. Default 10s, overridable via tokenProviderTimeoutMs.
	*/
	resolveTokenWithTimeout() {
		return new Promise((resolve, reject) => {
			let settled = false;
			const timer = setTimeout(() => {
				if (settled) return;
				settled = true;
				reject(/* @__PURE__ */ new Error(`tokenProvider did not resolve within ${this.tokenProviderTimeoutMs}ms`));
			}, this.tokenProviderTimeoutMs);
			__classPrivateFieldGet(this, _SignallingClientImpl_credential, "f").resolveToken().then((v) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				resolve(v);
			}, (err) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				reject(err);
			});
		});
	}
	/** Decide whether a close → reconnect should happen. */
	shouldScheduleReconnect(closeCode) {
		if (this.explicitlyClosed) return false;
		if (this.reconnectOpts === null) return false;
		if (!this.wasEverConnected) return false;
		if (closeCode !== null && TERMINAL_CLOSE_CODES.has(closeCode)) return false;
		if (this.reconnectAttempts >= this.reconnectOpts.maxAttempts) return false;
		return true;
	}
	/** Compute the next reconnect delay using exponential backoff + jitter. */
	computeReconnectDelay() {
		if (!this.reconnectOpts) return 0;
		const { initialDelayMs, multiplier, maxDelayMs, jitterRatio } = this.reconnectOpts;
		const exponent = Math.max(0, this.reconnectAttempts - 1);
		const base = Math.min(initialDelayMs * Math.pow(multiplier, exponent), maxDelayMs);
		const floor = this.nextDelayFloorMs ?? 0;
		const beforeJitter = Math.max(base, floor);
		const delta = beforeJitter * jitterRatio * (Math.random() * 2 - 1);
		return Math.max(0, Math.floor(beforeJitter + delta));
	}
	scheduleReconnect() {
		if (this.reconnectTimer !== null) return;
		if (!this.reconnectOpts) return;
		if (this.explicitlyClosed) return;
		this.reconnectAttempts += 1;
		const delay = this.computeReconnectDelay();
		this.nextDelayFloorMs = null;
		this.transitionTo("reconnecting");
		this.logger.info("scheduling reconnect", {
			attempt: this.reconnectAttempts,
			delayMs: delay,
			lastCloseCode: this.lastCloseCode
		});
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null;
			this.openSocket().catch((err) => {
				this.logger.warn("reconnect attempt rejected", { err: String(err) });
			});
		}, delay);
	}
	clearReconnectTimer() {
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
	}
	/**
	* Close the connection. After close() the client is terminal — no
	* auto-reconnect. The returned Promise resolves once the underlying
	* socket has fired its 'close' event (or `CLOSE_FLUSH_TIMEOUT_MS`
	* elapses, whichever first), so a caller doing:
	*
	*   await client.close();
	*   process.exit(0);
	*
	* actually waits for the TCP FIN to flush instead of sending a
	* RST. The flush timeout cap is a safety net: a wedged transport
	* shouldn't pin process exit indefinitely.
	*/
	async close(code = 1e3, reason = "client requested close") {
		this.explicitlyClosed = true;
		this.clearReconnectTimer();
		this.clearInactivityTimer();
		this.clearHeartbeatTimer();
		this.clearReplayRetryTimers();
		const socket = this.socket;
		if (!socket || this._state === "closed") {
			this.transitionTo("closed");
			return;
		}
		const closed = new Promise((resolve) => {
			let settled = false;
			const settle = () => {
				if (settled) return;
				settled = true;
				socket.removeEventListener("close", onceClose);
				resolve();
			};
			const onceClose = () => {
				settle();
			};
			socket.addEventListener("close", onceClose);
			setTimeout(() => {
				settle();
			}, CLOSE_FLUSH_TIMEOUT_MS);
		});
		try {
			socket.close(code, reason);
		} catch {}
		this.transitionTo("closed");
		await closed;
	}
	async subscribe(channel, opts = {}) {
		validateChannel(channel);
		const wasTracked = this.activeSubscriptions.has(channel);
		this.activeSubscriptions.set(channel, { ...opts });
		try {
			return await this.sendWithAck((requestId) => buildSubscribe(channel, {
				...opts,
				requestId
			}));
		} catch (err) {
			if (!wasTracked && err.name === "NotConnectedError") this.activeSubscriptions.delete(channel);
			throw err;
		}
	}
	async unsubscribe(channel) {
		this.activeSubscriptions.delete(channel);
		return this.sendWithAck((requestId) => buildUnsubscribe(channel, { requestId }));
	}
	async publish(channel, data, _opts = {}) {
		this.checkOutboundSize(data);
		return this.sendWithAck((requestId) => buildPublish(channel, data, { requestId }));
	}
	async send(toPeerId, data, _opts = {}) {
		this.checkOutboundSize(data);
		return this.sendWithAck((requestId) => buildSend(toPeerId, data, { requestId }));
	}
	/**
	* Pre-flight size gate for publish()/send() payloads, measured
	* against the welcome-advertised cap. Throws OversizedPayloadError
	* (surfaces as a rejection from the async callers). Non-serialisable
	* data (circular, BigInt) passes through — the frame builder's own
	* JSON.stringify raises the layered TypeError for those.
	*/
	checkOutboundSize(data) {
		let serialised;
		try {
			serialised = JSON.stringify(data);
		} catch {
			return;
		}
		if (typeof serialised !== "string") return;
		const size = utf8ByteLength(serialised);
		const cap = this.serverMaxMessageSize ?? DEFAULT_MAX_MESSAGE_SIZE;
		if (size > cap) throw new OversizedPayloadError(size, cap);
	}
	on(event, handler) {
		this.events.on(event, handler);
		return this;
	}
	off(event, handler) {
		this.events.off(event, handler);
		return this;
	}
	once(event, handler) {
		this.events.once(event, handler);
		return this;
	}
	transitionTo(next) {
		if (this._state === next) return;
		const from = this._state;
		this._state = next;
		this.events.emit("state-change", {
			from,
			to: next
		});
	}
	handleFrame(raw, sourceSocket) {
		if (this.socket !== sourceSocket && this.socket !== null) {
			this.logger.warn("ignoring frame from stale socket");
			return;
		}
		const frame = parseServerFrame(raw);
		if (frame.type === "_malformed") {
			this.logger.warn("malformed inbound frame", { reason: frame.reason });
			return;
		}
		switch (frame.type) {
			case "welcome":
				if (this.explicitlyClosed) {
					this.logger.warn("ignoring welcome frame after close()");
					return;
				}
				if (this.welcomeResolver) {
					clearTimeout(this.welcomeResolver.timer);
					const r = this.welcomeResolver;
					this.welcomeResolver = null;
					const isReconnect = this.wasEverConnected;
					r.resolve();
					this.lastCloseCode = null;
					const iceServers = extractIceServersFromMetadata(frame.payload.metadata);
					this.serverMaxMessageSize = frame.payload.maxMessageSize;
					this.events.emit("connected", {
						peerId: frame.payload.peerId,
						serverTime: frame.payload.serverTime,
						expiresAt: frame.payload.expiresAt,
						isReconnect,
						maxMessageSize: frame.payload.maxMessageSize,
						...iceServers ? { iceServers } : {}
					});
					this.replayRetryCounts.clear();
					if (isReconnect && this.autoResubscribe) this.replayActiveSubscriptions();
				} else this.logger.warn("unexpected welcome frame");
				return;
			case "ack": {
				const pending = this.pendingAcks.get(frame.requestId);
				if (pending) {
					clearTimeout(pending.timer);
					this.pendingAcks.delete(frame.requestId);
					pending.resolve();
				}
				return;
			}
			case "error":
				if (frame.payload.requestId) {
					const pending = this.pendingAcks.get(frame.payload.requestId);
					if (pending) {
						clearTimeout(pending.timer);
						this.pendingAcks.delete(frame.payload.requestId);
						const err = new Error(frame.payload.message ?? frame.payload.code);
						err.name = frame.payload.code;
						pending.reject(err);
						return;
					}
				}
				if (frame.payload.code === "unknown_type" && !frame.payload.requestId) {
					this.logger.debug("ignoring unknown_type error (server lacks app-level ping support)");
					return;
				}
				this.events.emit("server-error", frame.payload);
				return;
			case "message":
				this.events.emit("message", frame.payload);
				return;
			case "direct":
				this.events.emit("direct", frame.payload);
				return;
			case "presence":
				this.events.emit("presence", frame.payload);
				return;
			case "going_away":
				this.events.emit("going-away", frame.payload);
				return;
			case "pong": return;
		}
	}
	handleClose(code, reason) {
		this.logger.info("ws closed", {
			code,
			reason
		});
		this.clearInactivityTimer();
		this.clearHeartbeatTimer();
		this.clearReplayRetryTimers();
		if (this.welcomeResolver) {
			clearTimeout(this.welcomeResolver.timer);
			this.welcomeResolver.reject(new SignallingConnectError(code, reason));
			this.welcomeResolver = null;
		}
		const snapshot = [...this.pendingAcks.entries()];
		this.pendingAcks.clear();
		for (const [, pending] of snapshot) {
			clearTimeout(pending.timer);
			const err = /* @__PURE__ */ new Error(`connection closed before ack: code=${code} reason='${reason}'`);
			err.name = "DisconnectedError";
			pending.reject(err);
		}
		this.socket = null;
		this.lastCloseCode = code;
		if (SLOW_BACKOFF_CLOSE_CODES.has(code)) this.nextDelayFloorMs = SLOW_BACKOFF_FLOOR_MS;
		const willReconnect = this.shouldScheduleReconnect(code);
		this.events.emit("disconnected", {
			code,
			reason,
			willReconnect
		});
		if (willReconnect) this.scheduleReconnect();
		else this.transitionTo("closed");
	}
	sendWithAck(buildFrame) {
		if (this._state !== "connected") {
			const err = /* @__PURE__ */ new Error(`SignallingClient: not connected (state=${this._state})`);
			err.name = "NotConnectedError";
			return Promise.reject(err);
		}
		const socket = this.socket;
		if (!socket) return Promise.reject(/* @__PURE__ */ new Error("SignallingClient: socket missing"));
		const requestId = generateRequestId();
		let frame;
		try {
			frame = buildFrame(requestId);
		} catch (err) {
			return Promise.reject(err);
		}
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				this.pendingAcks.delete(requestId);
				reject(/* @__PURE__ */ new Error(`ack timeout for requestId=${requestId} (no server ack within ${DEFAULT_ACK_TIMEOUT_MS}ms)`));
			}, DEFAULT_ACK_TIMEOUT_MS);
			this.pendingAcks.set(requestId, {
				resolve,
				reject,
				timer
			});
			try {
				socket.send(frame);
			} catch (err) {
				clearTimeout(timer);
				this.pendingAcks.delete(requestId);
				reject(err);
			}
		});
	}
	/**
	* Schedule the inactivity watchdog against a SPECIFIC socket
	* captured locally. If the timer fires after a reconnect has
	* already replaced `this.socket`, closing the captured socket is
	* a no-op (already closed) instead of accidentally closing the
	* new live one. There's no current code path that triggers this
	* (clearInactivityTimer runs in handleClose before reconnect), but
	* the local capture makes the invariant explicit at low cost.
	*/
	armInactivityTimer(socket) {
		if (!Number.isFinite(this.inactivityTimeoutMs) || this.inactivityTimeoutMs <= 0) return;
		this.clearInactivityTimer();
		this.inactivityTimer = setTimeout(() => {
			this.logger.warn("inactivity timeout — closing connection", { ms: this.inactivityTimeoutMs });
			try {
				socket.close(4e3, "inactivity timeout");
			} catch {}
		}, this.inactivityTimeoutMs);
	}
	/**
	* Schedule the next heartbeat ping against a SPECIFIC socket captured
	* locally — same idiom as armInactivityTimer. Re-armed on open and on
	* every inbound frame (so active traffic suppresses pings), and again
	* by the timer itself after firing (so a dead link still gets a second
	* attempt before the watchdog closes the connection).
	*
	* No-op when the derived interval is non-finite or non-positive — the
	* customer disabled the inactivity watchdog and we follow.
	*/
	armHeartbeatTimer(socket) {
		if (!Number.isFinite(this.heartbeatIntervalMs) || this.heartbeatIntervalMs <= 0) return;
		this.clearHeartbeatTimer();
		this.heartbeatTimer = setTimeout(() => {
			this.heartbeatTimer = null;
			if (this.socket !== socket) return;
			this.sendPing(socket);
			this.armHeartbeatTimer(socket);
		}, this.heartbeatIntervalMs);
	}
	clearHeartbeatTimer() {
		if (this.heartbeatTimer !== null) {
			clearTimeout(this.heartbeatTimer);
			this.heartbeatTimer = null;
		}
	}
	sendPing(socket) {
		if (this._state !== "connected") return;
		if (socket.readyState !== 1) return;
		try {
			socket.send(buildPing());
		} catch (err) {
			this.logger.warn("failed to send heartbeat ping", { err: scrubError(err).message });
		}
	}
	clearInactivityTimer() {
		if (this.inactivityTimer !== null) {
			clearTimeout(this.inactivityTimer);
			this.inactivityTimer = null;
		}
	}
	/** @internal — test hook; reconnection gates on this flag. */
	_explicitlyClosed() {
		return this.explicitlyClosed;
	}
};
_SignallingClientImpl_credential = /* @__PURE__ */ new WeakMap();
/**
* Longest track id we accept from a remote SDP. Real ids are UUIDs
* (36-38 chars); the cap keeps a malformed description from handing
* an arbitrarily long string to the metadata lookup.
*/
var MAX_MSID_TRACK_ID_LEN = 256;
/**
* Map of `mid -> track id` from each m-section's msid appdata
* (`a=msid:<streamId> <trackId>`, or the legacy
* `a=ssrc:<n> msid:<streamId> <trackId>`) — the track id the sender
* signalled for that m-section.
*
* Receivers can't rely on `ev.track.id` matching the sender's
* MediaStreamTrack.id: only Chromium copies the msid track id onto the
* remote track; Firefox and Safari generate their own. Chromium,
* Safari and libwebrtc / aiortc senders put their real track id in
* the appdata, so this recovers it for them. Firefox senders write a
* separate generated id there, which nothing is keyed by (callers fall
* back to stream id + kind).
*/
function msidTrackIdsByMid(sdp) {
	const out = /* @__PURE__ */ new Map();
	for (const section of sdp.split(/\r?\nm=/).slice(1)) {
		let mid;
		let trackId;
		for (const line of section.split(/\r?\n/)) if (mid === void 0 && line.startsWith("a=mid:")) mid = line.slice(6);
		else if (trackId === void 0) trackId = /^a=(?:ssrc:\d+ )?msid:\S+ (\S+)$/.exec(line)?.[1];
		if (!mid || trackId === void 0 || trackId.length > MAX_MSID_TRACK_ID_LEN) continue;
		out.set(mid, trackId);
	}
	return out;
}
var MAX_ICE_CANDIDATES_PER_GENERATION = 200;
var MAX_ICE_CANDIDATE_STRING = 1e3;
var ICE_RESTART_BASE_DELAY_MS = 1e3;
var ICE_RESTART_MAX_DELAY_MS = 3e4;
var ICE_RESTART_MAX_ATTEMPTS = 9;
var ICE_RESTART_ANSWER_TIMEOUT_MS = 15e3;
var PeerConnection = class extends EventEmitter {
	constructor(opts) {
		super();
		this._state = "idle";
		this.isMakingOffer = false;
		this.isSettingRemoteAnswerPending = false;
		this.remoteOffersInProgress = 0;
		this.ignoreOffer = false;
		this.iceRestartInFlight = false;
		this.iceRestartAttempt = 0;
		this.iceRestartTimer = null;
		this.iceRestartAnswerTimer = null;
		this.iceRestartGaveUp = false;
		this.candidatesThisGeneration = 0;
		this.candidateCapWarned = false;
		this.remoteDescriptionGeneration = 0;
		this.closed = false;
		/**
		* Browser fires `negotiationneeded` automatically whenever the local
		* description set is no longer compatible — typical triggers are
		* addTrack(), createDataChannel(), or an ICE restart request. We
		* respond by issuing an offer.
		*
		* The `isMakingOffer` flag is the collision-detection signal for
		* the polite peer: if remote sends an offer while we're mid-offer,
		* we know to roll back.
		*/
		this.onNegotiationNeeded = (_ev) => {
			if (this.closed) return;
			(async () => {
				try {
					this.isMakingOffer = true;
					const generation = this.remoteDescriptionGeneration;
					const offer = await this.pc.createOffer();
					if (this.closed) return;
					if (this.remoteDescriptionGeneration !== generation || this.isRemoteOfferInProgress()) {
						this.logger.debug?.("abandoning local offer — remote description applied or pending mid-createOffer", {
							peer: this.remotePeerId,
							signalingState: this.pc.signalingState
						});
						return;
					}
					await this.pc.setLocalDescription(offer);
					if (this.closed) return;
					const local = this.pc.localDescription;
					if (!local) throw new Error("setLocalDescription succeeded but localDescription is null");
					if (this.closed) return;
					await this.sendLocalDescription(local);
				} catch (err) {
					if (this.closed) return;
					this.emit("negotiation-error", { err: scrubError(err) });
				} finally {
					this.isMakingOffer = false;
					this.reenterLadderIfStillFailed();
				}
			})();
		};
		this.onLocalIceCandidate = (ev) => {
			if (this.closed) return;
			const candidate = ev.candidate;
			const wire = candidate === null ? null : candidate.toJSON?.() ?? toCandidateInit(candidate);
			this.signallingSender.send(this.remotePeerId, {
				type: "rtc-ice",
				candidate: wire
			}).catch((err) => {
				this.logger.warn?.("failed to send local ICE candidate", {
					peer: this.remotePeerId,
					err: scrubError(err).message
				});
			});
		};
		this.onTrack = (ev) => {
			if (this.closed) return;
			const { track, streams, transceiver } = ev;
			const sdp = this.pc.remoteDescription?.sdp;
			if (typeof sdp !== "string") {
				this.emit("track", {
					track,
					streams
				});
				return;
			}
			const byMid = msidTrackIdsByMid(sdp);
			const mid = transceiver?.mid;
			const msidTrackId = typeof mid === "string" ? byMid.get(mid) : void 0;
			this.emit("track", {
				track,
				streams,
				msidTrackIds: new Set(byMid.values()),
				...msidTrackId !== void 0 ? { msidTrackId } : {}
			});
		};
		this.onDataChannel = (ev) => {
			if (this.closed) return;
			const { channel } = ev;
			this.emit("data-channel", { channel });
		};
		/**
		* ICE-level state transitions. The aggregate `connectionState` is
		* a better signal for the public state machine, but iceConnectionState
		* is where the failure-recovery hook lives: when ICE transitions to
		* "failed", we schedule a `createOffer({ iceRestart: true })` to
		* renegotiate ICE candidates without rebuilding the connection.
		*
		* Restart ladder:
		*   attempt 1: immediate
		*   attempt 2: 1 s
		*   attempt 3: 2 s
		*   attempt 4: 4 s
		*   attempt 5: 8 s
		*   attempt 6: 16 s
		*   attempt 7: 30 s   (capped at ICE_RESTART_MAX_DELAY_MS)
		*   attempt 8: 30 s
		*   attempt 9: 30 s   (cumulative ≈ 121 s)
		*   attempt 10+: GIVE UP — emit one negotiation-error whose
		*                err.name === "IceRestartExhaustedError", stop
		*                retrying. The customer's app code must close()
		*                and reconnect.
		*
		* The attempt counter resets on `connectionState === "connected"`
		* (see onConnectionStateChange), so a recovered link gets a fresh
		* budget. Both peers may fire this concurrently — perfect negotiation
		* absorbs the resulting offer collision.
		*/
		this.onIceConnectionStateChange = (_ev) => {
			if (this.closed) return;
			if (this.pc.iceConnectionState !== "failed") {
				this.iceRestartInFlight = false;
				return;
			}
			if (this.iceRestartInFlight || this.isMakingOffer) {
				this.logger.debug?.("ICE failed but restart already in flight, skipping", { peer: this.remotePeerId });
				return;
			}
			if (this.iceRestartTimer !== null) return;
			this.scheduleNextRestartAttempt();
		};
		this.onConnectionStateChange = (_ev) => {
			if (this.closed) return;
			const cs = this.pc.connectionState;
			let next;
			switch (cs) {
				case "new":
				case "connecting":
					next = "connecting";
					break;
				case "connected":
					this.iceRestartAttempt = 0;
					this.iceRestartGaveUp = false;
					this.clearRestartAnswerTimer();
					next = "connected";
					break;
				case "disconnected":
				case "failed":
					next = "reconnecting";
					break;
				case "closed":
					next = "closed";
					break;
				default: return;
			}
			this.setState(next);
		};
		this.localPeerId = opts.localPeerId;
		this.remotePeerId = opts.remotePeerId;
		this.polite = opts.polite;
		this.signallingSender = opts.signallingSender;
		this.logger = opts.logger ?? {};
		const factory = opts.rtcPeerConnectionFactory ?? ((config) => {
			const ctor = globalThis.RTCPeerConnection;
			if (typeof ctor !== "function") throw new Error("RTCPeerConnection is not available on globalThis. In Node, install @roamhq/wrtc and pass `rtcPeerConnectionFactory: (cfg) => new (require('@roamhq/wrtc').RTCPeerConnection)(cfg)`.");
			return new ctor(config);
		});
		const config = {};
		if (opts.iceServers) config.iceServers = opts.iceServers;
		this.pc = factory(config);
		this.handlers = {
			negotiationneeded: this.onNegotiationNeeded,
			icecandidate: this.onLocalIceCandidate,
			track: this.onTrack,
			datachannel: this.onDataChannel,
			connectionstatechange: this.onConnectionStateChange,
			iceconnectionstatechange: this.onIceConnectionStateChange
		};
		this.pc.addEventListener("negotiationneeded", this.handlers.negotiationneeded);
		this.pc.addEventListener("icecandidate", this.handlers.icecandidate);
		this.pc.addEventListener("track", this.handlers.track);
		this.pc.addEventListener("datachannel", this.handlers.datachannel);
		this.pc.addEventListener("connectionstatechange", this.handlers.connectionstatechange);
		this.pc.addEventListener("iceconnectionstatechange", this.handlers.iceconnectionstatechange);
	}
	get state() {
		return this._state;
	}
	/** Underlying PC for advanced callers (RemotePeer.pc escape hatch). */
	get peerConnection() {
		return this.pc;
	}
	/**
	* Hot-swap the ICE servers on a live connection. Typical caller:
	* MeteredPeer listening for `connected` welcomes with
	* refreshed iceServers and pushing them down to every active
	* PeerConnection. Calls into the underlying RTCPeerConnection.
	* setConfiguration which the W3C spec explicitly allows for the
	* iceServers field post-construction.
	*
	* No-op after close.
	*/
	updateIceServers(iceServers) {
		if (this.closed) return;
		try {
			this.pc.setConfiguration({ iceServers });
		} catch (err) {
			this.logger.warn?.("setConfiguration({iceServers}) threw", {
				peer: this.remotePeerId,
				err: err instanceof Error ? scrubSdpCredentials(err.message) : String(err)
			});
		}
	}
	/**
	* Proactively kick off an ICE restart — typically called when TURN
	* credentials rotate. Equivalent to the spec's
	* RTCPeerConnection.restartIce(): the next createOffer will use a
	* fresh ICE generation, picking up the new credentials applied via
	* updateIceServers.
	*
	* The wrapper's existing onIceConnectionStateChange ladder handles
	* retries / backoff if the restart itself fails. This entry point
	* resets the attempt counter so a proactive restart doesn't count
	* against a permanently-broken link's budget.
	*
	* No-op after close.
	*/
	forceIceRestart() {
		if (this.closed) return;
		if (this.iceRestartInFlight || this.isMakingOffer) {
			this.logger.debug?.("forceIceRestart skipped — restart already in flight", { peer: this.remotePeerId });
			return;
		}
		this.iceRestartAttempt = 0;
		this.iceRestartGaveUp = false;
		const native = this.pc;
		if (typeof native.restartIce === "function") {
			native.restartIce();
			return;
		}
		this.iceRestartInFlight = true;
		this.triggerIceRestart();
	}
	/**
	* Process an inbound SDP / ICE signal previously delivered by the
	* orchestrator via the SignallingClient's `direct` event. The
	* orchestrator filters by `isRtcSignal(data)` before calling.
	*
	* Errors during set*Description / addIceCandidate are caught and
	* surfaced via `negotiation-error` / `ice-candidate-error` so the
	* caller's `await handleSignal(...)` doesn't reject — one bad
	* inbound shouldn't throw out of an event dispatcher.
	*/
	async handleSignal(signal) {
		if (this.closed) return;
		try {
			if (signal.type === "rtc-description") await this.handleDescription(signal.description);
			else if (signal.type === "rtc-ice") await this.handleIce(signal.candidate);
		} catch (err) {
			this.emit("negotiation-error", { err: scrubError(err) });
		}
	}
	/**
	* Close the underlying RTCPeerConnection, detach all listeners,
	* and transition to "closed". Idempotent — safe to call multiple
	* times. After close, handleSignal is a no-op.
	*/
	close() {
		if (this.closed) return;
		this.closed = true;
		if (this.iceRestartTimer) {
			clearTimeout(this.iceRestartTimer);
			this.iceRestartTimer = null;
		}
		this.clearRestartAnswerTimer();
		this.pc.removeEventListener("negotiationneeded", this.handlers.negotiationneeded);
		this.pc.removeEventListener("icecandidate", this.handlers.icecandidate);
		this.pc.removeEventListener("track", this.handlers.track);
		this.pc.removeEventListener("datachannel", this.handlers.datachannel);
		this.pc.removeEventListener("connectionstatechange", this.handlers.connectionstatechange);
		this.pc.removeEventListener("iceconnectionstatechange", this.handlers.iceconnectionstatechange);
		try {
			this.pc.close();
		} catch (err) {
			this.logger.warn?.("RTCPeerConnection.close threw", {
				peer: this.remotePeerId,
				err: err instanceof Error ? scrubSdpCredentials(err.message) : String(err)
			});
		}
		this.setState("closed");
		this.removeAllListeners();
	}
	/**
	* Ship a local description over the signalling channel. Delivery
	* failures are NOT negotiation errors — the local negotiation state
	* machine is intact; the transport just couldn't carry the frame
	* (typically the signalling WS is mid-reconnect during a network
	* switch, when ICE failure is detected before the socket's own
	* liveness watchdog fires). Logged instead of emitted: surfacing a
	* customer-visible negotiation-error per ICE-restart attempt during
	* routine recovery would be indistinguishable from a real
	* negotiation failure. Recovery comes from the ICE ladder re-firing
	* once the transport is back, or from the signalling-level
	* reconcile replacing the connection outright.
	*/
	async sendLocalDescription(local) {
		try {
			await this.signallingSender.send(this.remotePeerId, {
				type: "rtc-description",
				description: {
					type: local.type,
					sdp: local.sdp
				}
			});
		} catch (err) {
			this.logger.warn?.("failed to send local description", {
				peer: this.remotePeerId,
				descriptionType: local.type,
				err: scrubError(err).message
			});
		}
	}
	/**
	* Advance the ladder by one attempt: immediate for the first,
	* exponential backoff after, terminal give-up past the budget.
	* Shared by the ICE-failed event path and the answer-timeout
	* watchdog — the watchdog exists because a restart offer whose
	* answer is lost parks ICE in "new" with no further state
	* transitions, which would otherwise strand the ladder mid-budget
	* and the give-up guarantee with it.
	*/
	scheduleNextRestartAttempt() {
		if (this.iceRestartAttempt >= ICE_RESTART_MAX_ATTEMPTS) {
			if (!this.iceRestartGaveUp) {
				this.iceRestartGaveUp = true;
				const err = /* @__PURE__ */ new Error(`ICE restart gave up after ${this.iceRestartAttempt} attempts`);
				err.name = "IceRestartExhaustedError";
				this.emit("negotiation-error", { err });
			}
			return;
		}
		const attempt = this.iceRestartAttempt;
		this.iceRestartAttempt += 1;
		this.iceRestartInFlight = true;
		if (attempt === 0) {
			this.logger.debug?.("ICE restart attempt 1 (immediate)", { peer: this.remotePeerId });
			this.triggerIceRestart();
			return;
		}
		const delayMs = Math.min(ICE_RESTART_BASE_DELAY_MS * 2 ** (attempt - 1), ICE_RESTART_MAX_DELAY_MS);
		this.logger.debug?.("scheduling ICE restart", {
			peer: this.remotePeerId,
			attempt: attempt + 1,
			delayMs
		});
		const generationAtSchedule = this.remoteDescriptionGeneration;
		this.iceRestartTimer = setTimeout(() => {
			this.iceRestartTimer = null;
			if (this.closed) return;
			const ice = this.pc.iceConnectionState;
			if (ice === "connected" || ice === "completed") {
				this.iceRestartInFlight = false;
				return;
			}
			if (this.remoteDescriptionGeneration !== generationAtSchedule) {
				this.iceRestartInFlight = false;
				return;
			}
			this.triggerIceRestart();
		}, delayMs);
	}
	/**
	* Arm the answer watchdog for a just-sent restart offer. On expiry
	* with no recovery and no remote description since the send, the
	* attempt counts as failed and the ladder advances (or gives up).
	*/
	armRestartAnswerTimer() {
		this.clearRestartAnswerTimer();
		const generationAtSend = this.remoteDescriptionGeneration;
		this.iceRestartAnswerTimer = setTimeout(() => {
			this.iceRestartAnswerTimer = null;
			if (this.closed) return;
			const ice = this.pc.iceConnectionState;
			if (ice === "connected" || ice === "completed") return;
			if (this.remoteDescriptionGeneration !== generationAtSend) return;
			if (this.isMakingOffer) {
				this.armRestartAnswerTimer();
				return;
			}
			this.logger.debug?.("ICE-restart answer timeout — advancing the ladder", {
				peer: this.remotePeerId,
				attempt: this.iceRestartAttempt
			});
			this.iceRestartInFlight = false;
			this.scheduleNextRestartAttempt();
		}, ICE_RESTART_ANSWER_TIMEOUT_MS);
	}
	clearRestartAnswerTimer() {
		if (this.iceRestartAnswerTimer !== null) {
			clearTimeout(this.iceRestartAnswerTimer);
			this.iceRestartAnswerTimer = null;
		}
	}
	async triggerIceRestart() {
		if (this.isMakingOffer) {
			this.iceRestartInFlight = false;
			return;
		}
		if (this.remoteOffersInProgress > 0) {
			this.iceRestartInFlight = false;
			return;
		}
		if (this.pc.signalingState === "have-remote-offer") {
			this.iceRestartInFlight = false;
			this.reenterLadderIfStillFailed();
			return;
		}
		try {
			this.isMakingOffer = true;
			const generation = this.remoteDescriptionGeneration;
			const offer = await this.pc.createOffer({ iceRestart: true });
			if (this.closed) return;
			if (this.remoteDescriptionGeneration !== generation || this.isRemoteOfferInProgress()) {
				this.logger.debug?.("abandoning ICE-restart offer — remote description applied or pending mid-createOffer", {
					peer: this.remotePeerId,
					signalingState: this.pc.signalingState
				});
				this.iceRestartInFlight = false;
				return;
			}
			await this.pc.setLocalDescription(offer);
			if (this.closed) return;
			this.candidatesThisGeneration = 0;
			this.candidateCapWarned = false;
			const local = this.pc.localDescription;
			if (!local) throw new Error("ICE restart: setLocalDescription succeeded but localDescription is null");
			if (this.closed) return;
			await this.sendLocalDescription(local);
			this.armRestartAnswerTimer();
		} catch (err) {
			if (this.closed) return;
			this.iceRestartInFlight = false;
			this.emit("negotiation-error", { err: scrubError(err) });
		} finally {
			this.isMakingOffer = false;
			this.reenterLadderIfStillFailed();
		}
	}
	/**
	* Re-enter the restart ladder on the next tick if ICE is still
	* failed. Needed after an offer settles while ICE sits at "failed"
	* (abandoned restart, glare, or a failure that arrived while the
	* offer held the isMakingOffer lock): iceconnectionstatechange only
	* fires on transitions, so a link that STAYS failed would otherwise
	* never re-trigger the ladder. Deferred a tick so it runs after the
	* calling offer's `finally` has cleared isMakingOffer; the ladder's
	* own guards (in-flight, scheduled timer, attempt budget) make a
	* redundant re-entry a no-op.
	*/
	reenterLadderIfStillFailed() {
		setTimeout(() => {
			if (this.closed) return;
			if (this.pc.iceConnectionState !== "failed") return;
			this.onIceConnectionStateChange(void 0);
		}, 0);
	}
	/**
	* True while a remote offer is being applied or answered, or has been
	* applied without an answer. A local offer created then is stale and
	* cannot be applied.
	*/
	isRemoteOfferInProgress() {
		return this.remoteOffersInProgress > 0 || this.pc.signalingState === "have-remote-offer";
	}
	async handleDescription(description) {
		const offerCollision = description.type === "offer" && (this.isMakingOffer || this.pc.signalingState !== "stable" && !this.isSettingRemoteAnswerPending);
		this.ignoreOffer = !this.polite && offerCollision;
		if (this.ignoreOffer) {
			this.logger.debug?.("ignoring offer due to collision (impolite peer)", {
				peer: this.remotePeerId,
				signalingState: this.pc.signalingState,
				isMakingOffer: this.isMakingOffer
			});
			return;
		}
		const isOffer = description.type === "offer";
		this.isSettingRemoteAnswerPending = description.type === "answer";
		if (isOffer) this.remoteOffersInProgress += 1;
		let local = null;
		try {
			try {
				await this.pc.setRemoteDescription(description);
			} finally {
				this.isSettingRemoteAnswerPending = false;
			}
			if (this.closed) return;
			this.candidatesThisGeneration = 0;
			this.candidateCapWarned = false;
			this.remoteDescriptionGeneration += 1;
			this.clearRestartAnswerTimer();
			if (isOffer) {
				const answer = await this.pc.createAnswer();
				if (this.closed) return;
				await this.pc.setLocalDescription(answer);
				if (this.closed) return;
				local = this.pc.localDescription;
				if (!local) throw new Error("setLocalDescription(answer) succeeded but localDescription is null");
			}
		} finally {
			if (isOffer) {
				this.remoteOffersInProgress -= 1;
				this.reenterLadderIfStillFailed();
			}
		}
		if (local) await this.sendLocalDescription(local);
	}
	async handleIce(candidate) {
		if (candidate !== null) {
			const candStr = candidate.candidate;
			if (typeof candStr === "string" && candStr.length > MAX_ICE_CANDIDATE_STRING) {
				this.logger.warn?.("dropping oversized inbound ICE candidate", {
					peer: this.remotePeerId,
					size: candStr.length,
					cap: MAX_ICE_CANDIDATE_STRING
				});
				return;
			}
			if (this.candidatesThisGeneration >= MAX_ICE_CANDIDATES_PER_GENERATION) {
				if (!this.candidateCapWarned) {
					this.candidateCapWarned = true;
					this.logger.warn?.("inbound ICE candidate cap reached", {
						peer: this.remotePeerId,
						cap: MAX_ICE_CANDIDATES_PER_GENERATION
					});
				}
				return;
			}
			this.candidatesThisGeneration += 1;
		}
		try {
			await this.pc.addIceCandidate(candidate ?? void 0);
		} catch (err) {
			if (this.closed) return;
			if (!this.ignoreOffer) this.emit("ice-candidate-error", { err: scrubError(err) });
		}
	}
	setState(next) {
		if (next === this._state) return;
		const from = this._state;
		this._state = next;
		this.emit("state-change", {
			from,
			to: next
		});
	}
};
/**
* Fallback for implementations whose RTCIceCandidate lacks a usable
* toJSON() — Node's `wrtc` historically returns one but not always
* the four fields the wire format needs. Plucking explicitly keeps
* the wire payload stable across implementations.
*/
function toCandidateInit(c) {
	return {
		candidate: c.candidate,
		sdpMid: c.sdpMid ?? null,
		sdpMLineIndex: c.sdpMLineIndex ?? null,
		usernameFragment: c.usernameFragment ?? null
	};
}
var _RemotePeer_instances;
var _RemotePeer_connection;
var _RemotePeer_sendImpl;
var _RemotePeer_state;
var _RemotePeer_trackMetadata;
var _RemotePeer_streamLiveTracks;
var _RemotePeer_streamRef;
var _RemotePeer_trackEndedListeners;
var _RemotePeer_streamRemoveTrackListeners;
var _RemotePeer_forwardStateChange;
var _RemotePeer_setState;
var _RemotePeer_forwardNegotiationError;
var _RemotePeer_forwardIceCandidateError;
var _RemotePeer_forwardTrack;
var _RemotePeer_lookupTrackMetadata;
var _RemotePeer_ensureRemoveTrackListener;
var _RemotePeer_dropTrackFromStream;
var _RemotePeer_detachRemoveTrackListener;
var _RemotePeer_detachAllRemoveTrackListeners;
var _RemotePeer_forwardDataChannel;
var _RemotePeer_attachConnectionListeners;
var _RemotePeer_detachConnectionListeners;
/**
* Cap on the per-RemotePeer #trackMetadata cache. A hostile or
* compromised remote can fire __meteredTrackMeta control messages
* with unique trackIds forever, growing the cache unboundedly. 512
* is comfortably above any realistic per-peer track count (typical
* apps are 1-10) but low enough that an adversary can't pin
* meaningful memory.
*
* Eviction is FIFO via Map insertion order; the oldest entry is
* evicted on overflow.
*/
var MAX_TRACK_METADATA_ENTRIES = 512;
var RemotePeer = class extends EventEmitter {
	constructor(init) {
		super();
		_RemotePeer_instances.add(this);
		_RemotePeer_connection.set(this, void 0);
		_RemotePeer_sendImpl.set(this, void 0);
		_RemotePeer_state.set(this, "idle");
		_RemotePeer_trackMetadata.set(this, /* @__PURE__ */ new Map());
		_RemotePeer_streamLiveTracks.set(this, /* @__PURE__ */ new Map());
		_RemotePeer_streamRef.set(this, /* @__PURE__ */ new Map());
		_RemotePeer_trackEndedListeners.set(this, /* @__PURE__ */ new Map());
		_RemotePeer_streamRemoveTrackListeners.set(this, /* @__PURE__ */ new Map());
		_RemotePeer_forwardStateChange.set(this, (ev) => {
			if (__classPrivateFieldGet(this, _RemotePeer_state, "f") === "reconnecting" && ev.to === "connecting") return;
			__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_setState).call(this, ev.to);
		});
		_RemotePeer_forwardNegotiationError.set(this, (ev) => {
			this.emit("negotiation-error", ev);
		});
		_RemotePeer_forwardIceCandidateError.set(this, (ev) => {
			this.emit("ice-candidate-error", ev);
		});
		_RemotePeer_forwardTrack.set(this, (ev) => {
			const metadata = __classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_lookupTrackMetadata).call(this, ev);
			this.emit("track", {
				track: ev.track,
				streams: ev.streams,
				...metadata !== void 0 ? { metadata } : {}
			});
			for (const stream of ev.streams) {
				const wasSeen = __classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").has(stream.id);
				let liveTracks = __classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").get(stream.id);
				if (!liveTracks) {
					liveTracks = /* @__PURE__ */ new Set();
					__classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").set(stream.id, liveTracks);
				}
				liveTracks.add(ev.track);
				__classPrivateFieldGet(this, _RemotePeer_streamRef, "f").set(stream.id, stream);
				__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_ensureRemoveTrackListener).call(this, stream);
				if (!wasSeen) this.emit("stream-added", {
					stream,
					...metadata !== void 0 ? { metadata } : {}
				});
			}
			const onEnded = () => {
				for (const stream of ev.streams) __classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_dropTrackFromStream).call(this, stream.id, ev.track, stream);
				__classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f").delete(ev.track);
			};
			if (!__classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f").has(ev.track)) {
				ev.track.addEventListener("ended", onEnded);
				__classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f").set(ev.track, onEnded);
			}
		});
		_RemotePeer_forwardDataChannel.set(this, (ev) => {
			this.emit("data-channel", ev);
		});
		this.id = init.id;
		this.metadata = init.metadata;
		__classPrivateFieldSet(this, _RemotePeer_connection, init.connection, "f");
		__classPrivateFieldSet(this, _RemotePeer_sendImpl, init.send, "f");
		__classPrivateFieldSet(this, _RemotePeer_state, __classPrivateFieldGet(this, _RemotePeer_connection, "f").state, "f");
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_attachConnectionListeners).call(this);
	}
	get state() {
		return __classPrivateFieldGet(this, _RemotePeer_state, "f");
	}
	/** Perfect-negotiation politeness flag. Exposed for introspection / tests. */
	get polite() {
		return __classPrivateFieldGet(this, _RemotePeer_connection, "f").polite;
	}
	/**
	* Escape hatch — the underlying RTCPeerConnectionLike. For advanced
	* callers needing `getStats()`, custom event listeners, or other
	* low-level access. NOTE: mutating its configuration via
	* `setConfiguration()` bypasses MeteredPeer's iceServer validation;
	* only do that if you really need to.
	*/
	get pc() {
		return __classPrivateFieldGet(this, _RemotePeer_connection, "f").peerConnection;
	}
	/**
	* Send `data` directly to this peer (server-routed via the
	* signalling channel's `send` frame). Rejects with the underlying
	* error if the signalling socket isn't connected or the server
	* rejects the request. Shorthand for `peer.send(remote.id, data)`.
	*
	* After `_close()`, this rejects with "RemotePeer is closed" so
	* a stale ref held by customer code can't ship frames at a
	* potentially-reused peerId.
	*/
	send(data) {
		return __classPrivateFieldGet(this, _RemotePeer_sendImpl, "f").call(this, data);
	}
	/**
	* Toggle JSON.stringify-safety. The default toJSON on EventEmitter
	* would still expose nothing useful, but pinning this here makes
	* the intent loud and means a future refactor can't accidentally
	* leak the connection / sendImpl bag.
	*/
	toJSON() {
		return {
			id: this.id,
			state: this.state
		};
	}
	/**
	* @internal — MeteredPeer routes inbound RTC signals from `direct`
	* events through this bridge. Kept off the public surface so
	* customer code can't inject forged SDP / ICE candidates.
	*/
	_handleSignal(signal) {
		return __classPrivateFieldGet(this, _RemotePeer_connection, "f").handleSignal(signal);
	}
	/**
	* @internal — reconcile entry. MeteredPeer drives the
	* RemotePeer state directly when the local-side WS reconnect cycle
	* needs explicit transitions the underlying PC can't generate
	* (specifically: "connected → reconnecting" on WS drop, before
	* any PC state change has fired).
	*/
	_setState(next) {
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_setState).call(this, next);
	}
	/**
	* @internal — reconcile entry. Refresh metadata from
	* the post-reconnect snapshot. If a peer's peerMetadata claim
	* changed during the disconnect window (e.g., they updated their
	* display name on their own backend), the reconcile snapshot
	* carries the new metadata and the survivor's RemotePeer needs
	* to reflect it.
	*
	* The public `metadata` field is documented as readonly to
	* customer code; the cast here is intentional and contained.
	*/
	_setMetadata(metadata) {
		this.metadata = metadata;
	}
	/**
	* @internal — reconcile entry. Swaps the underlying
	* PeerConnection without firing peer-left / peer-joined. Detaches
	* all listeners from the old PC, closes it, swaps in `newConn`,
	* and re-attaches listeners. Does NOT reset RemotePeer.state —
	* the caller controls the transition (typically: customer is
	* already at "reconnecting"; new PC's events drive the eventual
	* "connected" transition, with the option-B filter dropping the
	* intermediate "connecting" hop).
	*
	* Idempotent against repeat swaps: a second call closes the
	* second-old PC and rewires to the new one.
	*
	* Throws if called after _close(). Unreachable in current
	* MeteredPeer code (swapPeerConnection only iterates this.peers,
	* which removePeer empties before _close fires), but defensive
	* against future refactors that might race a swap with a close.
	*/
	_setConnection(newConn) {
		if (__classPrivateFieldGet(this, _RemotePeer_state, "f") === "closed") throw new Error(`RemotePeer ${this.id} is closed — cannot swap connection`);
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachConnectionListeners).call(this);
		__classPrivateFieldGet(this, _RemotePeer_connection, "f").close();
		__classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_streamRef, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachAllRemoveTrackListeners).call(this);
		for (const [track, listener] of __classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f")) try {
			track.removeEventListener("ended", listener);
		} catch {}
		__classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f").clear();
		__classPrivateFieldSet(this, _RemotePeer_connection, newConn, "f");
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_attachConnectionListeners).call(this);
		this.emit("connection-reset", {});
	}
	/**
	* @internal — multi-stream metadata entry. MeteredPeer's
	* onDirect filter routes inbound `__meteredTrackMeta` control
	* messages through this bridge. The metadata is stashed by the
	* sender's track id (with its stream id + kind, when sent) and read
	* by #forwardTrack at track-event time.
	*
	* Pass `undefined` to clear an entry (sender called removeTrack).
	*/
	_setTrackMetadata(trackId, metadata, streamId, kind) {
		if (metadata === void 0) {
			__classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").delete(trackId);
			return;
		}
		if (!__classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").has(trackId) && __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").size >= MAX_TRACK_METADATA_ENTRIES) {
			const oldestKey = __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").keys().next().value;
			if (oldestKey !== void 0) __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").delete(oldestKey);
		}
		__classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").set(trackId, {
			metadata,
			...streamId !== void 0 ? { streamId } : {},
			...kind !== void 0 ? { kind } : {}
		});
	}
	/**
	* @internal — MeteredPeer calls this from its peer-left handler /
	* disconnect path. PeerConnection.close is idempotent so doing it
	* twice is safe.
	*/
	_close() {
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachConnectionListeners).call(this);
		__classPrivateFieldGet(this, _RemotePeer_connection, "f").close();
		for (const [track, listener] of __classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f")) try {
			track.removeEventListener("ended", listener);
		} catch {}
		__classPrivateFieldGet(this, _RemotePeer_trackEndedListeners, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachAllRemoveTrackListeners).call(this);
		__classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_streamRef, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").clear();
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_setState).call(this, "closed");
		__classPrivateFieldSet(this, _RemotePeer_sendImpl, () => Promise.reject(/* @__PURE__ */ new Error(`RemotePeer ${this.id} is closed`)), "f");
		this.removeAllListeners();
	}
};
_RemotePeer_connection = /* @__PURE__ */ new WeakMap(), _RemotePeer_sendImpl = /* @__PURE__ */ new WeakMap(), _RemotePeer_state = /* @__PURE__ */ new WeakMap(), _RemotePeer_trackMetadata = /* @__PURE__ */ new WeakMap(), _RemotePeer_streamLiveTracks = /* @__PURE__ */ new WeakMap(), _RemotePeer_streamRef = /* @__PURE__ */ new WeakMap(), _RemotePeer_trackEndedListeners = /* @__PURE__ */ new WeakMap(), _RemotePeer_streamRemoveTrackListeners = /* @__PURE__ */ new WeakMap(), _RemotePeer_forwardStateChange = /* @__PURE__ */ new WeakMap(), _RemotePeer_forwardNegotiationError = /* @__PURE__ */ new WeakMap(), _RemotePeer_forwardIceCandidateError = /* @__PURE__ */ new WeakMap(), _RemotePeer_forwardTrack = /* @__PURE__ */ new WeakMap(), _RemotePeer_forwardDataChannel = /* @__PURE__ */ new WeakMap(), _RemotePeer_instances = /* @__PURE__ */ new WeakSet(), _RemotePeer_setState = function _RemotePeer_setState(next) {
	if (next === __classPrivateFieldGet(this, _RemotePeer_state, "f")) return;
	const from = __classPrivateFieldGet(this, _RemotePeer_state, "f");
	__classPrivateFieldSet(this, _RemotePeer_state, next, "f");
	this.emit("state-change", {
		from,
		to: next
	});
}, _RemotePeer_lookupTrackMetadata = function _RemotePeer_lookupTrackMetadata(ev) {
	const direct = (ev.msidTrackId !== void 0 ? __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").get(ev.msidTrackId) : void 0) ?? __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f").get(ev.track.id);
	if (direct !== void 0) return direct.metadata;
	if (ev.streams.length === 0) return void 0;
	let match;
	let matchJson;
	for (const [trackId, entry] of __classPrivateFieldGet(this, _RemotePeer_trackMetadata, "f")) {
		if (entry.kind !== ev.track.kind || entry.streamId === void 0 || ev.msidTrackIds?.has(trackId) === true || !ev.streams.some((s) => s.id === entry.streamId)) continue;
		const json = JSON.stringify(entry.metadata);
		if (matchJson === void 0) {
			match = entry.metadata;
			matchJson = json;
		} else if (json !== matchJson) return;
	}
	return match;
}, _RemotePeer_ensureRemoveTrackListener = function _RemotePeer_ensureRemoveTrackListener(stream) {
	const existing = __classPrivateFieldGet(this, _RemotePeer_streamRemoveTrackListeners, "f").get(stream.id);
	if (existing?.stream === stream) return;
	if (existing) __classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachRemoveTrackListener).call(this, stream.id);
	if (typeof stream.addEventListener !== "function") return;
	const listener = (ev) => {
		const track = ev.track;
		if (!track) return;
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_dropTrackFromStream).call(this, stream.id, track, stream);
	};
	stream.addEventListener("removetrack", listener);
	__classPrivateFieldGet(this, _RemotePeer_streamRemoveTrackListeners, "f").set(stream.id, {
		stream,
		listener
	});
}, _RemotePeer_dropTrackFromStream = function _RemotePeer_dropTrackFromStream(streamId, track, fallbackRef) {
	const liveTracks = __classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").get(streamId);
	if (!liveTracks) return;
	liveTracks.delete(track);
	if (liveTracks.size === 0) {
		__classPrivateFieldGet(this, _RemotePeer_streamLiveTracks, "f").delete(streamId);
		const ref = __classPrivateFieldGet(this, _RemotePeer_streamRef, "f").get(streamId) ?? fallbackRef;
		__classPrivateFieldGet(this, _RemotePeer_streamRef, "f").delete(streamId);
		__classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachRemoveTrackListener).call(this, streamId);
		this.emit("stream-removed", { stream: ref });
	}
}, _RemotePeer_detachRemoveTrackListener = function _RemotePeer_detachRemoveTrackListener(streamId) {
	const entry = __classPrivateFieldGet(this, _RemotePeer_streamRemoveTrackListeners, "f").get(streamId);
	if (!entry) return;
	__classPrivateFieldGet(this, _RemotePeer_streamRemoveTrackListeners, "f").delete(streamId);
	try {
		entry.stream.removeEventListener("removetrack", entry.listener);
	} catch {}
}, _RemotePeer_detachAllRemoveTrackListeners = function _RemotePeer_detachAllRemoveTrackListeners() {
	for (const streamId of Array.from(__classPrivateFieldGet(this, _RemotePeer_streamRemoveTrackListeners, "f").keys())) __classPrivateFieldGet(this, _RemotePeer_instances, "m", _RemotePeer_detachRemoveTrackListener).call(this, streamId);
}, _RemotePeer_attachConnectionListeners = function _RemotePeer_attachConnectionListeners() {
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").on("state-change", __classPrivateFieldGet(this, _RemotePeer_forwardStateChange, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").on("negotiation-error", __classPrivateFieldGet(this, _RemotePeer_forwardNegotiationError, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").on("ice-candidate-error", __classPrivateFieldGet(this, _RemotePeer_forwardIceCandidateError, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").on("track", __classPrivateFieldGet(this, _RemotePeer_forwardTrack, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").on("data-channel", __classPrivateFieldGet(this, _RemotePeer_forwardDataChannel, "f"));
}, _RemotePeer_detachConnectionListeners = function _RemotePeer_detachConnectionListeners() {
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").off("state-change", __classPrivateFieldGet(this, _RemotePeer_forwardStateChange, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").off("negotiation-error", __classPrivateFieldGet(this, _RemotePeer_forwardNegotiationError, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").off("ice-candidate-error", __classPrivateFieldGet(this, _RemotePeer_forwardIceCandidateError, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").off("track", __classPrivateFieldGet(this, _RemotePeer_forwardTrack, "f"));
	__classPrivateFieldGet(this, _RemotePeer_connection, "f").off("data-channel", __classPrivateFieldGet(this, _RemotePeer_forwardDataChannel, "f"));
};
/**
* Attach every track in `stream` to the peer connection. Each addTrack
* call queues a negotiationneeded event in the underlying PC; the
* PeerConnection wrapper batches those into a single SDP offer via the
* spec's automatic coalescing.
*
* Returns the senders in the same order as `stream.getTracks()` so
* callers can later replaceTrack / removeTrack on them directly.
*/
/**
* Attach a single track. Convenience wrapper around addTrack so callers
* don't have to manage the rest-args style.
*/
function attachTrack(pc, track, stream) {
	return stream ? pc.addTrack(track, stream) : pc.addTrack(track);
}
/**
* Detach the sender currently sourcing `track`, if any. Returns true
* iff a sender was matched and removed — useful for callers that need
* to know if their cleanup actually fired.
*/
function detachTrack(pc, track) {
	for (const sender of pc.getSenders()) if (sender.track === track) {
		pc.removeTrack(sender);
		return true;
	}
	return false;
}
/**
* Swap the track currently being sent on the sender owned by `oldTrack`
* for `newTrack` (or null to silence the sender). Does NOT trigger
* renegotiation when the new track's codec is compatible with the
* existing transceiver — that's the whole point.
*
* Returns true iff a matching sender was found.
*
* Throws if the underlying replaceTrack() rejects (incompatible codec,
* sender stopped, etc.) — that's an unrecoverable condition the caller
* needs to handle (typically by removeTrack + addTrack instead).
*/
async function replaceTrack(pc, oldTrack, newTrack) {
	for (const sender of pc.getSenders()) if (sender.track === oldTrack) {
		await sender.replaceTrack(newTrack);
		return true;
	}
	return false;
}
/**
* Type-guard for incoming `direct` payloads. MeteredPeer's orchestrator
* uses this to decide whether to forward to PeerConnection.handleSignal
* or surface to the customer as a regular direct message.
*
* Defensive: tolerates anything that doesn't look like an Object. A
* malicious peer could publish `null`, primitives, or pathological
* shapes — we don't want to crash on that.
*/
function isRtcSignal(data) {
	if (typeof data !== "object" || data === null) return false;
	const t = data.type;
	if (t === "rtc-description") {
		const d = data.description;
		if (typeof d !== "object" || d === null) return false;
		const dt = d.type;
		const sdp = d.sdp;
		return (dt === "offer" || dt === "answer") && typeof sdp === "string";
	}
	if (t === "rtc-ice") {
		const c = data.candidate;
		return c === null || typeof c === "object" && c !== null;
	}
	return false;
}
var _MeteredPeer_instances;
var _MeteredPeer_opts;
var _MeteredPeer_trackedTracks;
var _MeteredPeer_reconcilePending;
var _MeteredPeer_reconcileDeadlineTimer;
var _MeteredPeer_reconcileResubscribes;
var _MeteredPeer_joinOpts;
var _MeteredPeer_sendTrackMeta;
var _MeteredPeer_armReconcileDeadline;
var _MeteredPeer_clearReconcileDeadline;
var _MeteredPeer_onReconcileDeadline;
/**
* Reserved channel-name prefixes the server refuses to accept.
* Mirrored here so the SDK rejects synchronously with a typed error
* instead of letting the customer's join() round-trip and bounce
* back with a server-jargon `channel_reserved` rejection. Case-
* insensitive on the prefix per the server's matcher.
*/
var RESERVED_CHANNEL_PREFIX_RE = /^_(metered|internal|system)\//i;
/**
* Fallback maxMessageSize used when we need to size-check a send
* BEFORE the welcome has arrived. Matches the server's default
* (65 536 bytes) — the state gate normally prevents pre-welcome
* sends, but if a future code path bypasses the gate this value
* stays in sync with the server rather than false-positive-rejecting
* legitimate sub-64 KB payloads.
*/
var FALLBACK_MAX_MESSAGE_SIZE = 65536;
/**
* Defensive cap on the number of RemotePeer instances MeteredPeer
* will track for a single channel. The browser caps RTCPeerConnection
* instances around 256; we hit that ceiling first if a hostile or
* compromised server fans out presence-joined to thousands of peers.
* Picked at 256 to match the typical browser ceiling.
*/
var MAX_PEERS_PER_CHANNEL = 256;
/**
* Reconcile watchdog. After a reconnect's welcome, the server is
* expected to answer the SDK's resubscribe with a presence snapshot
* for the joined channel — that snapshot is what completes the
* reconcile and returns the peer to "joined". If it doesn't arrive
* within this window (resubscribe frame lost, rejected, or the
* snapshot itself dropped), the SDK re-issues the subscribe itself
* (idempotent server-side) up to MAX_RECONCILE_RESUBSCRIBES times,
* then surfaces a `ReconcileTimeoutError` on the `error` event so
* the customer's app can recover (close + construct a new instance)
* instead of sitting in "reconnecting" forever.
*/
var RECONCILE_DEADLINE_MS = 1e4;
var MAX_RECONCILE_RESUBSCRIBES = 2;
/**
* Reserved-key prefix the SDK uses to ride control messages over the
* customer-visible `direct` channel. Any payload arriving with this
* exact field is intercepted by onDirect and never surfaced to the
* customer's `data` event. Customers MUST NOT send payloads with this
* key — see `peer.addTrack` docs for the documented limitation.
*/
var TRACK_META_KEY = "__meteredTrackMeta";
function trackMetaBody(track, metadata, stream) {
	if (metadata === void 0) return { trackId: track.id };
	return {
		trackId: track.id,
		metadata,
		kind: track.kind,
		...stream !== void 0 && stream.id !== "" ? { streamId: stream.id } : {}
	};
}
/** Longest streamId / kind accepted inbound; real values are UUIDs / "audio" | "video". */
var MAX_TRACK_META_ID_LEN = 256;
function isOptionalId(value) {
	return value === void 0 || typeof value === "string" && value.length > 0 && value.length <= MAX_TRACK_META_ID_LEN;
}
/**
* Plain-object check for `metadata`. Excludes arrays (which are
* objects in JS), null, primitives. Customer code does
* `Object.assign(target, ev.metadata)` and `for (const k in ev.metadata)`
* — both behave surprisingly on arrays / null / primitives, so we
* reject malformed shapes at the receive boundary instead of letting
* them masquerade as StreamMetadata.
*/
function isPlainObjectMetadata(value) {
	if (typeof value !== "object" || value === null) return false;
	if (Array.isArray(value)) return false;
	return true;
}
/**
* Close codes that always mean "your code or your auth is wrong" —
* the reconnect ladder won't recover. We surface these as MeteredPeer.error
* so customers wiring a single error listener get notified.
*
* Codes per the hosted errors-and-codes reference: 4001 invalid_token,
* 4002 token_expired, 4003 channel_not_authorized, 4012
* account_suspended, 4020 admin_kick.
* Other terminal closes (1001 going_away, etc.) are routed via
* the standard disconnected/left events.
*/
function isFatalCloseCode(code) {
	return code === 4001 || code === 4002 || code === 4003 || code === 4012 || code === 4020;
}
function closeCodeName(code) {
	switch (code) {
		case 4001: return "invalid_token";
		case 4002: return "token_expired";
		case 4003: return "channel_not_authorized";
		case 4012: return "account_suspended";
		case 4020: return "admin_disconnect";
		default: return `close_${code}`;
	}
}
function isTrackMetaMessage(data) {
	if (typeof data !== "object" || data === null) return false;
	const wrapper = data[TRACK_META_KEY];
	if (typeof wrapper !== "object" || wrapper === null) return false;
	const { trackId, metadata, streamId, kind } = wrapper;
	if (typeof trackId !== "string" || trackId.length === 0) return false;
	if (!isOptionalId(streamId) || !isOptionalId(kind)) return false;
	if (metadata !== void 0 && !isPlainObjectMetadata(metadata)) return false;
	return true;
}
/**
* Thrown by `send()` when the JSON-serialized payload would exceed
* the server's per-message cap. Typed so customers can branch on
* `instanceof MeteredPeerOversizedError` without parsing message
* strings.
*/
var MeteredPeerOversizedError = class extends Error {
	constructor(size, cap) {
		super(`MeteredPeer.send: payload ${size} bytes exceeds server cap ${cap} bytes`);
		this.name = "MeteredPeerOversizedError";
		this.size = size;
		this.cap = cap;
	}
};
/**
* Thrown by `send()` when the channel name uses a server-reserved
* prefix or when the SDK isn't in a state that can accept sends
* (not currently joined).
*/
var MeteredPeerSendError = class extends Error {
	constructor(code, message) {
		super(message);
		this.name = "MeteredPeerSendError";
		this.code = code;
	}
};
/**
* Thrown by `replaceTrack()` when ANY peer's underlying replaceTrack
* rejects. Carries per-peer success / failure so customers can
* converge surgically rather than guessing which side of the
* fanout completed.
*
* Why a typed error and not just a single rejected promise: the
* underlying `Promise.allSettled` fanout means a partial failure
* leaves the channel in a split state — peers 1, 2, 4 on newTrack,
* peer 3 still on oldTrack. Without the failed/succeeded lists,
* the customer's natural retry (`removeStream` + `addStream`) can't
* reconcile because `detachStream` matches by `sender.track === track`
* and already-replaced peers won't match. With the lists, the
* customer can call replaceTrack(newTrack, oldTrack) on just the
* failed subset (or removeTrack from PC + addStream the new track)
* without disturbing the already-replaced peers.
*/
/**
* Thrown synchronously by methods that can't safely act in the
* current `MeteredPeer.state` — `join`, `addStream`, `addTrack`,
* `removeStream`, `removeTrack`, `replaceTrack`. Typed so customers
* can branch via `instanceof` / `e.code` instead of parsing message
* strings (which the SDK doesn't promise to keep stable).
*
* Codes:
*   - `invalid_state` — generic "wrong state for this call". The
*     `method` and `currentState` fields tell you which.
*   - `track_already_attached` — addTrack/addStream called for a
*     track already in the SDK's tracking map with a different
*     stream association. Multi-stream membership (one track shared
*     across multiple MediaStreams) is not currently supported; the
*     SDK rejects loudly instead of silently dropping the second
*     association.
*/
var MeteredPeerStateError = class extends Error {
	constructor(code, method, message, currentState) {
		super(message);
		this.name = "MeteredPeerStateError";
		this.code = code;
		this.method = method;
		if (currentState !== void 0) this.currentState = currentState;
	}
};
var MeteredPeerReplaceTrackError = class extends Error {
	constructor(succeeded, failed) {
		super(`MeteredPeer.replaceTrack: ${failed.length} of ${succeeded.length + failed.length} peer(s) failed`);
		this.name = "MeteredPeerReplaceTrackError";
		this.succeeded = succeeded;
		this.failed = failed;
	}
};
var MeteredPeer = class extends EventEmitter {
	constructor(opts) {
		super();
		_MeteredPeer_instances.add(this);
		_MeteredPeer_opts.set(this, void 0);
		this._state = "idle";
		this._localPeerId = null;
		this._channel = null;
		this._iceServers = void 0;
		this._maxMessageSize = FALLBACK_MAX_MESSAGE_SIZE;
		this.peers = /* @__PURE__ */ new Map();
		_MeteredPeer_trackedTracks.set(this, /* @__PURE__ */ new Map());
		_MeteredPeer_reconcilePending.set(this, false);
		_MeteredPeer_reconcileDeadlineTimer.set(this, null);
		_MeteredPeer_reconcileResubscribes.set(this, 0);
		_MeteredPeer_joinOpts.set(this, {});
		this.onSignallingConnected = (ev) => {
			this._localPeerId = ev.peerId;
			this._iceServers = ev.iceServers ?? this._iceServers;
			this._maxMessageSize = ev.maxMessageSize;
			if (ev.isReconnect && this._state === "reconnecting") {
				if (this.peers.size === 0) {
					__classPrivateFieldSet(this, _MeteredPeer_reconcilePending, false, "f");
					__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
					this.setState("joined");
					return;
				}
				__classPrivateFieldSet(this, _MeteredPeer_reconcilePending, true, "f");
				__classPrivateFieldSet(this, _MeteredPeer_reconcileResubscribes, 0, "f");
				__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_armReconcileDeadline).call(this);
			}
		};
		this.onSignallingDisconnected = (ev) => {
			if (this._state === "closed" || this._state === "leaving") return;
			if (this._state === "joining") {
				if (isFatalCloseCode(ev.code)) {
					const err = /* @__PURE__ */ new Error(`connection closed terminally (code ${ev.code})${ev.reason ? `: ${ev.reason}` : ""}`);
					err.name = closeCodeName(ev.code);
					this.emit("error", { err });
				}
				if (ev.willReconnect) this.client.close();
				return;
			}
			if (ev.willReconnect && (this._state === "joined" || this._state === "reconnecting")) {
				__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
				__classPrivateFieldSet(this, _MeteredPeer_reconcilePending, true, "f");
				for (const peer of this.peers.values()) if (peer.state !== "reconnecting" && peer.state !== "closed" && peer.state !== "idle") peer._setState("reconnecting");
				if (this._state !== "reconnecting") this.setState("reconnecting");
				return;
			}
			if (!ev.willReconnect && isFatalCloseCode(ev.code)) {
				const err = /* @__PURE__ */ new Error(`connection closed terminally (code ${ev.code})${ev.reason ? `: ${ev.reason}` : ""}`);
				err.name = closeCodeName(ev.code);
				this.emit("error", { err });
			}
			if (ev.willReconnect) this.client.close();
			for (const peer of Array.from(this.peers.values())) this.removePeer(peer.id);
			__classPrivateFieldSet(this, _MeteredPeer_reconcilePending, false, "f");
			__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
			const closedPeerId = this._localPeerId;
			const closedChannel = this._channel;
			this._channel = null;
			this.setState("closed");
			this.emit("left", {
				peerId: closedPeerId,
				channel: closedChannel,
				reason: ev.reason || `disconnected (code ${ev.code})`
			});
		};
		/**
		* Server-error events that customers need to see as fatal.
		*
		* Most server-errors are correlated to a pending request and come
		* back as Promise.reject from subscribe/publish/sendTo. Those
		* never reach this handler. The uncorrelated ones (server-initiated
		* rejections without a requestId — typically over_message_quota
		* mid-stream) DO surface here.
		*
		* Filter for codes the customer must react to (account suspended,
		* channel unauthorized, action not permitted on the joined channel).
		* Pure quota / rate-limit signals stay below the noise floor and
		* customers can read them off `server-error` directly if needed.
		*/
		this.onServerError = (ev) => {
			if (!(/* @__PURE__ */ new Set([
				"account_suspended",
				"channel_not_authorized",
				"action_not_permitted",
				"invalid_token",
				"token_expired"
			])).has(ev.code)) return;
			const err = /* @__PURE__ */ new Error(`server error: ${ev.code}${ev.message ? ` — ${ev.message}` : ""}`);
			err.name = ev.code;
			this.emit("error", { err });
		};
		/**
		* Token provider has failed N consecutive reconnect attempts.
		* The SignallingClient's reconnect ladder keeps retrying internally,
		* but at this point the customer's auth pipeline is the bottleneck
		* — surface it to the customer-facing error channel so a UI can
		* prompt re-login.
		*
		* The threshold mirrors the default in SignallingClient's
		* token-provider-error event (3 consecutive failures); we don't
		* over-amplify by re-emitting on every retry.
		*/
		this.onTokenProviderError = (ev) => {
			const err = /* @__PURE__ */ new Error(`token provider failed ${ev.consecutiveFailures} consecutive attempts: ${ev.err.message}`);
			err.name = "TokenProviderError";
			this.emit("error", { err });
		};
		this.onPresence = (ev) => {
			if (ev.channel !== this._channel) return;
			if (__classPrivateFieldGet(this, _MeteredPeer_reconcilePending, "f")) {
				__classPrivateFieldSet(this, _MeteredPeer_reconcilePending, false, "f");
				__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
				this.reconcileFromSnapshot(ev.joined);
				return;
			}
			for (const p of ev.joined) this.addPeer(p.peerId, p.metadata);
			for (const p of ev.left) this.removePeer(p.peerId);
		};
		this.onDirect = (ev) => {
			if (isRtcSignal(ev.data)) {
				const peer = this.peers.get(ev.from);
				if (!peer) return;
				peer._handleSignal(ev.data);
				return;
			}
			if (isTrackMetaMessage(ev.data)) {
				const peer = this.peers.get(ev.from);
				if (!peer) return;
				const { trackId, metadata, streamId, kind } = ev.data[TRACK_META_KEY];
				peer._setTrackMetadata(trackId, metadata, streamId, kind);
				return;
			}
			if (!this.peers.has(ev.from)) {
				__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.debug?.("MeteredPeer: dropping direct from unknown peerId", { from: ev.from });
				return;
			}
			this.emit("data", {
				senderPeerId: ev.from,
				data: ev.data,
				kind: "direct",
				...ev.fromMetadata !== void 0 ? { senderMetadata: ev.fromMetadata } : {}
			});
		};
		this.onMessage = (ev) => {
			if (ev.channel !== this._channel) return;
			if (this._localPeerId !== null && ev.from === this._localPeerId) return;
			this.emit("data", {
				senderPeerId: ev.from,
				data: ev.data,
				kind: "broadcast",
				...ev.fromMetadata !== void 0 ? { senderMetadata: ev.fromMetadata } : {}
			});
		};
		/**
		* The signalling adapter passed into every PeerConnection. Wraps
		* SignallingClient.send so SDP / ICE signals route through the
		* server's `direct` channel to the target peer.
		*/
		this.signallingSender = { send: (toPeerId, data) => this.client.send(toPeerId, data) };
		if (opts.autoResubscribe === false) throw new TypeError("MeteredPeer: `autoResubscribe: false` is not supported — MeteredPeer relies on the automatic re-subscribe to restore your channel after a reconnect. Use SignallingClient directly for manual subscription control.");
		__classPrivateFieldSet(this, _MeteredPeer_opts, opts, "f");
		this.client = new SignallingClient(opts);
		this.client.on("connected", this.onSignallingConnected);
		this.client.on("disconnected", this.onSignallingDisconnected);
		this.client.on("presence", this.onPresence);
		this.client.on("direct", this.onDirect);
		this.client.on("message", this.onMessage);
		this.client.on("server-error", this.onServerError);
		this.client.on("token-provider-error", this.onTokenProviderError);
	}
	/**
	* toJSON override. Prevents accidental credential leak when a
	* customer's logging / observability tooling stringifies the peer
	* (Sentry breadcrumbs, console.dir, JSON.stringify). The ES-private
	* #opts already makes this technically safe; pinning toJSON here
	* documents the intent explicitly and survives field refactors.
	*/
	toJSON() {
		return {
			state: this._state,
			peerId: this._localPeerId,
			channel: this._channel
		};
	}
	get state() {
		return this._state;
	}
	/** Stable peerId assigned by the server at first welcome. */
	get peerId() {
		return this._localPeerId;
	}
	/** The channel currently joined, or null. */
	get channel() {
		return this._channel;
	}
	/** Snapshot of currently-connected remote peers. */
	get remotePeers() {
		return Array.from(this.peers.values());
	}
	/**
	* Broadcast `data` to every peer in the channel via the
	* signalling-server's `publish` frame. The local peer's own send
	* is NOT echoed back to its own `data` event listener.
	*
	* Rejects if not currently joined or the server rejects the publish
	* (e.g., `over_message_quota`). For per-peer direct messaging use
	* `sendTo(peerId, data)`.
	*/
	send(data) {
		if (this._state !== "joined") return Promise.reject(new MeteredPeerSendError("not_joined", `MeteredPeer.send: not joined (state=${this._state}); call join() first`));
		if (data === void 0) return Promise.reject(new MeteredPeerSendError("invalid_args", "MeteredPeer.send(data): data must not be undefined"));
		if (this._channel === null) return Promise.reject(new MeteredPeerSendError("not_joined", "MeteredPeer.send: not in a channel; call join() first"));
		const sizeError = this.checkPayloadSize(data);
		if (sizeError) return Promise.reject(sizeError);
		return this.client.publish(this._channel, data);
	}
	/**
	* Send `data` directly to a single peer via the signalling-server's
	* `send` frame (server-routed, not WebRTC P2P). Use this for
	* lightweight messages without setting up a DataChannel.
	*
	* Rejects with a typed `MeteredPeerSendError` for `not_joined`,
	* `invalid_args`, or `self_send`; with `MeteredPeerOversizedError`
	* if the payload exceeds the server cap; or with the underlying
	* server error for missing peers / quota / authorization.
	*/
	sendTo(peerId, data) {
		if (this._state !== "joined") return Promise.reject(new MeteredPeerSendError("not_joined", `MeteredPeer.sendTo: not joined (state=${this._state}); call join() first`));
		if (typeof peerId !== "string" || peerId.length === 0) return Promise.reject(new MeteredPeerSendError("invalid_args", "MeteredPeer.sendTo(peerId, data): peerId must be a non-empty string"));
		if (data === void 0) return Promise.reject(new MeteredPeerSendError("invalid_args", "MeteredPeer.sendTo(peerId, data): data must not be undefined"));
		if (this._localPeerId !== null && peerId === this._localPeerId) return Promise.reject(new MeteredPeerSendError("self_send", "MeteredPeer.sendTo: cannot send to self (peerId equals local peerId)"));
		if (typeof data === "object" && data !== null && TRACK_META_KEY in data) __classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.(`MeteredPeer.sendTo: payload uses reserved key '${TRACK_META_KEY}'; this collides with the SDK's track-metadata control channel and may be interpreted as a metadata update on the receiver. Use a different key for your payload.`, { toPeerId: peerId });
		if (isRtcSignal(data)) __classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("MeteredPeer.sendTo: payload matches the SDK's internal WebRTC signalling shape (type 'rtc-description' / 'rtc-ice'); the recipient SDK will consume it as a connection signal instead of delivering it to the 'data' event. Use a different 'type' value in your payload.", { toPeerId: peerId });
		const sizeError = this.checkPayloadSize(data);
		if (sizeError) return Promise.reject(sizeError);
		return this.client.send(peerId, data);
	}
	/**
	* Pre-compute the JSON-serialised byte length of an outbound
	* payload and reject if it would exceed the welcome-advertised cap.
	* Cheaper than waiting for the server to close the socket with
	* code 1009. Returns null on success.
	*
	* utf8ByteLength measures the serialized payload without requiring a
	* global TextEncoder, so the check works on runtimes that lack one
	* (some React Native / Hermes versions). Shared with the DataChannel
	* wrapper.
	*/
	checkPayloadSize(data) {
		let serialised;
		try {
			serialised = JSON.stringify(data);
		} catch {
			return null;
		}
		const size = utf8ByteLength(serialised);
		if (size > this._maxMessageSize) return new MeteredPeerOversizedError(size, this._maxMessageSize);
		return null;
	}
	/**
	* Attach every track in `stream` to every current and future
	* RemotePeer. Sugar over `addTrack(t, stream, metadata)` per track.
	*
	* `metadata`, if provided, is stamped on EACH of the stream's tracks
	* (a fresh copy per track to avoid customer-side aliasing). The
	* receiver surfaces it on the `track` event and on `stream-added`
	* (which fires when the stream's id first appears at the remote).
	*
	* Tracks are tracked on this MeteredPeer so peers joining AFTER this
	* call also receive them. Calling addStream with the same stream
	* twice is idempotent — already-tracked tracks are skipped.
	*
	* Throws if the peer is in a terminal state (`leaving` / `closed`).
	* During `reconnecting`, tracks are added to the tracking map but
	* not fanned out to the in-flight (about-to-be-discarded) connections;
	* once the connection recovers, every tracked stream is automatically
	* re-attached to each surviving peer's new connection.
	*/
	addStream(stream, metadata) {
		if (this._state === "leaving" || this._state === "closed") throw new MeteredPeerStateError("invalid_state", "addStream", `MeteredPeer.addStream: cannot add streams in state '${this._state}'`, this._state);
		for (const track of stream.getTracks()) {
			const perTrackMeta = metadata !== void 0 ? { ...metadata } : void 0;
			this.addTrack(track, stream, perTrackMeta);
		}
	}
	/**
	* Remove `stream` from every current peer and stop tracking its
	* tracks for future joins. Sugar over `removeTrack(track)` per track.
	*
	* No-op for tracks that were never added. Throws in terminal states
	* (`leaving` / `closed`). During `reconnecting`, tracks are removed
	* from the tracking map but no detach fires — the about-to-be-
	* replaced PCs will be discarded anyway.
	*/
	removeStream(stream) {
		if (this._state === "leaving" || this._state === "closed") throw new MeteredPeerStateError("invalid_state", "removeStream", `MeteredPeer.removeStream: cannot remove streams in state '${this._state}'`, this._state);
		for (const track of stream.getTracks()) this.removeTrack(track);
	}
	/**
	* Attach a single track to every current and future RemotePeer. The
	* lower-level primitive that addStream sugars over.
	*
	* Pass `stream` to associate the track with a MediaStream on the
	* wire — the receiver sees that stream in the track event's `streams`
	* array, and (the first time the stream id appears) fires a
	* `stream-added` event. Omit `stream` for an unaffiliated track —
	* the receiver gets `streams: []` on the track event and no
	* `stream-added`.
	*
	* `metadata`, if provided, is propagated to every connected peer via
	* a reserved-key signalling message BEFORE the SDP offer goes out,
	* so the metadata lands at the receiver before the track event
	* fires. Survivors on reconcile get the metadata re-sent during the
	* PC swap; newcomers get it during their initial addTrack fanout.
	*
	* Idempotent on the same `track` reference — calling addTrack twice
	* with the same track is a no-op (metadata + stream from the FIRST
	* call wins; subsequent ones are dropped). To change metadata for an
	* already-tracked track, call `removeTrack(t)` then `addTrack(t, ...)`
	* with the new values.
	*
	* Throws in terminal states (`leaving` / `closed`). During
	* `reconnecting`, the track is added to the tracking map but not
	* fanned out; once the connection recovers, every tracked track is
	* automatically re-attached to each surviving peer's new connection
	* (its metadata is re-sent before the track so ordering is preserved
	* relative to the SDP offer).
	*/
	addTrack(track, stream, metadata) {
		if (this._state === "leaving" || this._state === "closed") throw new MeteredPeerStateError("invalid_state", "addTrack", `MeteredPeer.addTrack: cannot add tracks in state '${this._state}'`, this._state);
		const existing = __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(track);
		if (existing !== void 0) {
			if (existing.stream === stream) return;
			throw new MeteredPeerStateError("track_already_attached", "addTrack", `MeteredPeer.addTrack: track is already attached to ${existing.stream === void 0 ? "an orphan slot" : `stream '${existing.stream.id}'`}. Multi-stream membership (one track shared across multiple MediaStreams) is not currently supported — use distinct tracks per stream, or removeTrack(t) before re-adding.`);
		}
		if (metadata !== void 0) {
			const sizeError = this.checkPayloadSize({ [TRACK_META_KEY]: trackMetaBody(track, metadata, stream) });
			if (sizeError) throw sizeError;
		}
		__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").set(track, {
			stream,
			metadata
		});
		if (this._state === "joined") for (const peer of this.peers.values()) {
			if (metadata !== void 0) __classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, peer.id, track, metadata, stream);
			attachTrack(peer.pc, track, stream);
		}
	}
	/**
	* Remove a single track from every current peer and stop tracking it
	* for future joins. Counterpart to addTrack.
	*
	* No-op if `track` was never added. Throws in terminal states
	* (`leaving` / `closed`). During `reconnecting`, the track is
	* removed from the tracking map but no detach fires.
	*/
	removeTrack(track) {
		if (this._state === "leaving" || this._state === "closed") throw new MeteredPeerStateError("invalid_state", "removeTrack", `MeteredPeer.removeTrack: cannot remove tracks in state '${this._state}'`, this._state);
		const entry = __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(track);
		if (entry === void 0) return;
		__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").delete(track);
		if (this._state === "joined") for (const peer of this.peers.values()) {
			if (entry.metadata !== void 0) __classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, peer.id, track, void 0);
			detachTrack(peer.pc, track);
		}
	}
	/**
	* Look up the metadata the SDK is tracking for a sender-side track.
	* Returns undefined if `track` was never addTrack'd / addStream'd,
	* or if it was added without metadata.
	*/
	getTrackMetadata(track) {
		return __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(track)?.metadata;
	}
	/**
	* Look up the metadata the SDK is tracking for a sender-side stream.
	* Sugar for `getTrackMetadata(stream.getTracks()[0])` — returns the
	* first track's metadata. For uniform-metadata streams (the addStream
	* path), this is the metadata the customer passed. For mixed-metadata
	* streams (advanced addTrack with different metas per track),
	* customers needing per-track precision should use getTrackMetadata
	* directly.
	*
	* Returns undefined if the stream has no tracks, no tracks of the
	* stream are tracked, or the first tracked one was added without
	* metadata.
	*/
	getStreamMetadata(stream) {
		for (const track of stream.getTracks()) {
			const entry = __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(track);
			if (entry !== void 0) return entry.metadata;
		}
	}
	/**
	* Swap `oldTrack` for `newTrack` (or null to silence) across every
	* RemotePeer where it's currently being sent. Doesn't trigger
	* renegotiation when codecs match — the whole point of replaceTrack.
	*
	* Resolves when every peer's replaceTrack has resolved. If ANY peer
	* rejects (typical cause: incompatible codec), throws a typed
	* `MeteredPeerReplaceTrackError` carrying per-peer succeeded /
	* failed lists. Customers can converge surgically:
	*
	*   try { await peer.replaceTrack(oldT, newT); }
	*   catch (e) {
	*     if (e instanceof MeteredPeerReplaceTrackError) {
	*       // peers in e.succeeded are on newT; e.failed are still on oldT.
	*       // retry only the failed subset, or rebuild via removeStream
	*       // + addStream targeted at e.failed peers.
	*     }
	*   }
	*
	* If 0 peers are connected, resolves trivially with no work done.
	*/
	async replaceTrack(oldTrack, newTrack) {
		if (this._state === "reconnecting" || this._state === "leaving" || this._state === "closed") throw new MeteredPeerStateError("invalid_state", "replaceTrack", `MeteredPeer.replaceTrack: cannot replace tracks in state '${this._state}'. Wait for state === 'joined' (listen via the 'state-change' event) and retry.`, this._state);
		if (oldTrack == null) throw new TypeError("MeteredPeer.replaceTrack: oldTrack must be a MediaStreamTrack (got null/undefined). To remove a stream from peers, use removeStream() instead.");
		const targets = Array.from(this.peers.values()).map((p) => ({
			id: p.id,
			pc: p.pc
		}));
		const results = await Promise.allSettled(targets.map((t) => replaceTrack(t.pc, oldTrack, newTrack)));
		const succeeded = [];
		const failed = [];
		results.forEach((r, i) => {
			const target = targets[i];
			if (r.status === "fulfilled") succeeded.push(target.id);
			else failed.push({
				peerId: target.id,
				err: scrubError(r.reason)
			});
		});
		if (newTrack !== null && (succeeded.length > 0 || targets.length === 0)) {
			const entry = __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(oldTrack);
			if (entry !== void 0) {
				__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").delete(oldTrack);
				__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").set(newTrack, entry);
				if (entry.metadata !== void 0) for (const id of succeeded) {
					__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, id, oldTrack, void 0);
					__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, id, newTrack, entry.metadata, entry.stream);
				}
			}
		} else if (newTrack === null && (succeeded.length > 0 || targets.length === 0)) {
			const entry = __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").get(oldTrack);
			if (entry !== void 0) {
				__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").delete(oldTrack);
				if (entry.metadata !== void 0) for (const id of succeeded) __classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, id, oldTrack, void 0);
			}
		}
		if (failed.length > 0) throw new MeteredPeerReplaceTrackError(succeeded, failed);
	}
	/**
	* Connect to the signalling-server (if not connected) and subscribe
	* to `channel`. Resolves once the subscribe ack lands; peers are
	* discovered asynchronously via the server's `presence` event.
	*
	* Idempotent only in the success sense — re-joining the same channel
	* while already joined throws. To switch channels, construct a new
	* MeteredPeer (close() is terminal).
	*/
	async join(channel, opts = {}) {
		if (this._state !== "idle") throw new MeteredPeerStateError("invalid_state", "join", `MeteredPeer.join: cannot join in state '${this._state}'`, this._state);
		if (RESERVED_CHANNEL_PREFIX_RE.test(channel)) throw new MeteredPeerSendError("reserved_channel", `MeteredPeer.join: '${channel}' uses a reserved prefix (_metered/, _internal/, _system/)`);
		this.setState("joining");
		try {
			if (this.client.state === "idle" || this.client.state === "closed") await this.client.connect();
			__classPrivateFieldSet(this, _MeteredPeer_joinOpts, { ...opts }, "f");
			await this.client.subscribe(channel, opts);
			this._channel = channel;
			this.setState("joined");
			if (this._localPeerId !== null) this.emit("joined", {
				peerId: this._localPeerId,
				channel
			});
		} catch (err) {
			this.client.unsubscribe(channel).catch(() => {});
			if (this.state === "joining") this.setState("idle");
			throw err;
		}
	}
	/**
	* Close every remote peer connection, close the signalling socket,
	* and transition to "closed". Terminal — once close() has been
	* called, the MeteredPeer instance can't be reused; construct a new
	* one to rejoin. Idempotent.
	*/
	async close(reason) {
		const stateAtClose = this._state;
		if (stateAtClose === "closed" || stateAtClose === "idle" || stateAtClose === "leaving") {
			if (stateAtClose !== "leaving") {
				this.setState("closed");
				await this.client.close();
			}
			return;
		}
		this.setState("leaving");
		__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
		for (const peer of Array.from(this.peers.values())) this.removePeer(peer.id);
		__classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f").clear();
		const closedPeerId = this._localPeerId;
		const closedChannel = this._channel;
		await this.client.close();
		this._channel = null;
		this.setState("closed");
		this.emit("left", {
			peerId: closedPeerId,
			channel: closedChannel,
			...reason !== void 0 ? { reason } : {}
		});
	}
	/**
	* Reconcile: diff the post-reconnect snapshot against
	* `this.peers`. Order of operations:
	*
	*   1. Build the snapshot ID set (deduped, self filtered)
	*   2. Process departures FIRST — peers no longer in the channel.
	*      Fires `peer-left` with the OLD RemotePeer for each.
	*   3. Process snapshot entries:
	*      - Existing  → silent PC swap inside the same RemotePeer
	*      - Missing   → addPeer (fires `peer-joined`)
	*   4. Transition back to "joined"
	*
	* Doing departures first keeps the peers map size monotonically
	* decreasing as we iterate, easier to reason about.
	*/
	reconcileFromSnapshot(joined) {
		const snapshotIds = /* @__PURE__ */ new Set();
		for (const p of joined) {
			if (p.peerId === this._localPeerId) continue;
			snapshotIds.add(p.peerId);
		}
		for (const peerId of Array.from(this.peers.keys())) {
			if (this._state !== "reconnecting") return;
			if (!snapshotIds.has(peerId)) this.removePeer(peerId);
		}
		for (const p of joined) {
			if (this._state !== "reconnecting") return;
			if (p.peerId === this._localPeerId) continue;
			const existing = this.peers.get(p.peerId);
			try {
				if (existing) {
					existing._setMetadata(p.metadata);
					this.swapPeerConnection(existing);
				} else this.addPeer(p.peerId, p.metadata);
			} catch (err) {
				__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("reconcile peer swap failed", {
					peerId: p.peerId,
					err: err?.message
				});
			}
		}
		if (this._state === "reconnecting") this.setState("joined");
	}
	/**
	* Silent PC swap for a surviving RemotePeer. Builds a fresh
	* PeerConnection with the latest iceServers + signalling sender,
	* hands it to the RemotePeer (which detaches old listeners, closes
	* the old PC, and re-attaches to the new one), then re-attaches
	* every local stream from `#localStreams` so the new PC ships
	* the customer's media in its first SDP offer.
	*
	* Does NOT fire peer-left / peer-joined — the customer's ref to
	* `remote` is the same instance before and after this call.
	*/
	swapPeerConnection(remote) {
		if (this._localPeerId === null) return;
		if (remote.state !== "reconnecting" && remote.state !== "closed" && remote.state !== "idle") remote._setState("reconnecting");
		const polite = this._localPeerId < remote.id;
		const newConn = new PeerConnection({
			localPeerId: this._localPeerId,
			remotePeerId: remote.id,
			polite,
			signallingSender: this.signallingSender,
			...this._iceServers ? { iceServers: this._iceServers } : {},
			...__classPrivateFieldGet(this, _MeteredPeer_opts, "f").rtcPeerConnectionFactory ? { rtcPeerConnectionFactory: __classPrivateFieldGet(this, _MeteredPeer_opts, "f").rtcPeerConnectionFactory } : {}
		});
		remote._setConnection(newConn);
		for (const [track, entry] of __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f")) if (entry.metadata !== void 0) __classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, remote.id, track, entry.metadata, entry.stream);
		for (const [track, entry] of __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f")) attachTrack(remote.pc, track, entry.stream);
	}
	addPeer(peerId, metadata) {
		if (peerId === this._localPeerId) return;
		if (this.peers.has(peerId)) return;
		if (this._localPeerId === null) return;
		if (this.peers.size >= MAX_PEERS_PER_CHANNEL) {
			__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("MeteredPeer: peer cap reached, dropping peer-joined", {
				peerId,
				cap: MAX_PEERS_PER_CHANNEL
			});
			return;
		}
		const polite = this._localPeerId < peerId;
		const connection = new PeerConnection({
			localPeerId: this._localPeerId,
			remotePeerId: peerId,
			polite,
			signallingSender: this.signallingSender,
			...this._iceServers ? { iceServers: this._iceServers } : {},
			...__classPrivateFieldGet(this, _MeteredPeer_opts, "f").rtcPeerConnectionFactory ? { rtcPeerConnectionFactory: __classPrivateFieldGet(this, _MeteredPeer_opts, "f").rtcPeerConnectionFactory } : {}
		});
		const remote = new RemotePeer({
			id: peerId,
			...metadata !== void 0 ? { metadata } : {},
			connection,
			send: (data) => this.sendTo(peerId, data)
		});
		this.peers.set(peerId, remote);
		for (const [track, entry] of __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f")) if (entry.metadata !== void 0) __classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_sendTrackMeta).call(this, peerId, track, entry.metadata, entry.stream);
		for (const [track, entry] of __classPrivateFieldGet(this, _MeteredPeer_trackedTracks, "f")) attachTrack(remote.pc, track, entry.stream);
		this.emit("peer-joined", { peer: remote });
	}
	removePeer(peerId) {
		const remote = this.peers.get(peerId);
		if (!remote) {
			__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("MeteredPeer: peer-left for unknown peerId", { peerId });
			return;
		}
		this.peers.delete(peerId);
		remote._close();
		this.emit("peer-left", { peer: remote });
	}
	setState(next) {
		if (next === this._state) return;
		const from = this._state;
		this._state = next;
		this.emit("state-change", {
			from,
			to: next
		});
	}
};
_MeteredPeer_opts = /* @__PURE__ */ new WeakMap(), _MeteredPeer_trackedTracks = /* @__PURE__ */ new WeakMap(), _MeteredPeer_reconcilePending = /* @__PURE__ */ new WeakMap(), _MeteredPeer_reconcileDeadlineTimer = /* @__PURE__ */ new WeakMap(), _MeteredPeer_reconcileResubscribes = /* @__PURE__ */ new WeakMap(), _MeteredPeer_joinOpts = /* @__PURE__ */ new WeakMap(), _MeteredPeer_instances = /* @__PURE__ */ new WeakSet(), _MeteredPeer_sendTrackMeta = function _MeteredPeer_sendTrackMeta(toPeerId, track, metadata, stream) {
	const payload = { [TRACK_META_KEY]: trackMetaBody(track, metadata, stream) };
	const trackId = track.id;
	this.client.send(toPeerId, payload).catch((err) => {
		__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("track metadata send failed", {
			toPeerId,
			trackId,
			err: err instanceof Error ? err.message : String(err)
		});
	});
}, _MeteredPeer_armReconcileDeadline = function _MeteredPeer_armReconcileDeadline() {
	__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_clearReconcileDeadline).call(this);
	__classPrivateFieldSet(this, _MeteredPeer_reconcileDeadlineTimer, setTimeout(() => {
		__classPrivateFieldSet(this, _MeteredPeer_reconcileDeadlineTimer, null, "f");
		__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_onReconcileDeadline).call(this);
	}, RECONCILE_DEADLINE_MS), "f");
}, _MeteredPeer_clearReconcileDeadline = function _MeteredPeer_clearReconcileDeadline() {
	if (__classPrivateFieldGet(this, _MeteredPeer_reconcileDeadlineTimer, "f") !== null) {
		clearTimeout(__classPrivateFieldGet(this, _MeteredPeer_reconcileDeadlineTimer, "f"));
		__classPrivateFieldSet(this, _MeteredPeer_reconcileDeadlineTimer, null, "f");
	}
}, _MeteredPeer_onReconcileDeadline = function _MeteredPeer_onReconcileDeadline() {
	if (!__classPrivateFieldGet(this, _MeteredPeer_reconcilePending, "f") || this._state !== "reconnecting") return;
	if (this.client.state !== "connected") return;
	if (this._channel === null) return;
	if (__classPrivateFieldGet(this, _MeteredPeer_reconcileResubscribes, "f") < MAX_RECONCILE_RESUBSCRIBES) {
		__classPrivateFieldSet(this, _MeteredPeer_reconcileResubscribes, __classPrivateFieldGet(this, _MeteredPeer_reconcileResubscribes, "f") + 1, "f");
		__classPrivateFieldGet(this, _MeteredPeer_opts, "f").logger?.warn?.("MeteredPeer: no presence snapshot after reconnect; re-issuing subscribe", {
			channel: this._channel,
			attempt: __classPrivateFieldGet(this, _MeteredPeer_reconcileResubscribes, "f")
		});
		this.client.subscribe(this._channel, __classPrivateFieldGet(this, _MeteredPeer_joinOpts, "f")).catch(() => {});
		__classPrivateFieldGet(this, _MeteredPeer_instances, "m", _MeteredPeer_armReconcileDeadline).call(this);
	} else {
		const err = /* @__PURE__ */ new Error("reconcile timed out: no channel presence arrived after reconnect; close() this instance and construct a new MeteredPeer to recover");
		err.name = "ReconcileTimeoutError";
		this.emit("error", { err });
	}
};
/**
* Browser WebSocket client speaking the Metered Realtime Messaging
* wire protocol.
*
* Usage (pk_ key path):
*   const client = new SignallingClient({ apiKey: "pk_live_..." });
*   await client.connect();
*   client.on("message", ({ channel, from, data }) => { ... });
*   await client.subscribe("room-42");
*   await client.publish("room-42", { hello: "world" });
*
* Usage (sk_ JWT path):
*   const client = new SignallingClient({
*     tokenProvider: async () => {
*       const r = await fetch("/api/mint-signalling-token");
*       const { token } = await r.json();
*       return token;
*     },
*   });
*   await client.connect();
*
* Connection lifecycle:
*   - connect() resolves after the welcome frame arrives
*   - close() is terminal — no auto-reconnect after explicit close
*   - Auto-reconnect on transient drops is built-in (see ReconnectOptions)
*/
var SignallingClient = class {
	constructor(opts) {
		this._impl = new SignallingClientImpl(opts);
	}
	get state() {
		return this._impl.state;
	}
	connect() {
		return this._impl.connect();
	}
	close(code, reason) {
		return this._impl.close(code, reason);
	}
	subscribe(channel, opts) {
		return this._impl.subscribe(channel, opts);
	}
	unsubscribe(channel) {
		return this._impl.unsubscribe(channel);
	}
	publish(channel, data, opts) {
		return this._impl.publish(channel, data, opts);
	}
	send(toPeerId, data, opts) {
		return this._impl.send(toPeerId, data, opts);
	}
	on(event, handler) {
		this._impl.on(event, handler);
		return this;
	}
	off(event, handler) {
		this._impl.off(event, handler);
		return this;
	}
	once(event, handler) {
		this._impl.once(event, handler);
		return this;
	}
};
//#endregion
export { dist_exports as t };
