function distPath(path) { return './dist/' + path; }
function srcPath(path) { return './src/' + path; }

module.exports = function(grunt) {

  var config = {};

  // CSS
  // ---------------

  // Sass
  config.sass = {
    css: {
      options: {
        style: 'expanded',
        sourceMap: true,
        cacheLocation: './tmp'
      },
      files: {
        [distPath('app.css')]: srcPath('app.scss')
      }
    }
  };

  // Autoprefixer
  config.autoprefixer = {
    css: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      src: distPath('app.css')
    }
  };

  // Minify
  config.cssmin = {
    css: {
      sourceMap: true,
      files: {
        [distPath('app.min.css')]: distPath('app.css')
      }
    }
  };

  // Watch
  config.watch = {
    options: {
      livereload: 35729
    },
    css: {
      files: [srcPath('**/*.scss')],
      tasks: ['css'],
    }
  };

  // Register individual tasks
  grunt.registerTask('css', [ 'sass:css', 'autoprefixer:css', 'cssmin:css' ]);

  // Register build task
  grunt.registerTask('build', [
    'css',
  ]);

  // Register watch and server tasks
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.registerTask('server', [ 'build', 'watch' ]);
  grunt.registerTask('serve', [ 'server' ]);

  // Initialize configuration
  grunt.initConfig(config);

  // Load npm tasks
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

};
