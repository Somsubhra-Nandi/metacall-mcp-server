import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { DeployEnabledSchema } from "../schemas/account.schema.js";
import type { MCPToolDefinition } from "../types.js";

//deployEnabled tool definition to check if deployment is enabled for the MetaCall account
export const deployEnabledTool: MCPToolDefinition = {
  name: "deployEnabled",

  description: "Checks whether deployment is enabled for the MetaCall account.",

  schema: DeployEnabledSchema,

  execute: createToolHandler(
    DeployEnabledSchema,
    async () => {
      const enabled = await api.deployEnabled();

      return {
        deployEnabled: enabled
      };
    }
  )
};