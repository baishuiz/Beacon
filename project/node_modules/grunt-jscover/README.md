# grunt-jscover

Grunt task for jscover; which will parse your source code and generate an instrumented version allowing testing tools to generate code coverage reports.

This is a fork of [grunt-jscoverage](https://github.com/AndrewKeig/grunt-jscoverage) which uses [JSCover](http://tntim96.github.com/JSCover/) instead of [node-jscoverage](https://github.com/visionmedia/node-jscoverage).


## Installation

Install npm package

    npm install grunt-jscover --save-dev

Add this line to your project's `Gruntfile.js`:

    grunt.loadNpmTasks("grunt-jscover");


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
grunt jscover
````
