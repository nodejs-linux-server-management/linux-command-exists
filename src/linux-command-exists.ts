import { execute } from "linux-shell-command";

export function commandExists(command: string): Promise<boolean>;
export function commandExists(command: string, callback: (exists: boolean) => void): void
export function commandExists(command: string, callback?: (exists: boolean) => void): Promise<boolean> | void {
	if (callback === undefined) {
		return new Promise<boolean>((resolve, reject) => {
			try {
				commandExists(command, (exists) => {
					resolve(exists);
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	execute('command -v \'!?!\'', [command], undefined, (shellCommand) => {
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
					throw Error(`process terminated with the exit code ${shellCommand.exitStatus}\nError:\n${shellCommand.stderr}`);
					break;
			}
		} else {
			throw Error(`process killed by the signal: ${shellCommand.exitSignal}`);
		}
	});
}
