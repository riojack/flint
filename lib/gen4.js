const v4 = require('uuid/v4');

module.exports.generate = function() {
  return v4().substring(0, 4);
};
