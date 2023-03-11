import { Prompt } from 'ssh2-streams';

export interface ConnectSSHOptions {
    host: string;
    username: string;
    password?: string;
    port?: number;
    tryKeyboard?: boolean;
    onKeyboardInteractive?: (
        name: string,
        instructions: string,
        lang: string,
        prompts: Prompt[],
        finish: (responses: string[]) => void
    ) => void;
}