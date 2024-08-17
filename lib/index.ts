import { Config, NodeSSH, SSHExecCommandResponse, SSHExecOptions } from "node-ssh";
import { EventEmitter } from 'events';

import { ConnectSSHOptions } from "./types/connect";
import { SSHRootCommandOptions } from "./types/ssh-root-command-options";
import { SSHRootCommandResponse } from "./types/ssh-root-command-response";
import { SSHCommandOptions } from "./types/ssh-command-options";
import { Client } from "ssh2";


export class ClientSSH extends EventEmitter {
    private timeout: number = 1000 * 60 * 2;

    private dispatcher: NodeJS.Timeout | undefined;

    private connection: NodeSSH;

    public client: Client | null = null;

    constructor() {
        super();
        this.connection = new NodeSSH();
    }

    private onDispatcher(timeout: number) {
        if (this.dispatcher)
            clearTimeout(this.dispatcher);

        this.dispatcher = setTimeout(() => {
            this.dispose()
            this.emit('timeout');
        }, timeout);
    }

    async connect(options: ConnectSSHOptions): Promise<ClientSSH> {
        await this.connection.connect(options)

        this.client = this.connection?.connection;

        this.onDispatcher(options.timeout ?? this.timeout);

        this.emit('connect');
        return this;
    }

    async isConnected(): Promise<boolean> {
        return this.connection.isConnected() || false;
    }

    async getConfig(): Promise<Config> {
        const { config } = this.connection.connection as any
        return config;
    }

    async execCommand(command: string | string[], options?: SSHCommandOptions): Promise<SSHExecCommandResponse> {
        if (Array.isArray(command))
            command = command.join(' \n ');

        if (options?.timeout)
            this.onDispatcher(options.timeout);

        return this.connection.execCommand(command, options)
    }

    async execCommandRoot(command: string | string[], options?: SSHRootCommandOptions): Promise<SSHRootCommandResponse> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`;

        if (Array.isArray(command))
            command = command.join(' \n ');

        if (options?.timeout)
            this.onDispatcher(options.timeout);

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
        parameters?: string[],
        options?: SSHExecOptions): Promise<SSHExecCommandResponse | string> {
        if (Array.isArray(command))
            command = command.join(' \n ');

        return this.connection.exec(command, parameters ?? [], options as any);
    }

    async execRoot(
        command: string | string[],
        parameters?: string[],
        options?: SSHRootCommandOptions): Promise<void> {
        const config = await this.getConfig();
        const password: string = `${config?.password}`

        if (Array.isArray(command))
            command = command.join(' \n ');

        if (options?.timeout)
            this.onDispatcher(options.timeout);

        await this.connection.exec(command, parameters ?? [], {
            ...options,
            execOptions: options?.execOptions ?? { pty: true },
            stdin: `${password}\n`,
            onStdout: (chunk) => options?.onStdout?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
            onStderr: (chunk) => options?.onStderr?.(Buffer.from(chunk.toString('utf-8').replace(password, ''))),
        })

    }

    async dispose(): Promise<void> {
        this.emit('dispose');
        return this.connection.dispose();
    }

    on(eventName: 'connect' | 'dispose' | 'timeout' | 'error', listener: (...args: any[]) => void) {
        return super.on(eventName, listener);
    }
}