"use strict";

module.exports = function(grunt) {
  grunt.registerTask("jscoverage", "Grunt task for jscoverage; which will parse your source code and generate an instrumented version allowing testing tools to generate code coverage reports", function() {

  var done = this.async();
  var options = this.options();

  if (options.outputDirectory == "lib") { 
    grunt.log.error("Are you sure you want to delete lib?  please use a different output directory");
    done(false);
    return;
  }

  if (grunt.file.exists(options.outputDirectory)) grunt.file.delete(options.outputDirectory);

  var args2 = [];
  args2.push(options.inputDirectory);
  args2.push(options.outputDirectory);

  if (!options.highlight) args2.push('--no-highlight');
  if (options.exclude) args2.push('--exclude=' + options.exclude);
  if (options.encoding) args2.push('--encoding=' + options.encoding);
  if (options.noInstrument) args2.push('--no-instrument=' + options.noInstrument);
  if (options.jsVersion) args2.push('--js-version=' + options.jsVersion);

  grunt.util.spawn({
      cmd: 'jscoverage',
      args: args2,
      opts: {
        stdio: 'inherit'
      }
    },
    function (error, result) {
      if (error) {
        grunt.log.error(result.stderr);
        done(false);
      }
      grunt.log.writeln(result.stdout);
      done();
    });
  });
};