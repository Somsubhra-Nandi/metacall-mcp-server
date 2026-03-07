import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { InvokeSchema } from "../schemas/invoke.schema.js";
import type { MCPToolDefinition } from "../types.js";
import axios from "axios";

export const invokeTool: MCPToolDefinition = {
  name: "invoke",

  description:
    "Invoke a function from a deployed MetaCall service. Use type='call' for synchronous functions and type='await' for async functions. Arguments must match function parameter names.",

  schema: InvokeSchema,

  execute: createToolHandler(
    InvokeSchema,
    async ({ suffix, function: fn, type, args }) => {

      const deployment = await api.inspectByName(suffix);

      const prefix = deployment.prefix;
      const version = deployment.version;

      const url = `https://api.metacall.io/${prefix}/${suffix}/${version}/${type}/${fn}`;

      let result;

      try {
        const response = await axios.post(url, args ?? {}, {
          headers: {
            Authorization: `jwt ${process.env.METACALL_TOKEN}`
          }
        });

        result = response.data;

      } catch (err: any) {
        throw new Error(
          `Failed to invoke function "${fn}" on deployment "${suffix}": ${err.response?.status || ""} ${err.response?.data || err.message}`
        );
      }

      return {
        deployment: suffix,
        function: fn,
        invocationType: type,
        version,
        result
      };
    }
  )
};