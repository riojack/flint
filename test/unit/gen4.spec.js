const gen4 = require('../../lib/gen4'),
  expect = require('chai').expect;

describe('Gen4 tests', () => {
  it('should return a string with 4 characters', () => {
    let key = gen4.generate();

    expect(key).to.have.length(4);
  });
});
