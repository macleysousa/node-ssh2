import { ClientSSH } from "./lib";
import * as dotenv from 'dotenv';

dotenv.config();

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;

const ssh = new ClientSSH();

async function name() {
    await ssh.connect({
        host: SSH_HOST ?? 'host',
        username: SSH_USERNAME ?? 'username',
        password: SSH_PASSWORD ?? 'password'
    })

    await ssh.execRootCommand(`
    ls -la
    `, {
        onStderr: (chunk) => console.log(chunk.toString('utf8')),
        onStdout: (chunk) => console.log(chunk.toString('utf8'))
    })
    await ssh.dispose()
}

name()