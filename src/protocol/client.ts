import * as metacallProtocolModule from "@metacall/protocol";

if (!process.env.METACALL_TOKEN) {
  throw new Error("Missing METACALL_TOKEN,renew your token");
}

if (!process.env.METACALL_BASE_URL) {
  throw new Error("Missing METACALL_BASE_URL,put your faas url");
}

//The callable function:
const metacallProtocol = (metacallProtocolModule as any).default.default;

export const api = metacallProtocol(
  process.env.METACALL_TOKEN!,
  process.env.METACALL_BASE_URL!
);