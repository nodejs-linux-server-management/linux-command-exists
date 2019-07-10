"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var os_1 = require("os");
function commandExists(command) {
    return new Promise(function (resolve, reject) {
        if (os_1.platform() === 'linux') {
            var exists = child_process_1.spawn('command', ['-v', command], { shell: true });
            var stderr = "";
            exists.stderr.on('data', function (data) {
                stderr += data.toString();
            });
            exists.on('exit', function (code, signal) {
                if (signal === null) {
                    if (code === null || code === 0) {
                        resolve(true);
                    }
                    else if (code === 1) {
                        resolve(false);
                    }
                    else {
                        reject(Error("process terminated with the exit code " + code + "\nError:\n" + stderr));
                    }
                }
                else {
                    reject(Error("process killed by the signal: " + signal));
                }
            });
        }
        else {
            reject(Error("This module only runs on linux"));
        }
    });
}
exports.default = commandExists;
