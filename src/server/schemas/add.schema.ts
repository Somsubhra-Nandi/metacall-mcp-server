import { z } from "zod";

export const AddSchema = z.object({
  url: z.string().url(),
  branch: z.string().min(1),
  jsons: z.array(z.any()).optional()
});