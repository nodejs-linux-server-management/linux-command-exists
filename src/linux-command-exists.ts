import { spawn } from "child_process";
import { platform } from "os";

export function commandExists(command: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		if(platform() === 'linux'){
			let exists = spawn('command', ['-v', command], { shell: true });
			var stderr: string = "";
			exists.stderr.on('data', (data) => {
				stderr += data.toString();
			});
			exists.on('exit', (code, signal) => {
				if (signal === null) {
					if (code === null || code === 0) {
						resolve(true);
					} else if (code === 1) {
						resolve(false);
					} else {
						reject(Error(`process terminated with the exit code ${code}\nError:\n${stderr}`));
					}
				} else {
					reject(Error(`process killed by the signal: ${signal}`));
				}
			});
		}else{
			reject(Error(`This module only runs on linux`));
		}
	});
}
