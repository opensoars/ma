var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib';

var isMarkdown = require(lib_dir + '/isMarkdown.js');

describe('#isMarkdown', function (){
  it('returns true if we test `test.md`', function (){
    assert.equal(isMarkdown('test.md'), true);
  });

  it("doesn't throw when the regex pattern can't find any form of file extension", function (){
    assert.doesNotThrow(isMarkdown('test'));
  });

});