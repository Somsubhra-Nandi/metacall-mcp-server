import fs from "fs";
import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { UploadSchema } from "../schemas/upload.schema.js";
import type { MCPToolDefinition } from "../types.js";

//upload tool definition to upload a zip package to MetaCall Cloud before deploying.
export const uploadTool: MCPToolDefinition = {
  name: "upload",
  description: "Upload a zip package to MetaCall Cloud before deploying.",
  schema: UploadSchema,

  execute: createToolHandler(
    UploadSchema,
    async ({ name, zipPath, zipBase64, jsons = [], runners = [] }) => {

      let blob: Buffer;

      if (zipPath) {
        if (!fs.existsSync(zipPath)) {
          throw new Error(`Zip file not found at path: ${zipPath}`);
        }

        blob = fs.readFileSync(zipPath);
      } 
      else {
        blob = Buffer.from(zipBase64!, "base64");
      }

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