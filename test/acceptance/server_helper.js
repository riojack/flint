const {spawn} = require('child_process');

module.exports.spawnServerUnderTest = function (cmd, args, opts, chatty) {
  let logger = chatty ? console : { log: () => {}, error: () => {}},
    proc_state = {
      proc: null,
      proc_running_normally: true
    },
    proc = spawn(cmd, args, opts);

  proc.stdout.on('data', (data) => {
    logger.log(`STDOUT: ${data}`);
  });

  proc.stderr.on('data', (data) => {
    logger.error(`STDERR: ${data}`);
    proc_state.proc_running_normally = false;
  });

  proc.on('exit', () => {
    proc_state.proc_running_normally = false;
  });

  proc_state.proc = proc;

  return proc_state;
};
