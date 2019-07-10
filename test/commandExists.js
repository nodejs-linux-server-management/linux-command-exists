var platform = require('os').platform;
var commandExists = require('../dist/linux-command-exists').commandExists;

describe('Test the commandExists function', () => {
	if (platform() === 'linux') {
		it('the platform is linux so it sould works', (done) => {
			commandExists('').then(() => {
				done();
			}).catch(() => {
				done(new Error());
			});
		});
		it('should know the command "ls"', (done) => {
			commandExists('ls').then((exists) => {
				if(exists === true){
					done();
				}else{
					done(new Error());
				}
			});
		});
		it('should not know the command "dcejvhiosvbfh"', (done) => {
			commandExists('dcejvhiosvbfh').then((exists) => {
				if (exists === false) {
					done();
				} else {
					done(new Error());
				}
			});
		});
	} else {
		it('the platform is not linux so it should run into an error', (done) => {
			commandExists('ls').then(() => {
				done(new Error());
			}).catch((error) => {
				if(error === Error('This module only runs on linux')){
					done();
				}else{
					done(new Error('Didn\'t expected this error to happend'));
				}

			});
		});
	}

});
