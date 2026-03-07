import { createToolHandler } from "../toolFactory.js";
import { InvokeSchema } from "../schemas/invoke.schema.js";
import type { MCPToolDefinition } from "../types.js";
import { invokeDeploymentFunction } from "../../utils/invokeDeploymentFunction.js";

export const invokeTool: MCPToolDefinition = {
  name: "invoke",

  description:
    "Invoke a function from a deployed MetaCall service. Use type='call' for synchronous functions and type='await' for async functions.",

  schema: InvokeSchema,

  execute: createToolHandler(
    InvokeSchema,
    async ({ suffix, function: fn, type, args }) => {

      return invokeDeploymentFunction(
        suffix,
        fn,
        type,
        args
      );

    }
  )
};