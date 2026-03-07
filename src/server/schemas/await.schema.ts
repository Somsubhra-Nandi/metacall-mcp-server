import { z } from "zod";

export const AwaitSchema = z.object({
  suffix: z
    .string()
    .describe(
      "Deployment suffix (usually the zip or repository name)."
    ),

  function: z
    .string()
    .describe(
      "Name of the asynchronous function inside the deployed runtime."
    ),

  args: z
    .record(z.any())
    .optional()
    .describe(
      "Object containing named arguments for the function. Keys MUST match the parameter names defined in the function. Example: async_add(a,b) → {\"a\":1,\"b\":2}. If required arguments are missing, ask the user before invoking the tool."
    )
});