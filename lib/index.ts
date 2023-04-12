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
        setTimeout(() => {
            this.dispose()
            console.info('ClientSSH ===>', 'Connection timeout');
        }, options.timeout ?? 1000 * 60 * 2);
        return this;
    }

    async isConnected(): Promise<boolean> {
        return this.connection.isConnected() || false;
    }

    async getConfig(): Promise<Config> {
        const { config } = this.connection.connection as any
        return config;
    }

    async execCommand(command: string | string[], options?: SSHExecCommandOptions): Promise<SSHExecCommandResponse> {
        if (Array.isArray(command))
            command = command.join(' \n ');

        return this.connection.execCommand(command, options)
    }

    async execCommandRoot(command: string | string[], options?: SSHExecRootCommandOptions): Promise<SSHExecRootCommandResponse> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`;
        if (Array.isArray(command))
            command = command.join(' \n ');

        const { code, signal, stderr, stdout } = await this.connection.execCommand(command, {
            execOptions: { pty: true },
            stdin: `${password}\n`,
            cwd: options?.cwd,
            encoding: options?.encoding,
            onStdout: (chunk) => options?.onStdout?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
            onStderr: (chunk) => options?.onStderr?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
        });
        return { code, signal, stdout: stdout.replace(password, ''), stderr: stderr.replace(password, '') };
    }

    async exec(
        command: string | string[],
        parameters: string[],
        options?: SSHExecOptions): Promise<SSHExecCommandResponse | string> {
        if (Array.isArray(command))
            command = command.join(' \n ');

        return this.connection.exec(command, parameters ?? [], options as any);
    }

    async execRoot(
        command: string | string[],
        options?: SSHExecRootCommandOptions,
        parameters?: string[]): Promise<void> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`

        if (Array.isArray(command))
            command = command.join(' \n ');

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