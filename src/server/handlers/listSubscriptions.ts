import { api } from "../../protocol/client.js";
import { createToolHandler } from "../toolFactory.js";
import { ListSubscriptionsSchema } from "../schemas/listSubscriptions.schema.js";
import type { MCPToolDefinition } from "../types.js";

//listSubscriptions tool definition to retrieve all subscription plans available in the MetaCall account and their usage count.
export const listSubscriptionsTool: MCPToolDefinition = {
  name: "listSubscriptions",

  description:
  "Retrieves all subscription plans available in the MetaCall account and shows how many deployments are currently using each plan. Use this tool when you need to understand available plans or check current plan usage before deploying.",

  schema: ListSubscriptionsSchema,

  execute: createToolHandler(
    ListSubscriptionsSchema,

    async () => {
      const subscriptions = await api.listSubscriptions();

      return {
        totalPlans: Object.keys(subscriptions).length,
        plans: Object.entries(subscriptions).map(([id, count]) => ({
          id,
          usageCount: count
        }))
      };
    }
  )
};