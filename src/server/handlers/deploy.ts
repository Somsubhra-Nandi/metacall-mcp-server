import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { DeploySchema } from "../schemas/deploy.schema.js";
import type { MCPToolDefinition } from "../types.js";
import { ResourceType } from "@metacall/protocol";

export const deployTool: MCPToolDefinition = {
  name: "deploy",
  description: `
Deploy a package or repository to MetaCall Cloud.

Parameters:
- name:
    - For ResourceType.Package -> package name
    - For ResourceType.Repository -> The exact "id" returned by the Add repository tool. Do NOT use the Git URL.
- plan: subscription plan (Essential, Standard, Premium)
- release: branch name (e.g. main)
- version: deployment version (e.g. v1)
`,
  schema: DeploySchema,

  execute: createToolHandler(
    DeploySchema,
    async ({ name, env, plan, resourceType, release, version }) => {
      
      // "name" is now exactly the suffix we need (either the package name or the repo id).
      // We no longer need to parse URLs because Claude provides the exact MetaCall ID!
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