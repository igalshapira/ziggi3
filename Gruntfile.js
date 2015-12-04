module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    apidoc: {
      myapp: {
        src: "app/",
        dest: "apidoc/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-apidoc');

  // Default task(s).
  grunt.registerTask('default', ['apidoc']);
};