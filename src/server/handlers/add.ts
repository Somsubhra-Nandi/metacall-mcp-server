import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { AddSchema } from "../schemas/add.schema.js";
import type { MCPToolDefinition } from "../types.js";

//Definition of the "add" tool.It registers a repository in MetaCall FaaS for deployment.
export const addTool: MCPToolDefinition = {
  name: "add",
  description: "Registers a repository in MetaCall FaaS for deployment.",
  schema: AddSchema,

  execute: createToolHandler(
    AddSchema,
    async ({ url, branch, jsons = [] }) => {

      const result = await api.add(
        url,
        branch,
        jsons
      );

      return {
        repositoryId: result.id,
        url,
        branch
      };
    }
  )
};