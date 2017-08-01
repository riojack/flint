const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

io.on('connect', (socket) => {
  console.log('connection established');

  socket.on('disconnecting', () => {
    console.log('disconnected');
  });

  socket.on('secret request', () => {
    console.log('got message');
    socket.emit('secret reply', 'abcd');
  });
});

app.get('/', (req, res) => res.send('Hello, world!'));

http.listen(4001, () => {
  console.log('HTTP server running...');
});
