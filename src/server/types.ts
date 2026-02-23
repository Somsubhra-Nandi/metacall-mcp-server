import { ZodSchema } from "zod";

// Definition of the MCPToolDefinition interface, which describes the structure of a tool that can be registered with the MetaCall MCP server.
export interface MCPToolDefinition {
  name: string;
  description: string;
  schema: ZodSchema<any>;
  execute: (args: unknown) => Promise<any>;
}