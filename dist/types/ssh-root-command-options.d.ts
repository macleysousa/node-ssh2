import { SSHCommandOptions } from "./ssh-command-options";
export interface SSHRootCommandOptions extends Omit<SSHCommandOptions, 'stdin'> {
}
