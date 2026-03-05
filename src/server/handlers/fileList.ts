import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { FileListSchema } from "../schemas/fileList.schema.js";
import type { MCPToolDefinition } from "../types.js";

//Definition of the "fileList" tool.
export const fileListTool: MCPToolDefinition = {
  name: "fileList",
  description: "List files from a Git repository branch. Use this instead of browsing the repository when you need to inspect its contents.",
  schema: FileListSchema,

  execute: createToolHandler(
    FileListSchema,
    async ({ url, branch }) => {

      const files = await api.fileList(url, branch);

      return {
        repository: url,
        branch,
        files
      };
    }
  )
};