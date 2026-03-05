import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { BranchListSchema } from "../schemas/branchList.schema.js";
import type { MCPToolDefinition } from "../types.js";

//Definition of the "branchList" tool.
export const branchListTool: MCPToolDefinition = {
  name: "branchList",
  description: "List all branches of a Git repository. Use this when you need to know which branch to inspect or deploy.",
  schema: BranchListSchema,

  execute: createToolHandler(
    BranchListSchema,
    async ({ url }) => {

      const branches = await api.branchList(url);

      return {
        repository: url,
        branches: branches.branches
      };
    }
  )
};