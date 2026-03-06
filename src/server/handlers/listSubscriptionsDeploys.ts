import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { ListSubscriptionsDeploysSchema } from "../schemas/listSubscriptionsDeploys.schema.js";
import type { MCPToolDefinition } from "../types.js";

//definition of the "listSubscriptionsDeploys" tool.It lists deployments associated with billing subscriptions in MetaCall FaaS.
export const listSubscriptionsDeploysTool: MCPToolDefinition = {
  name: "listSubscriptionsDeploys",
  description: "List deployments associated with billing subscriptions.",
  schema: ListSubscriptionsDeploysSchema,

  execute: createToolHandler(
    ListSubscriptionsDeploysSchema,
    async () => {
      const deployments = await api.listSubscriptionsDeploys();
      return {
        count: deployments.length,
        deployments
      };
    }
  )
};