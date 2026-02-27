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

## Installation & Setup

### Prerequisites
- **Node.js**: v18 or higher.
- **MetaCall Token**: You need an active authentication token. You can get this by logging into [dashboard.metacall.io](https://dashboard.metacall.io).

---

### 1. Build the Server

First, clone this repository to your local machine, install the dependencies, and compile the TypeScript code:

```bash
git clone https://github.com/Somsubhra-Nandi/metacall-mcp-server.git
cd metacall-mcp-server
npm install
npm run build
```

> **Note:** Get the absolute path of your `metacall-mcp-server/dist/index.js` file as we will need it for the client configuration.

---

### 2. Client Configuration

The Model Context Protocol (MCP) allows us to use this server across various AI clients. Below are the setup instructions for **Claude Desktop** and **Google Antigravity**.

---

#### Option A: Claude Desktop

1. Open your Claude Desktop configuration file based on your operating system:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the MetaCall server to your `mcpServers` object. Replace the `args` path with the actual absolute path to `dist/index.js`, and insert your MetaCall token:

```json
{
  "mcpServers": {
    "metacall-faas": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/metacall-mcp-server/dist/index.js"
      ],
      "env": {
        "METACALL_TOKEN": "your_jwt_token_here",
        "METACALL_BASE_URL": "https://dashboard.metacall.io"
      }
    }
  }
}
```

> **Windows Users:** Remember to use double backslashes. e.g., `C:\\Users\\Name\\metacall-mcp-server\\dist\\index.js`

3. Restart Claude Desktop.

---

#### Option B: Google Antigravity

1. Open your Antigravity configuration file based on your operating system:
   - **macOS / Linux:** `~/.gemini/antigravity/mcp_config.json`
   - **Windows:** `%USERPROFILE%\.gemini\antigravity\mcp_config.json`

2. Add the exact same JSON configuration block used for Claude Desktop (above) into your `mcp_config.json` file:

```json
{
  "mcpServers": {
    "metacall-faas": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/metacall-mcp-server/dist/index.js"
      ],
      "env": {
        "METACALL_TOKEN": "your_jwt_token_here",
        "METACALL_BASE_URL": "https://dashboard.metacall.io"
      }
    }
  }
}
```

3. In the Antigravity UI, navigate to the **Agent Manager** panel, click **Manage MCP Servers**, and hit **Refresh**. The server will be connected.