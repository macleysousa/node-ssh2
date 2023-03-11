import { Config, NodeSSH, SSHExecCommandOptions, SSHExecCommandResponse, SSHExecOptions } from "node-ssh";

import { ConnectSSHOptions } from "./types/connect";
import { SSHExecRootCommandOptions } from "./types/ssh-exec-root-command-options";

export class ClientSSH {
    private connection: NodeSSH;

    constructor() {
        this.connection = new NodeSSH();
    }

    async connect(options: ConnectSSHOptions): Promise<ClientSSH> {
        await this.connection.connect(options)
        return this;
    }

    async isConnected(): Promise<boolean> {
        return this.connection.isConnected() || false;
    }

    async getConfig(): Promise<Config> {
        const { config } = this.connection.connection as any
        return config;
    }

    async execCommand(command: string, options?: SSHExecCommandOptions): Promise<SSHExecCommandResponse> {
        return this.connection.execCommand(command, options);
    }

    async execCommandRoot(command: string, options?: SSHExecRootCommandOptions): Promise<SSHExecCommandResponse> {
        const config = await this.getConfig();
        return this.connection.execCommand(command, { execOptions: { pty: true }, stdin: `${config.password}\n`, ...options })
    }

    async exec(
        command: string,
        parameters: string[],
        options?: SSHExecOptions): Promise<SSHExecCommandResponse | string> {
        return this.connection.exec(command, parameters ?? [], options as any);
    }

    async execRoot(
        command: string,
        options?: SSHExecRootCommandOptions,
        parameters?: string[]): Promise<SSHExecCommandResponse | string> {
        const config = await this.getConfig();
        return this.connection.exec(command, parameters ?? [], { execOptions: { pty: true }, stdin: `${config.password}\n`, ...options })
    }

    async dispose(): Promise<void> {
        return this.connection.dispose();
    }
}