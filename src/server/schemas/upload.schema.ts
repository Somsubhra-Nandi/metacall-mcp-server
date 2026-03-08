import { z } from "zod";

export const UploadSchema = z
  .object({
    name: z.string().min(1),

    zipPath: z.string().optional().describe("Absolute filesystem path to a zip file accessible by the MCP server. Example: /home/user/app.zip"),
    zipBase64: z.string().optional(),

    jsons: z.array(z.any()).optional(),
    runners: z.array(z.string()).optional()
  })
  .refine(
    (data) => data.zipPath || data.zipBase64,
    {
      message: "Provide either zipPath or zipBase64"
    }
  );