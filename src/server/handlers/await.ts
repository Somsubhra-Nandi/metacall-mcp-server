import { createToolHandler } from "../toolFactory.js";
import { AwaitSchema } from "../schemas/await.schema.js";
import type { MCPToolDefinition } from "../types.js";
import { invokeDeploymentFunction } from "../../utils/invokeDeploymentFunction.js";

export const awaitTool: MCPToolDefinition = {
  name: "await",

  description:
    "Invoke an asynchronous function from a deployed MetaCall service. Use this tool when the function returns a Promise, coroutine, or async result. Arguments must be provided as an object where keys match the function parameter names (e.g., async_add(a,b) → {\"a\":1,\"b\":2}). If required arguments are missing, ask the user for them before invoking.",

  schema: AwaitSchema,

  execute: createToolHandler(
    AwaitSchema,
    async ({ suffix, function: fn, args }) => {

      return invokeDeploymentFunction(
        suffix,
        fn,
        "await",
        args
      );

    }
  )
};