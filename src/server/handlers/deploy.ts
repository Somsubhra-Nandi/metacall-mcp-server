import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { DeploySchema } from "../schemas/deploy.schema.js";
import type { MCPToolDefinition } from "../types.js";
import { ResourceType } from "@metacall/protocol";

export const deployTool: MCPToolDefinition = {
  name: "deploy",
  description: "Deploy a previously uploaded package or repository to MetaCall Cloud.",
  schema: DeploySchema,

  execute: createToolHandler(
    DeploySchema,
    async ({ name, env, plan, resourceType, release, version }) => {

      const deployment = await api.deploy(
        name,
        env ?? [],
        plan as any,
        resourceType,
        release,
        version
      );

      return {
        message: "Deployment created successfully",
        deployment
      };
    }
  )
};