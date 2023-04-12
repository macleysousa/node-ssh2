import { ClientSSH } from "./lib";
import * as dotenv from 'dotenv';

dotenv.config();

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;


async function name() {

    const connection = {
        host: SSH_HOST as string ?? 'host',
        username: SSH_USERNAME as string ?? 'username',
        password: SSH_PASSWORD as string ?? 'password',
    }
    const ssh = await new ClientSSH().connect(connection)

    const cmd = await ssh.execCommand(['echo "hello"', ' echo "word"'], {
        onStdout: (chunk) => console.log(chunk.toString('utf8')),
    })

    console.log('------------------', cmd);

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

    await ssh.dispose()
}

name()