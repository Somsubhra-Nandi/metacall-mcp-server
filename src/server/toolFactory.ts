import { ZodSchema } from "zod";
import { safeExecute } from "../utils/errorBoundary.js";

// Factory function to create a tool handler that validates input using a Zod schema and executes the provided logic.
export function createToolHandler<T>(
  schema: ZodSchema<T>,
  executor: (args: T) => Promise<any>
) {
  return async (rawArgs: unknown) => {
    const args = schema.parse(rawArgs);
    return safeExecute(() => executor(args));
  };
}