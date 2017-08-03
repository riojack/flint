const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

io.on('connect', (socket) => {
  console.log('connection established');

  socket.on('disconnecting', () => {
    console.log('disconnected');
  });

  socket.on('secret request', () => {
    socket.emit('secret reply', 'abcd');
  });

  socket.on('secret status request', () => {
    socket.emit('secret status reply', {
      secret: 'abcd'
    });
  });

  socket.on('username.register.request', (registerReq) => {
    socket.emit('username.register.reply', {isValid: true});
  });
});

app.get('/', (req, res) => res.send('Hello, world!'));

http.listen(4001, () => {
  console.log('HTTP server running...');
});
