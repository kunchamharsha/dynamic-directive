'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/dynamic-directive.js': 'src/dynamic-directive.js'
        }
      }
    },
    karma: {
      unit: {
        configFile: './test/config/karma.conf.js',
        browsers: ['PhantomJS']
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          screwIE8: true
        },
        files: {
          'dist/dynamic-directive.min.js': ['dist/dynamic-directive.js']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
          src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
      }
    },
    lint_pattern: {
      options: {
        rules: [
          { pattern: /(describe|it)\.only/, message: 'Must not use .only in tests' }
        ]
      },
      all: {
        src: ['<%= jshint.all.src %>']
      }
    },
    eslint: {
      src: ['<%= jshint.all.src %>']
    },
    watch: {
      src: {
        files: ['src/**/*.js'],
        tasks: ['linters', 'babel']
      },
      test: {
        files: 'test/**/*.js',
        tasks: ['test-frontend']
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lint-pattern');
  grunt.loadNpmTasks('gruntify-eslint');

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('test-frontend', 'Run the frontend tests', ['babel:dist', 'uglify:dist', 'karma:unit']);
  grunt.registerTask('linters', ['lint_pattern', 'jshint', 'eslint']);
};
