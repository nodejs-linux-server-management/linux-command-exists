/* eslint-disable no-undef */
var platform = require('os').platform;
var commandExists = require('../dist/linux-command-exists').commandExists;

describe('#commandExists (Promise)', () => {
	if (platform() === 'linux') {
		it('#The platform is linux so it should works', (done) => {
			commandExists('').then(() => {
				done();
			}).catch((e) => {
				done(new Error(`Didn't expected an error to happend\nError:\n${e}`));
			});
		});
		it('#Should know the command "ls"', (done) => {
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
		it('#Should not know the command "dcejvhiosvbfh"', (done) => {
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
		it('#The platform is not linux so it should run into an error', (done) => {
			commandExists('').then(() => {
				done(new Error('The platform is detected as it is linux'));
			}).catch((e) => {
				if (e.message === 'This module only runs on linux') {
					done();
				} else {
					done(new Error(`Didn't expected this error to happend\nError:\n${e}`));
				}
			});
		});
	}

});

describe('#commandExists (Callback)', () => {
	if (platform() === 'linux') {
		it('#The platform is linux so it should works', (done) => {
			commandExists('', (error) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${error}`));
				} else {
					done();
				}
			});
		});
		it('#Should know the command "ls"', (done) => {
			commandExists('ls', (error, result) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${error}`));
				} else {
					if (result === true) {
						done();
					} else {
						done(new Error('The command "ls" should exists'));
					}
				}
			});
		});
		it('#Should not know the command "dcejvhiosvbfh"', (done) => {
			commandExists('dcejvhiosvbfh', (error, result) => {
				if (error) {
					done(new Error(`Didn't expected an error to happend\nError:\n${error}`));
				} else {
					if (result === false) {
						done();
					} else {
						done(new Error('The command dcejvhiosvbfh shouldn\'t exists'));
					}
				}
			});
		});
	} else {
		it('#The platform is not linux so it should run into an error', (done) => {
			commandExists('', (error) => {
				if (error) {
					if (error.message === 'This module only runs on linux') {
						done();
					} else {
						done(new Error(`Didn't expected this error to happend\nError:\n${error}`));
					}

				} else {
					done(new Error('The platform is detected as it is linux'));
				}
			});
		});
	}
});
