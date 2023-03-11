Node-SSH2 Extends Node-SSH
=========

#### Example
```js
const ssh = new ClientSSH();

await ssh.connect({
  host: 'localhost',
  username: 'ubuntu',
  password: '123'
})

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

#### Example:

```js
const password = '123'
ssh.connect({
  host: 'localhost',
  username: 'ubuntu',
  port: 22,
  password,
  tryKeyboard: true,
})
```

### License
This project is licensed under the terms of MIT license. See the LICENSE file for more info.

[node-ssh]:hhttps://github.com/steelbrain/node-ssh