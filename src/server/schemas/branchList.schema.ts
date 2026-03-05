import { z } from "zod";

export const BranchListSchema = z.object({
  url: z.string().url()
});