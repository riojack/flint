const {spawnServerUnderTest} = require('./server_helper'),
  {buildAndConnectOn} = require('./socket_helper'),

  {expect} = require('chai'),

  {join, normalize} = require('path'),

  startup_safety_timeout = 2100,
  shutdown_safety_timeout = 500,

  cmd = 'node',
  args = ['server.js'],
  opts = {
    cwd: normalize(join(__dirname, '..', '..')),
    detached: true
  };

describe('Logging in, getting secret, sending text, and logging out', () => {
  let server, sock;

  before((done) => {
    server = spawnServerUnderTest(cmd, args, opts);
    sock = buildAndConnectOn(4001);

    setTimeout(() => {
      expect(server.proc_running_normally, 'expected the server to be running correctly')
        .to.equal(true);

      expect(sock.is_alive, 'expected the socket to have connected successfully')
        .to.equal(true);

      done();
    }, startup_safety_timeout);
  });

  after((done) => {
    let safetyTimeout;

    if (server.proc_running_normally) {
      server.proc.kill();
    }

    if (sock.is_alive) {
      sock.close();
      safetyTimeout = shutdown_safety_timeout;
    } else {
      safetyTimeout = 0;
    }

    setTimeout(() => {
      expect(server.proc_running_normally, 'expected the server to have been shut down')
        .to.equal(false);

      expect(sock.is_alive, 'expected the socket to have been closed successfully')
        .to.equal(false);

      done();
    }, safetyTimeout);
  });

  it('I submit a username and receive a confirmation', (done) => {
    sock.on_receive('username.register.reply', (registerReply) => {
      expect(registerReply).to.have.property('isValid')
        .that.equals(true);

      done();
    });

    sock.send('username.register.request', {username: 'billybob'});
  });
});
