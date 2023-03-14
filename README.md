Node-SSH2 Extends Node-SSH
=========

## Installing

```shell
npm i nodejs-ssh2
```

or

```shell
yarn add nodejs-ssh2
```

#### Example
```js
import { ClientSSH } from 'nodejs-ssh2';

const ssh = new ClientSSH();

await ssh.connect({
  host: 'localhost',
  username: 'ubuntu',
  password: '123'
});

await ssh.execCommand(`
    ls -la
    `, {
        onStderr: (chunk) => console.log(chunk.toString('utf8')),
        onStdout: (chunk) => console.log(chunk.toString('utf8'))
    });

await ssh.dispose();

```


### Keyboard-interactive user authentication

In some cases you have to enable keyboard-interactive user authentication.
Otherwise you will get an `All configured authentication methods failed` error.

### Ubuntu server 22.04 LTS


Open file 
```
sudo nano /etc/ssh/sshd_config
```

Add the line below
``` 
PubkeyAcceptedKeyTypes=+ssh-rsa
``` 

Restart the service sshd
``` 
sudo systemctl restart sshd.service
``` 

#### Example:

```js
import { ClientSSH } from 'nodejs-ssh2';

const ssh = new ClientSSH();

await ssh.connect({
        host: SSH_HOST ?? 'host',
        username: SSH_USERNAME ?? 'username',
        tryKeyboard: true,
        privateKey: `-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
`
    });

await ssh.dispose();
```

### License
This project is licensed under the terms of MIT license. See the LICENSE file for more info.

[node-ssh]:hhttps://github.com/steelbrain/node-ssh
