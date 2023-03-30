import { Prompt } from 'ssh2-streams';

export interface ConnectSSHOptions {
    host: string;
    username: string;
    password?: string;
    port?: number;
    privateKey?: string;
    passphrase?: string;
    tryKeyboard?: boolean;
    /** Timeout in milliseconds. Default: 1000 * 60 * 2 (2 minutes) */
    timeout?: number;
    onKeyboardInteractive?: (
        name: string,
        instructions: string,
        lang: string,
        prompts: Prompt[],
        finish: (responses: string[]) => void
    ) => void;
}