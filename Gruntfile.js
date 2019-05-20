module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
           files: ['Gruntfile.js', 'src/config.js', 'src/serviceWorker.js'],
           options: {
               esversion: 6
           }
        }
     });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
 };