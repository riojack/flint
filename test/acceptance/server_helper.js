const {spawn} = require('child_process');

module.exports.spawnServerUnderTest = function (cmd, args, opts) {
  let proc_state = {
      proc: null,
      proc_running_normally: true
    },
    proc = spawn(cmd, args, opts);

  proc.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data}`);
  });

  proc.stderr.on('data', (data) => {
    console.error(`STDERR: ${data}`);
    proc_state.proc_running_normally = false;
  });

  proc.on('exit', () => {
    proc_state.proc_running_normally = false;
  });

  proc_state.proc = proc;

  return proc_state;
};
