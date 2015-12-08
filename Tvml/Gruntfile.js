var webpack = require("webpack");
var path = require('path')

module.exports = function(grunt) {

  var webpackConfig = require("./webpack.config.js");

  /*
  grunt.registerTask('console', 'A task to send command to console', function(arg1, arg2) {
    var done = this.async();

    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('js> ');
    rl.prompt();

    rl.on('line', function(line) {
      if (line === "quit") rl.close();

      pusher.trigger('TVOSDebug', 'console', { "command": line },null,function(error,req,resp) { 
        // grunt.log.writeln("command triggered")
        //done(error)
      });

      rl.prompt();
    }).on('close',function(){
      done()
    });

  });
  */

  grunt.initConfig({
    "webpack-dev-server": {
      options: {
        webpack: webpackConfig,
        publicPath: "/" + webpackConfig.output.publicPath
      },
      start: {
        keepAlive: true,
        webpack: {
          devtool: "eval",
          debug: true
        }
      }
    },
    watch: {
      app: {
        files: 'src/**/*',
        tasks: ['webpack:build-dev'],
        options: {
          spawn: false
        },
      },
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          debug: true
        }
      }
    },
    jade: {
      templates: {
        options: {
          requireJs: true,
          client: true,
          debug: true,
          namespace: 'TVOSTemplates',
          processName: function(filename) {
            return (path.basename(filename,'.jade'))
          }
        },
        files: {
          'dist/js/TVOSTemplates.js': [ 'src/templates/*.jade' ]
        }
      }
    },
    webpack: {
      options: webpackConfig,
      build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
          "process.env": {
            // This has effect on the react lib size
            "NODE_ENV": JSON.stringify("production")
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
        )
      },
      "build-dev": {
        devtool: "sourcemap",
        debug: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-webpack');

  //grunt.registerTask('default',[ 'copy', 'jade','connect:server','liveReload','watch'])
  // The development server (the recommended option for development)
  grunt.registerTask("default", ["webpack-dev-server:start"]);

  // Build and watch cycle (another option for development)
  // Advantage: No server required, can run app from filesystem
  // Disadvantage: Requests are not blocked until bundle is available,
  //               can serve an old app on too fast refresh
  grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

  // Production build
  grunt.registerTask("build", ["webpack:build"]);
}
