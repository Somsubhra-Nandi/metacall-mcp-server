import fs from "fs";
import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { UploadSchema } from "../schemas/upload.schema.js";
import type { MCPToolDefinition } from "../types.js";

//upload tool definition to upload a zip package before deploying.
export const uploadTool: MCPToolDefinition = {
  name: "upload",
  description:
    "Upload a zip package to MetaCall Cloud before deploying.",

  schema: UploadSchema,

  execute: createToolHandler(
    UploadSchema,
    async ({ name, zipPath, jsons = [], runners = [] }) => {
      // Ensure file exists
      if (!fs.existsSync(zipPath)) {
        throw new Error(`Zip file not found at path: ${zipPath}`);
      }
      const blob = fs.readFileSync(zipPath);
      const packageId = await api.upload(
        name,
        blob,
        jsons,
        runners
      );
      return {
        success: true,
        packageId
      };
    }
  )
};