var Pusher = require('pusher');
var webpack = require("webpack");
var path = require('path')
var pusher = new Pusher({
  appId: process.env.PUSHER_ENV_LIVE_APPID,
  key: process.env.PUSHER_ENV_LIVE_KEY,
  secret: process.env.PUSHER_ENV_LIVE_SECRET,
  keepAlive: true,
  //encrypted: true
  // encrypted: ENCRYPTED, // optional, defaults to false 
  //host: 'HOST', // optional, defaults to api.pusherapp.com 
  //port: PORT, // optional, defaults to 80 for unencrypted and 443 for encrypted 
});

module.exports = function(grunt) {

  var webpackConfig = require("./webpack.config.js");

  grunt.registerTask('liveReload', 'A task to reload', function(arg1, arg2) {
    var done = this.async();

    pusher.trigger('TVOSDebug', 'liveReload', { "name": "patrick" },null,function(error,req,resp) {
      grunt.log.writeln("reload triggered")
      done(error)
    });
  });

  grunt.registerTask('test', 'listen to test output', function(arg1, arg2) {
    var io = require('socket.io')(8002);
    io.serveClient(false);

    io.on('connection', function(socket)  {
  console.log('jasmin socket.io connection');

  socket.on('event', function(data) {
    console.log('jasmin socket.io data:', data);
  });

  socket.on('disconnect', function()  {
    console.log('jasmin socket.io disconnect');
  });
    });

    //socket.on('jasmine', function() { console.debug('Jasmine output') });

  });


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
