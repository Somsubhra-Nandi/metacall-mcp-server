import { z } from "zod";

export const FileListSchema = z.object({
  url: z.string().url(),
  branch: z.string().min(1)
});