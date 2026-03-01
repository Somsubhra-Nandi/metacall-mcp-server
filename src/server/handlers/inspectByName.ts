import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { InspectByNameSchema } from "../schemas/inspectByName.schema.js";
import type { MCPToolDefinition } from "../types.js";

//definition of inspectByName tool, which allows users to inspect a deployment by its suffix.
export const inspectByNameTool: MCPToolDefinition = {
  name: "inspectByName",
  description: "Inspect deployment by suffix",
  schema: InspectByNameSchema,

  execute: createToolHandler(
    InspectByNameSchema,
    async ({ suffix }) => {
        try {
            const deployment = await api.inspectByName(suffix);
            return {
                found: !!deployment,
                deployment: deployment ?? null
            };
        } catch (error) {
            return {
                found: false,
                deployment: null
            };
        }
    }
)
};