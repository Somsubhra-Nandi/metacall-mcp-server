import { z } from "zod";

export const UploadSchema = z.object({
  name: z.string().min(1),
  zipPath: z.string().min(1),
  jsons: z.array(z.any()).optional(),
  runners: z.array(z.string()).optional()
});