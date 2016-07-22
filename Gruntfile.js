var assets = require('./assets').production;
var http = require('http');

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
        dest: "public/apidoc/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.registerTask('default', ['apidoc']);

  //Read hebrew holidays using HebCal API
  grunt.registerTask('hebcal', function() {
    var done = this.async();
    var year = parseInt(grunt.option('year'));

    if (!(year >= 2015 && year <= 2100))
      return grunt.log.error("You must specify --year=(2015 to 2100)");
    
    var url = 'http://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&month=x&nx=off&mf=off&ss=off&mod=on&s=off&c=off&geo=none&i=on&lg=h&year=' +
        year;
    grunt.log.writeln("Loading holidays from ", url);
    http.get(url, function(response) {
        console.log("Got response: " + response.statusCode);
        var data = "";
        response.on("data", function(chunk) {
          data += chunk;
        });
        response.on("end", function() {
          var filename = "AddHebHolidays" + year + ".js";
          console.log("Done. Create migration using:")
          console.log("node_modules\\.bin\\migrate create AddHebHolidays" + year);
          console.log("Move " + filename + " to migration file");

          var dates = JSON.parse(data);
          var content = "'use strict'\n";
          content += "var db = require('../app/db');\n\n";
          content += "exports.up = function(next) { \n";
          content += "    db.Calendar.create([\n";
          for (var i = 0; i < dates.items.length; i++)
          {
            var item = dates.items[i];
            content += "    {\n"
            content += "      type: 'heb',\n",
            content += "      title: '" + item.title + "',\n",
            content += "      date: new Date('" + item.date +  "'),\n"
            content += "    },\n";
          }
          content += "    ], function(err) {\n      if (err)\n        throw err;\n      next();\n    });\n};\n\n"
          content += "exports.down = function(next) {\n  next();\n};\n";
          grunt.file.write(filename, content)
          done();
        });
    }).on('error', function(err) {
        console.log("Got error: " + err.message);
        done();
    });
  });
};