import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { CallSchema } from "../schemas/call.schema.js";
import type { MCPToolDefinition } from "../types.js";
import axios from "axios";

//Definition of the call tool.
export const callTool: MCPToolDefinition = {
  name: "call",
  description:
    "Invoke a synchronous function from a deployed MetaCall service. Arguments must be provided as an object where keys match the function parameter names (e.g., add(a,b) → {\"a\":1,\"b\":2}). If required arguments are missing, ask the user for them before calling the tool.",
  schema: CallSchema,

  execute: createToolHandler(
    CallSchema,
    async ({ suffix, function: fn, args }) => {

        const deployment = await api.inspectByName(suffix);

        const prefix = deployment.prefix;
        const version = deployment.version;

        const url = `https://api.metacall.io/${prefix}/${suffix}/${version}/call/${fn}`;
        const response = await axios.post(url, args ?? {}, {
          headers: {
          Authorization: `jwt ${process.env.METACALL_TOKEN}`
          }
        });
        
        const result = response.data;
        return {
            deployment: suffix,
            function: fn,
            version,
            result
        };
    }
    )
};