import { readyTool } from "./system.js";
import { validateAuthTool } from "./auth.js";
import { deployEnabledTool } from "./account.js";

export const tools = [
  readyTool,
  validateAuthTool,
  deployEnabledTool
];