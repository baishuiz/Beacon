"use strict";

var jscover = require("jscover");

module.exports = function(grunt) {
	grunt.registerTask("jscover", "Grunt task for jscover; which will parse your source code and generate an instrumented version allowing testing tools to generate code coverage reports", function() {

		var done = this.async();
		var options = this.options();

		if (options.outputDirectory == "lib") { 
			grunt.log.error("Are you sure you want to delete lib? Please use a different output directory.");
			done(false);
			return;
		}

		if (grunt.file.exists(options.outputDirectory)) grunt.file.delete(options.outputDirectory);
	
		jscover(options.inputDirectory, options.outputDirectory, [], function (error, output) {
			if (error) {
				grunt.log.error(output);
				done(false);
			}
			done();
		});
	});
};
