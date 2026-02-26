import metacallProtocolImport from "@metacall/protocol";
import type { API } from "@metacall/protocol";

if (!process.env.METACALL_TOKEN) {
  throw new Error("Missing METACALL_TOKEN");
}

if (!process.env.METACALL_BASE_URL) {
  throw new Error("Missing METACALL_BASE_URL");
}

// Fix CommonJS default export 
const metacallProtocol =
  (metacallProtocolImport as any).default ??
  metacallProtocolImport;

export const api: API = metacallProtocol(
  process.env.METACALL_TOKEN,
  process.env.METACALL_BASE_URL
);