# Check if a command exists

## Examples

```javascript
var commandExists = require('linux-command-exists').default;
commandExists('ls').then(exists=>{
    if(exists === true){
        console.log("the command ls exists");
    }else{
        console.log("the command ls doesn't exists");
    }
}).catch((e)=>{
    console.error("An error happened:\n" + e.message);
});
```
