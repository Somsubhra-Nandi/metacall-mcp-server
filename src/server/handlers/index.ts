import { readyTool } from "./system.js";
import { validateAuthTool } from "./auth.js";
import { deployEnabledTool } from "./account.js";
import { refreshTokenTool } from "./refreshToken.js";
import { inspectTool } from "./inspect.js";
import { inspectByNameTool } from "./inspectByName.js";

//export all tools

export const tools = [
  readyTool,
  validateAuthTool,
  deployEnabledTool,
  refreshTokenTool,
  inspectTool,
  inspectByNameTool
];