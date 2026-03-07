import axios from "axios";
import { api } from "../protocol/client.js";

export async function invokeDeploymentFunction(
  suffix: string,
  functionName: string,
  type: "call" | "await",
  args?: Record<string, any>
) {
  const deployment = await api.inspectByName(suffix);

  const prefix = deployment.prefix;
  const version = deployment.version;

  const url = `https://api.metacall.io/${prefix}/${suffix}/${version}/${type}/${functionName}`;

  try {
    const response = await axios.post(url, args ?? {}, {
      headers: {
        Authorization: `jwt ${process.env.METACALL_TOKEN}`
      }
    });

    return {
      deployment: suffix,
      function: functionName,
      invocationType: type,
      version,
      result: response.data
    };

  } catch (err: any) {
    throw new Error(
      `Failed to invoke "${functionName}" on "${suffix}": ${
        err.response?.status || ""
      } ${err.response?.data || err.message}`
    );
  }
}