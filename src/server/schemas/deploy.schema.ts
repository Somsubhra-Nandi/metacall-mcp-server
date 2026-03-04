import { z } from "zod";
import { ResourceType } from "@metacall/protocol";

export const DeploySchema = z.object({
  name: z.string(),

  env: z
    .array(
      z.object({
        name: z.string(),
        value: z.string()
      })
    )
    .default([]),

  plan: z.string(),

  resourceType: z.nativeEnum(ResourceType),

  release: z.string(),

  version: z.string()
});