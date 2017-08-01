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

describe('Asking for 4-character secret', () => {
  let server, sock;

  beforeEach((done) => {
    server = spawnServerUnderTest(cmd, args, opts);
    sock = buildAndConnectOn(4001, true);

    setTimeout(() => {
      expect(server.proc_running_normally, 'expected the server to be running correctly')
        .to.equal(true);

      expect(sock.is_alive, 'expected the socket to have connected successfully')
        .to.equal(true);

      done();
    }, startup_safety_timeout);
  });

  afterEach((done) => {
    let safetyTimeout;

    if (server.proc_running_normally) {
      server.proc.kill();
    }

    if (sock.is_alive) {
      sock.close();
      safetyTimeout = shutdown_safety_timeout;
    } else {
      // fail fast
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

  it('should do the needful', (done) => {
    sock.on_receive('secret reply', (msg) => {
      expect(msg).to.have.length(4);

      done();
    });

    sock.send('secret request', 'bark');
  });
});
