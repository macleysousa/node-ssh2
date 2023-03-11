export interface SSHExecRootCommandResponse {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
}