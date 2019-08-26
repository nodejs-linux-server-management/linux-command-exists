"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linux_shell_command_1 = require("linux-shell-command");
function commandExists(command, callback) {
    if (callback === undefined) {
        return new Promise(function (resolve, reject) {
            try {
                commandExists(command, function (exists) {
                    resolve(exists);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    linux_shell_command_1.execute('command -v \'!?!\'', [command], undefined, function (shellCommand) {
        if (shellCommand.exitSignal === null) {
            switch (shellCommand.exitStatus) {
                case null:
                case 0:
                    callback(true);
                    break;
                case 1:
                    callback(false);
                    break;
                default:
                    throw Error("process terminated with the exit code " + shellCommand.exitStatus + "\nError:\n" + shellCommand.stderr);
                    break;
            }
        }
        else {
            throw Error("process killed by the signal: " + shellCommand.exitSignal);
        }
    });
}
exports.commandExists = commandExists;
