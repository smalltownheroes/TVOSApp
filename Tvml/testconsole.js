var io = require('socket.io')(8002);
io.serveClient(false);

io.on('connection', function(socket)  {
  console.log('jasmin socket.io connection');

  socket.on('jasmine', function(data) {
    console.log(data);
  });

  socket.on('disconnect', function()  {
    console.log('jasmin socket.io disconnect');
  });
});
