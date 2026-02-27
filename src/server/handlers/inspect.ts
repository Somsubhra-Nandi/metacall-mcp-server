import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { InspectSchema } from "../schemas/inspect.schema.js";
import type { MCPToolDefinition } from "../types.js";

export const inspectTool: MCPToolDefinition = {
  name: "inspect",
  description: "Lists all deployments available in the MetaCall FaaS account.",
  schema: InspectSchema,

  execute: createToolHandler(
    InspectSchema,
    async () => {
      try {
        const deployments = await api.inspect();
        return {
          success: true,
          count: deployments.length,
          deployments
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error
            ? error.message
            : "Failed to inspect deployments"
        };
      }
    }
  )
};