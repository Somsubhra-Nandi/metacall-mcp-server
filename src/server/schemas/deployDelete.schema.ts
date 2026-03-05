import { z } from "zod";

export const DeployDeleteSchema = z.object({
  suffix: z.string().min(1, "Deployment suffix is required"),
  version: z.string().default("v1")
});