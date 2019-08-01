/* eslint-disable no-undef */
var platform = require('os').platform;
var commandExists = require('../dist/linux-command-exists').commandExists;

describe('Test the commandExists function (Promise)', () => {
	if (platform() === 'linux') {
		it('The platform is linux so it should works', (done) => {
			commandExists('').then(() => {
				done();
			}).catch((e) => {
				done(e);
			});
		});
		it('Should know the command "ls"', (done) => {
			commandExists('ls').then((exists) => {
				if (exists === true) {
					done();
				} else {
					done(new Error('The command "ls" should exists'));
				}
			}).catch((e) => {
				done(e);
			});
		});
		it('Should not know the command "dcejvhiosvbfh"', (done) => {
			commandExists('dcejvhiosvbfh').then((exists) => {
				if (exists === false) {
					done();
				} else {
					done(new Error('The command dcejvhiosvbfh shouldn\'t exists'));
				}
			}).catch((e) => {
				done(e);
			});
		});
	} else {
		it('The platform is not linux so it should run into an error', (done) => {
			commandExists('').then(() => {
				done(new Error('The platform is detected as it is linux'));
			}).catch((e) => {
				if (e === Error('This module only runs on linux')) {
					done();
				} else {
					done(new Error(`Didn't expected this error to happend\nError:\n${e}`));
				}
			});
		});
	}

});

describe('Test the commandExists function (Callback)', () => {
	if (platform() === 'linux') {
		it('The platform is linux so it should works', (done) => {
			try {
				commandExists('', () => {
					done();
				});
			} catch (e) {
				done(e);
			}
		});
		it('Should know the command "ls"', (done) => {
			try {
				commandExists('ls', (exists) => {
					if (exists === true) {
						done();
					} else {
						done(new Error('The command "ls" should exists'));
					}
				});
			} catch (e) {
				done(e);
			}
		});
		it('Should not know the command "dcejvhiosvbfh"', (done) => {
			try {
				commandExists('dcejvhiosvbfh', (exists) => {
					if (exists === false) {
						done();
					} else {
						done(new Error('The command dcejvhiosvbfh shouldn\'t exists'));
					}
				});
			} catch (e) {
				done(e);
			}
		});
	} else {
		it('The platform is not linux so it should run into an error', (done) => {
			try {
				commandExists('', () => {
					done(new Error('The platform is detected as it is linux'));
				});
			} catch (e) {
				if (e === Error('This module only runs on linux')) {
					done();
				} else {
					done(new Error(`Didn't expected this error to happend\nError:\n${e}`));
				}
			}
		});
	}
});
