import { z } from 'zod';

export const InspectByNameSchema = z.object({
  suffix: z.string()
});