# MetaCall MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server implemented in TypeScript on top of the `metacall/protocol` API. It exposes the complete MetaCall FaaS surface as MCP tools.

---

## Architecture

```
┌────────────────────────────┐
│         MCP Client         │
│ (CLI / IDE / Local LLM)    │
└─────────────┬──────────────┘
              │ (JSON-RPC over stdio)
              ▼
┌────────────────────────────┐
│      MCP Server (TS)       │
│  - Tool Router             │
│  - Zod Validation          │
│  - Tool Handlers           │
│  - Error Boundary          │
└─────────────┬──────────────┘
              │ (Function Calls)
              ▼
┌────────────────────────────┐
│      Protocol Client       │
│  (metacall/protocol API)   │
└─────────────┬──────────────┘
              │ (Axios REST)
              ▼
┌────────────────────────────┐
│        MetaCall FaaS       │
│  (Deploy + Runtime Layer)  │
└────────────────────────────┘
```

---

## Exposed Tools

### System

| Tool | Description |
|------|-------------|
| `refresh` | Refresh the MetaCall JWT authentication token |
| `ready` | Check if the server is ready |
| `validate` | Validate the current auth token |
| `deployEnabled` | Check if deployments are enabled |

### Subscriptions

| Tool | Description |
|------|-------------|
| `listSubscriptions` | List all active subscriptions |
| `listSubscriptionsDeploys` | List deployments for subscriptions |

### Deployment

| Tool | Description |
|------|-------------|
| `inspect` | Inspect all deployments |
| `inspectByName` | Inspect a deployment by name |
| `upload` | Upload a zip package/blob into the FaaS |
| `add` | Add a new deployment |
| `deploy` | Trigger a deployment |
| `deployDelete` | Delete a deployment |
| `logs` | Retrieve deployment logs |

### Repository

| Tool | Description |
|------|-------------|
| `branchList` | List branches in the repository |
| `fileList` | List files in the repository |

### Invocation

| Tool | Description |
|------|-------------|
| `invoke` | Invoke a deployed function |
| `call` | Call a function directly |
| `await` | Await an async function result |

---

## Design Principles

- **1:1 abstraction** over the protocol API
- **Async-safe** Promise-based handlers
- **Structured error boundary** for consistent error handling
- **Retry support** via `waitFor`
- **Zod-based input validation** for all tool inputs
- **Clean separation of concerns** across layers