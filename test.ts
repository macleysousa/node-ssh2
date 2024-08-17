import { ClientSSH } from "./lib";
import * as dotenv from 'dotenv';
import { ConnectSSHOptions } from "./lib/types/connect";

dotenv.config();

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;


async function name() {

    const connection: ConnectSSHOptions = {
        host: SSH_HOST as string ?? 'host',
        username: SSH_USERNAME as string ?? 'username',
        password: SSH_PASSWORD as string ?? 'password',
        timeout: 1000 * 5,
    }

    const ssh = await new ClientSSH().connect(connection)

    // const cmd = await ssh.execCommand(['echo "hello"', ' echo "word"'], {
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8')),
    // })

    // console.log('------------------', cmd);

    // await ssh.execRoot('dokku logs coral-api -n 2 -p web ', {
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8')),
    // })

    // ssh.execRoot('dokku logs coral-api -t -p web ', {
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8')),
    // })

    // await ssh.execRoot('ls -la', [], {
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8'))
    // })

    // Exemple using execCommand with pty
    ssh.execCommand('ping 8.8.8.8', {
        onStdout: (chunk) => console.log('stdout', new Date().toISOString(), chunk.toString('utf8')),
        onStderr: (chunk) => console.log('stderr', new Date().toISOString(), chunk.toString('utf8')),
        execOptions: { pty: true },
        timeout: 1000 * 10
    })

    // ssh.client?.on('close', () => {
    //     console.log('close')
    // })

    // Exemple using exec with pty
    // ssh.exec('dokku logs coral-api -t -p web', [], {
    //     onStdout: (chunk) => console.log(chunk.toString('utf8')),
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     execOptions: { pty: true }
    // })


    // await ssh.dispose()
}

name()