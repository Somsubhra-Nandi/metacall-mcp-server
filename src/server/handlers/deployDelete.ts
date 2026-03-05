import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { DeployDeleteSchema } from "../schemas/deployDelete.schema.js";
import type { MCPToolDefinition } from "../types.js";

//Definition of the tool to delete the deployment from MetaCall FaaS.
export const deployDeleteTool: MCPToolDefinition = {
  name: "deployDelete",
  description: "Deletes a deployment and its associated package from MetaCall FaaS using the deployment suffix.",
  schema: DeployDeleteSchema,

  execute: createToolHandler(
    DeployDeleteSchema,
    async ({ suffix, version }) => {
      // Resolve deployment metadata
      const deployment = await api.inspectByName(suffix);
      const prefix = (deployment as any).prefix;
      // Delete deployment
      const result = await api.deployDelete(prefix, suffix, version ?? "v1");
      return {
        message: "Deployment deleted successfully",
        deployment: {
          prefix,
          suffix,
          version: version ?? "v1"
        },
        result
      };
    }
  )
};