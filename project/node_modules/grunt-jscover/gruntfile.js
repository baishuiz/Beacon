"use strict";

module.exports = function(grunt) {

	grunt.loadTasks('./tasks');

	grunt.initConfig({
		jscover: {
			options: {
				inputDirectory: 'lib',
				outputDirectory: 'lib-cov'
			}
		}
	});
};
