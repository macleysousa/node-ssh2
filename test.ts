import { ClientSSH } from "./lib";
import * as dotenv from 'dotenv';

dotenv.config();

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;


async function name() {

    const connection = {
        host: SSH_HOST as string ?? 'host',
        username: SSH_USERNAME as string ?? 'username',
        password: SSH_PASSWORD as string ?? 'password',
        timeout: 5000,
    }
    const ssh = await new ClientSSH().connect(connection)

    ssh.execCommandRoot('dokku logs hermes-api -n 999', {
        onStdout: (chunk) => console.log(chunk.toString('utf8')),
    })

    console.log('------------------', ssh.isConnected());

    // await ssh.execRoot('dokku logs coral-api -n 2 -p web ', {
    //     // onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8')),
    // })

    // await ssh.execRoot(`
    // ls -la
    // `, {
    //     onStderr: (chunk) => console.log(chunk.toString('utf8')),
    //     onStdout: (chunk) => console.log(chunk.toString('utf8'))
    // })

    // await ssh.dispose()
}

name()