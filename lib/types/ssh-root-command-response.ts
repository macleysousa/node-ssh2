export interface SSHRootCommandResponse {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
}