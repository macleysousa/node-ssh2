export interface SSHExecRootCommandOptions {
    cwd?: string;
    encoding?: BufferEncoding;
    onStdout?: (chunk: Buffer) => void;
    onStderr?: (chunk: Buffer) => void;
}