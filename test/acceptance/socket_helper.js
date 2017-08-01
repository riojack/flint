const io = require('socket.io-client');

module.exports.buildAndConnectOn = function (port, chatty) {
  let sock = io(`http://localhost:${port}/`),
    logger = chatty ? console : {error: () => {}, log: () => {}},
    sock_facade = {
      is_alive: false,
      send: (eventName, message) => sock.emit(eventName, message),
      close: () => sock.close(),
      on_receive: (eventName, fn) => sock.on(eventName, fn)
    };

  sock.on('error', (err) => {
    logger.error(`<<< received error: ${err}`);
    sock.close();
  });

  sock.on('connect', () => {
    sock_facade.is_alive = true;
    logger.log('~~~ socket opened');
  });

  sock.on('disconnect', () => {
    sock.off();
    logger.log('~~~ socket closed');
    sock_facade.is_alive = false;
  });

  return sock_facade;
};
