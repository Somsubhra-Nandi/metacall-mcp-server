import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { InspectSchema } from "../schemas/inspect.schema.js";
import type { MCPToolDefinition } from "../types.js";

//inspect tool definition to list all deployments available in the MetaCall FaaS account
export const inspectTool: MCPToolDefinition = {
  name: "inspect",
  description: "Lists all deployments available in the MetaCall FaaS account.",
  schema: InspectSchema,

  execute: createToolHandler(
    InspectSchema,
    async () => {
      const deployments = await api.inspect();
      return {
        count: deployments.length,
        deployments
      };
    }
  )
};