//imports
import { ReadySchema } from "../schemas/system.schema.js";
import { createToolHandler } from "../toolFactory.js";
import { api } from "../../protocol/client.js";
import type { MCPToolDefinition } from "../types.js";

//Handler for the "ready" tool, which checks if the MetaCall FaaS API is ready and reachable.
export const readyTool: MCPToolDefinition = {
  name: "ready",
  description: "Checks if the MetaCall FaaS API is ready and reachable.",
  schema: ReadySchema,
  execute: createToolHandler(
    ReadySchema,
    async () => {
      const result = await api.ready();
      return { ready: result };
    }
  )
};