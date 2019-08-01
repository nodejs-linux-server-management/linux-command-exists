# linux-command-exists

Check if a command exists

## Examples

```javascript
var commandExists = require('linux-command-exists').commandExists;

//With Promise
commandExists('ls').then((exists) => {
    if (exists === true) {
        console.log('The command ls exists');
    } else {
        console.log('The command "ls" doesn\'t exists');
    }
}).catch((e) => {
    console.error(`An error happened:\n${e.message}`);
});

//With Callback
try {
    commandExists('ls', (exists) => {
        if (exists === true) {
            console.log('The command "ls" exists');
        } else {
            console.log('The command "ls" doesn\'t exists');
        }
    });
} catch (e) {
    console.error(`An error happened:\n${e.message}`);
}
```
