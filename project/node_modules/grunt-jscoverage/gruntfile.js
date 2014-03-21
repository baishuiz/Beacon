"use strict";

module.exports = function(grunt) {

  grunt.loadTasks('./tasks');

  grunt.initConfig({
    jscoverage: {
      options: {
        inputDirectory: 'lib',
        outputDirectory: 'lib-cov',
        highlight: false,
        exclude: '',
        encoding: '',
        noInstrument: '',
        jsVersion: ''
      }
    }
  });
};