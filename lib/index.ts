import { Config, NodeSSH, SSHExecCommandOptions, SSHExecCommandResponse, SSHExecOptions } from "node-ssh";

import { ConnectSSHOptions } from "./types/connect";
import { SSHExecRootCommandOptions } from "./types/ssh-exec-root-command-options";
import { SSHExecRootCommandResponse } from "./types/ssh-exec-root-command-response";

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

    async execCommandRoot(command: string, options?: SSHExecRootCommandOptions): Promise<SSHExecRootCommandResponse> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`
        const { code, signal, stderr, stdout } = await this.connection.execCommand(command, {
            execOptions: { pty: true },
            stdin: `${password}\n`,
            cwd: options?.cwd,
            encoding: options?.encoding,
            onStdout: (chunk) => options?.onStdout?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
            onStderr: (chunk) => options?.onStderr?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
        })
        return { code, signal, stdout: stdout.replace(password, ''), stderr: stderr.replace(password, '') };
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
        parameters?: string[]): Promise<void> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`
        await this.connection.exec(command, parameters ?? [], {
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