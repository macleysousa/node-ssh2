/// <reference types="node" />
import { Config, SSHExecCommandOptions, SSHExecCommandResponse, SSHExecOptions } from "node-ssh";
import { EventEmitter } from 'events';
import { ConnectSSHOptions } from "./types/connect";
import { SSHExecRootCommandOptions } from "./types/ssh-exec-root-command-options";
import { SSHExecRootCommandResponse } from "./types/ssh-exec-root-command-response";
export declare class ClientSSH extends EventEmitter {
    private connection;
    constructor();
    connect(options: ConnectSSHOptions): Promise<ClientSSH>;
    isConnected(): Promise<boolean>;
    getConfig(): Promise<Config>;
    execCommand(command: string | string[], options?: SSHExecCommandOptions): Promise<SSHExecCommandResponse>;
    execCommandRoot(command: string | string[], options?: SSHExecRootCommandOptions): Promise<SSHExecRootCommandResponse>;
    exec(command: string | string[], parameters: string[], options?: SSHExecOptions): Promise<SSHExecCommandResponse | string>;
    execRoot(command: string | string[], options?: SSHExecRootCommandOptions, parameters?: string[]): Promise<void>;
    dispose(): Promise<void>;
    on(eventName: 'connect' | 'dispose' | 'timeout' | 'error', listener: (...args: any[]) => void): this;
}
