import { z } from "zod";

export const InvokeSchema = z.object({
  suffix: z
    .string()
    .describe("Deployment suffix (usually the zip or repository name)"),

  function: z
    .string()
    .describe("Function name inside the deployed runtime"),

  type: z
    .enum(["call", "await"])
    .describe("Invocation type: synchronous call or asynchronous await"),

  args: z
    .record(z.any())
    .optional()
    .describe(
      "Object containing named arguments for the function. Keys must match the function parameter names. Example: add(a,b) → {\"a\":1,\"b\":2}. greet(name) → {\"name\":\"Somsubhra\"}. If required arguments are missing, ask the user for them before calling."
    )
});