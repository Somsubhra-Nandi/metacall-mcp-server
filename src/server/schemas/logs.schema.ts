import { z } from "zod";

export const LogsSchema = z.object({
  suffix: z
    .string()
    .describe(
      "Deployment suffix (usually the zip or repository name)."
    ),

  container: z
    .string()
    .describe(
      "Runtime container name whose logs should be retrieved. Examples: python, node, rust."
    )
});