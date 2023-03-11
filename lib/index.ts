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
        const password: string = `${config?.password}`
        return this.connection.execCommand(command, {
            execOptions: { pty: true },
            stdin: `${password}\n`,
            cwd: options?.cwd,
            encoding: options?.encoding,
            onStdout: (chunk) => options?.onStdout?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
            onStderr: (chunk) => options?.onStderr?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
        }).then((response) => {
            response.stdout = response.stdout.replace(password, '');
            response.stderr = response.stderr.replace(password, '');
            return response;
        })
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
        const password: string = `${config?.password}`
        return this.connection.exec(command, parameters ?? [], {
            execOptions: { pty: true },
            stdin: `${password}\n`,
            cwd: options?.cwd,
            encoding: options?.encoding,
            onStdout: (chunk) => options?.onStdout?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
            onStderr: (chunk) => options?.onStderr?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
        })
    }

    async dispose(): Promise<void> {
        return this.connection.dispose();
    }
}