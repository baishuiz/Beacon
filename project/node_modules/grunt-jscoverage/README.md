grunt-jscoverage
==============

Grunt task for jscoverage; which will parse your source code and generate an instrumented version allowing testing tools to generate code coverage reports.

This module requires [node-jscoverage](https://github.com/visionmedia/node-jscoverage) in order to function:


## Installation

Install npm package

    npm install grunt-jscoverage --save-dev

Add this line to your project's `Gruntfile.js`:

    grunt.loadNpmTasks("grunt-jscoverage");


## Usage

note: this task will delete the contents of the output-directory; if one exists; before attempting to parse source.

````
grunt.initConfig({
  jscoverage: {
    options: {
      inputDirectory: 'lib',
      outputDirectory: 'lib-cov'
    }
  }
});
````

## Run
````
grunt jscoverage
````

## Options

The following options are also available:

````
options: {
	inputDirectory: 'lib',
	outputDirectory: 'lib-cov',
	highlight: false,
	exclude: '',
	encoding: '',
	noInstrument: '',
	jsVersion: ''
}
````