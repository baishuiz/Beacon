module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['../src/**/*.js'],
        dest: '../dist/<%= pkg.name %>.js'
      }
    }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
grunt.registerTask('default', [ 'concat']);
};


console.log(1)