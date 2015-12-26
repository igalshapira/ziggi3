var assets = require('./assets').production;

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: 'out/z.js',
        dest: 'build/zm.js'
      },
      css: {
        src: 'out/z.css',
        dest: 'build/zm.css'
      }
    },
    bower: {
     dev: {
        dest: 'out',
        options: {
          keepExpandedHierarchy: false
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: assets.js,
        dest: 'out/z.js',
      },
      css: {
        src: assets.css,
        dest: 'out/z.css',
      },
    },
    apidoc: {
      myapp: {
        src: "app/",
        dest: "apidoc/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-apidoc');

  // Default task(s).
  grunt.registerTask('default', ['apidoc']);
};