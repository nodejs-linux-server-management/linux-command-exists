import { execute } from "linux-shell-command";

export function commandExists(command: string): Promise<boolean>;
export function commandExists(command: string, callback: (error: Error | null, result: boolean) => void): void
export function commandExists(command: string, callback?: (error: Error | null, result: boolean) => void): Promise<boolean> | void {
	var result: Promise<boolean> = new Promise((resolve, reject) => {
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

	if (typeof callback === "undefined") {
		return result;
	} else {
		result.then((r) => {
			callback(null, r);
		}).catch((e) => {
			//@ts-ignore
			callback(e, undefined);
		});
	}
}
