module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON("package.json"),
        concat: {
            options: {
                separator: ';'
            }
            
           ,dist: {
                src: ['../src/beacon.js','../src/base.js','../src/combinationalEvent.js','../src/Event.js','../src/openAPI.js'],
                dest: '../dist/<%= pkg.name %>.js'
            }
        }
        
       ,jasmine: {
            pivotal: {
              src: '../dist/**/*.js',
              options: {
                specs: '../test/spec/*Spec.js',
                keepRunner:true
              }
            }
        }    
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', [ 'concat','jasmine']);
};
