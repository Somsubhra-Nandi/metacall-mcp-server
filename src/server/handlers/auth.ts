import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { ValidateAuthSchema } from "../schemas/auth.schema.js";
import type { MCPToolDefinition } from "../types.js";

//validate tool definition to check if the current MetaCall authentication token
export const validateAuthTool: MCPToolDefinition = {
  name: "validate",

  description:
    "Validates the current MetaCall authentication token.",

  schema: ValidateAuthSchema,

  execute: createToolHandler(
    ValidateAuthSchema,

    async () => {
      const valid = await api.validate();

      return {
        valid,
        message: valid
          ? "Authentication token is valid"
          : "Authentication token is invalid"
      };
    }
  )
};