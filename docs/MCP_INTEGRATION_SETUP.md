# MCP Integration Guide

This guide explains how to connect to and use the installed MCP servers in your DigiSafe project.

## Quick Start

### Start All MCPs
```bash
npm run mcp:start-all
```

This starts:
- **Sequential Thinking MCP** on port 3001
- **Context7 MCP** on port 3002

### Run Dev Server with MCPs
```bash
npm run dev:mcp
```

This starts both the dev server (port 5005) and all MCP servers in parallel.

## Individual MCP Servers

### 1. Sequential Thinking MCP
**Purpose**: Structured reasoning for complex code decisions and architecture.

Start individually:
```bash
npm run mcp:sequential-thinking
```

**Usage in VS Code**:
- Open command palette: Cmd+Shift+P
- Search for "Sequential Thinking"
- Use it to break down complex tasks like:
  - Major refactors
  - Multi-file changes
  - Architecture decisions
  - Performance optimizations

**Example**: Before refactoring the authentication system, use Sequential Thinking to:
1. Define the problem scope
2. List all affected modules
3. Map dependencies
4. Plan migration strategy
5. Validate against test suite

### 2. Context7 MCP
**Purpose**: Real-time, up-to-date documentation for libraries and frameworks.

Start individually:
```bash
npm run mcp:context7
```

**Usage in VS Code**:
- Install VS Code extension or use via CLI
- Search for library/framework documentation
- Get current API examples and best practices

**Example**: When integrating a new Firebase feature:
1. Run Context7 MCP
2. Query: "firebase v10.8.0 cloud functions"
3. Get up-to-date examples and API docs
4. Copy snippets into your code
5. Reference in code comments

### 3. Serena MCP
**Purpose**: Language-aware code assistant for TypeScript/React compliance.

**Setup** (requires global Serena CLI):
```bash
sudo npm install -g serena
```

Start Serena server:
```bash
serena start-mcp-server --project /Users/herrnyembo/digi_safe --context ide-assistant
```

**Usage**:
- Symbol search and cross-references
- Module dependency analysis
- Code change impact detection
- Project standards validation

## Configuration Files

### `.mcp/config.json`
Central configuration for all MCP servers with:
- Server commands and ports
- Project paths and structure
- Coding standards (ESLint, Prettier, TypeScript)

### `.serena/project.yml`
Serena-specific project configuration:
- Language and framework info
- Feature flags
- Firebase project settings

## Available NPM Commands

```bash
# Start all MCPs
npm run mcp:start-all

# Check status of MCPs
npm run mcp:status

# Stop all MCPs
npm run mcp:stop-all

# Start individual MCPs
npm run mcp:sequential-thinking
npm run mcp:context7

# Start dev server with MCPs
npm run dev:mcp
```

## Workflow Integration

### Before Starting Work
1. Start MCPs: `npm run mcp:start-all`
2. Start dev server: `npm run dev` (in another terminal)
3. Check MCP status: `npm run mcp:status`

### During Development
- **For complex logic**: Use Sequential Thinking MCP
  - Frame the problem
  - Work through trade-offs
  - Validate implementation
- **For API integration**: Use Context7 MCP
  - Query library docs
  - Copy verified examples
  - Reduce outdated patterns

### Code Review Checklist
- [ ] Sequential Thinking used for complex changes
- [ ] Context7 consulted for new dependencies
- [ ] Serena validated code quality
- [ ] `npm run lint:all` passes locally
- [ ] No TypeScript errors

## Troubleshooting

### MCP Server Won't Start
```bash
# Check if ports are in use
lsof -i :3001
lsof -i :3002

# Kill process on port (if needed)
kill -9 <PID>

# Try starting again
npm run mcp:start-all
```

### Serena CLI Not Found
```bash
# Install with sudo
sudo npm install -g serena

# Verify installation
serena --version
```

### Connection Issues
- Verify node_modules: `npm ls @modelcontextprotocol/server-sequential-thinking`
- Clear npm cache: `npm cache clean --force`
- Reinstall packages: `npm install`

## Architecture

```
DigiSafe Project
├── .mcp/
│   ├── config.json          (MCP server configuration)
│   └── orchestration/       (MCP integration scripts)
├── .serena/
│   └── project.yml          (Serena project config)
├── src/
│   ├── lib/
│   │   └── mcp-orchestrator.ts  (MCP orchestration module)
│   └── ...
└── package.json             (MCP npm scripts)
```

## Next Steps

1. **Start MCPs**: `npm run mcp:start-all`
2. **Verify Status**: `npm run mcp:status`
3. **Use in VS Code**: Open command palette and search for Sequential Thinking / Context7
4. **Read MCP_CLEAN_CODE_GUIDE.md** for detailed workflows

For more info, see `docs/MCP_CLEAN_CODE_GUIDE.md`.
