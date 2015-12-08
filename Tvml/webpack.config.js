var path= require('path')
io = require('socket.io')(8001);
//io = require('socket.io')(server);
io.serveClient(false);

io.on('connection', function(socket)  {
  console.log('socket.io connection');

  socket.on('event', function(data) {
    console.log('socket.io data:', data);
  });

  socket.on('disconnect', function()  {
    console.log('socket.io disconnect');
  });
});

module.exports = {
  entry: "./src/application.js",
  output: {
    path: path.join(__dirname ,"dist", "js"),
    filename: "application.js",
    publicPath: "dist/js/"
  },
  module: {
    loaders: [
      { test: /mocha\.js/, loader: "imports?window=>{},navigator=>{userAgent: 'tvos'}" },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" , query: { presets: ['es2015']}},
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
      // socket.io-client requires the window object, and navigator.userAgent to be present.
      // use webpack to shim these into socket.io
      { test: /socket\.io\-client/, loader: "imports?window=>{},navigator=>{userAgent: 'tvos'}" },
      //{ test: /page.js/, loader: "imports?document = {},history = {pushState: function() {}}", },
    ]
  },
  plugins: [
    function() {
    this.plugin('compile', function() {
      io.emit('compile');
    });

    this.plugin('done', function() {
      io.emit('live-reload');
    });
    },
  ]

}
