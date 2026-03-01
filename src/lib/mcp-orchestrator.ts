/**
 * MCP Orchestration Module
 * Connects to installed MCP servers for code analysis, documentation, and reasoning
 */

import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface MCPServer {
  name: string;
  command: string;
  args: string[];
  port: number;
  process?: ChildProcess;
  enabled: boolean;
}

interface MCPConfig {
  mcpServers: Record<string, any>;
  projectConfig: any;
}

export class MCPOrchestrator {
  private servers: Map<string, MCPServer> = new Map();
  private config!: MCPConfig;
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.loadConfig();
  }

  private loadConfig(): void {
    const configPath = path.join(this.projectRoot, '.mcp', 'config.json');
    if (!fs.existsSync(configPath)) {
      throw new Error(`MCP config not found at ${configPath}`);
    }
    this.config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.initializeServers();
  }

  private initializeServers(): void {
    for (const [name, serverConfig] of Object.entries(this.config.mcpServers)) {
      if (serverConfig.enabled) {
        const server: MCPServer = {
          name,
          command: serverConfig.command,
          args: serverConfig.args,
          port: serverConfig.port,
          enabled: serverConfig.enabled,
        };
        this.servers.set(name, server);
      }
    }
  }

  async startServer(name: string): Promise<boolean> {
    const server = this.servers.get(name);
    if (!server) {
      console.error(`MCP server '${name}' not found in configuration`);
      return false;
    }

    try {
      console.log(`Starting MCP server: ${name}...`);
      const process = spawn(server.command, server.args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false,
      });

      process.stdout?.on('data', (data) => {
        console.log(`[${name}] ${data.toString().trim()}`);
      });

      process.stderr?.on('data', (data) => {
        console.error(`[${name}] ERROR: ${data.toString().trim()}`);
      });

      server.process = process;
      console.log(`✓ MCP server '${name}' started on port ${server.port}`);
      return true;
    } catch (error) {
      console.error(`Failed to start MCP server '${name}':`, error);
      return false;
    }
  }

  async startAll(): Promise<number> {
    let started = 0;
    for (const [name] of this.servers) {
      const success = await this.startServer(name);
      if (success) started++;
    }
    return started;
  }

  stopServer(name: string): boolean {
    const server = this.servers.get(name);
    if (!server || !server.process) {
      return false;
    }

    try {
      server.process.kill();
      console.log(`✓ MCP server '${name}' stopped`);
      return true;
    } catch (error) {
      console.error(`Failed to stop MCP server '${name}':`, error);
      return false;
    }
  }

  stopAll(): void {
    for (const [name] of this.servers) {
      this.stopServer(name);
    }
  }

  getServerStatus(): Record<string, { port: number; running: boolean }> {
    const status: Record<string, { port: number; running: boolean }> = {};
    for (const [name, server] of this.servers) {
      status[name] = {
        port: server.port,
        running: server.process?.exitCode === null,
      };
    }
    return status;
  }

  getProjectConfig(): any {
    return this.config.projectConfig;
  }

  getServerUrl(name: string): string {
    const server = this.servers.get(name);
    if (!server) return '';
    return `http://localhost:${server.port}`;
  }
}

// CLI entry point
if (require.main === module) {
  const orchestrator = new MCPOrchestrator();
  const command = process.argv[2];

  if (command === 'start-all') {
    orchestrator.startAll().then((count) => {
      console.log(`\nStarted ${count} MCP server(s)`);
      console.log('Press Ctrl+C to stop all servers');
      // Keep process alive
      setInterval(() => {}, 1000);
    });
  } else if (command === 'status') {
    console.log('MCP Server Status:');
    console.log(JSON.stringify(orchestrator.getServerStatus(), null, 2));
  } else if (command === 'stop-all') {
    orchestrator.stopAll();
  } else {
    console.log('Usage: node mcp-orchestrator.ts [start-all|status|stop-all]');
  }
}

export default MCPOrchestrator;
