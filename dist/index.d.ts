import { Config, SSHExecCommandResponse, SSHExecOptions } from "node-ssh";
import { EventEmitter } from 'events';
import { ConnectSSHOptions } from "./types/connect";
import { SSHRootCommandOptions } from "./types/ssh-root-command-options";
import { SSHRootCommandResponse } from "./types/ssh-root-command-response";
import { SSHCommandOptions } from "./types/ssh-command-options";
import { Client } from "ssh2";
export declare class ClientSSH extends EventEmitter {
    private timeout;
    private dispatcher;
    private connection;
    client: Client | null;
    constructor();
    private onDispatcher;
    connect(options: ConnectSSHOptions): Promise<ClientSSH>;
    isConnected(): Promise<boolean>;
    getConfig(): Promise<Config>;
    execCommand(command: string | string[], options?: SSHCommandOptions): Promise<SSHExecCommandResponse>;
    execCommandRoot(command: string | string[], options?: SSHRootCommandOptions): Promise<SSHRootCommandResponse>;
    exec(command: string | string[], parameters?: string[], options?: SSHExecOptions): Promise<SSHExecCommandResponse | string>;
    execRoot(command: string | string[], parameters?: string[], options?: SSHRootCommandOptions): Promise<void>;
    dispose(): Promise<void>;
    on(eventName: 'connect' | 'dispose' | 'timeout' | 'error', listener: (...args: any[]) => void): this;
}
