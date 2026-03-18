import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { DeploySchema } from "../schemas/deploy.schema.js";
import type { MCPToolDefinition } from "../types.js";
import { ResourceType } from "@metacall/protocol";

export const deployTool: MCPToolDefinition = {
  name: "deploy",
  description: `
Deploy a package or repository to MetaCall Cloud.

CRITICAL PREREQUISITE: 
MetaCall only allows ONE deployment per subscription plan (Essential, Standard, Premium). 
Before executing this deployment, you MUST check the user's currently active deployments and subscriptions to find an unused plan. If you attempt to deploy on a plan that is already in use, it will fail.

Parameters:
- name:
    - For ResourceType.Package -> package name
    - For ResourceType.Repository -> The exact "id" returned by the Add repository tool. Do NOT use the Git URL.
- plan: An available, UNUSED subscription plan (Essential, Standard, or Premium).
- release: branch name (e.g. main)
- version: deployment version (e.g. v1)
`,
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