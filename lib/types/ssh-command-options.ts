import { SSHExecCommandOptions } from "node-ssh";

export interface SSHCommandOptions extends SSHExecCommandOptions {
    timeout?: number;
}