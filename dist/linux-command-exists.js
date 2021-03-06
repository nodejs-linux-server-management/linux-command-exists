"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linux_shell_command_1 = require("linux-shell-command");
function commandExists(command, callback) {
    var result = new Promise(function (resolve, reject) {
        linux_shell_command_1.execute('command -v \'!?!\'', [command]).then(function (_a) {
            var shellCommand = _a.shellCommand;
            if (shellCommand.exitSignal === null) {
                switch (shellCommand.exitStatus) {
                    case null:
                    case 0:
                        resolve(true);
                        break;
                    case 1:
                        resolve(false);
                        break;
                    default:
                        reject(Error("process terminated with the exit code " + shellCommand.exitStatus + "\nError:\n" + shellCommand.stderr));
                        break;
                }
            }
            else {
                reject(Error("process killed by the signal: " + shellCommand.exitSignal));
            }
        }).catch(function (e) {
            reject(e);
        });
    });
    if (typeof callback === "undefined") {
        return result;
    }
    else {
        result.then(function (r) {
            callback(null, r);
        }).catch(function (e) {
            //@ts-ignore
            callback(e, undefined);
        });
    }
}
exports.commandExists = commandExists;
