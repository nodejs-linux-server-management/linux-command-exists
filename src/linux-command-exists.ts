import { execute } from "linux-shell-command";

export function commandExists(command: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		execute('command -v \'!?!\'', [command]).then(({ shellCommand: shellCommand }) => {
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
						reject(Error(`process terminated with the exit code ${shellCommand.exitStatus}\nError:\n${shellCommand.stderr}`));
						break;
				}
			} else {
				reject(Error(`process killed by the signal: ${shellCommand.exitSignal}`));
			}
		}).catch((e) => {
			reject(e);
		});
	});
}
