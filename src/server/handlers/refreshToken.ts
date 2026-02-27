import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { RefreshTokenSchema } from "../schemas/refresh.schema.js";
import type { MCPToolDefinition } from "../types.js";

//refresh tool definition to refresh the MetaCall authentication token
export const refreshTokenTool: MCPToolDefinition = {
  name: "refresh",
  description: "Refreshes the MetaCall authentication token.",
  schema: RefreshTokenSchema,

  execute: createToolHandler(
    RefreshTokenSchema,
    async () => {
      try {
        const newToken = await api.refresh();
        return {
          success: true,
          token: newToken,
          message: "Authentication token refreshed successfully"
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error
            ? error.message
            : "Failed to refresh authentication token"
        };
      }
    }
  )
};