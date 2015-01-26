var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib';


var isMarkdown = require(lib_dir + '/isMarkdown.js');


describe('#isMarkdown', function (){
  it('returns true if we test *.md and *.markdown', function (){
    assert.equal(isMarkdown('test.md'), true);
    assert.equal(isMarkdown('test.markdown'), true);
  });

  it('returns false if we test a file without a markdown extension', function (){
    assert.equal(isMarkdown('test.not_md'), false);
  });

  it("doesn't throw when the regex pattern can't find any form of file extension", function (){
    assert.doesNotThrow(function (){
      isMarkdown('test');
    });
  });

  it("doesn't throw when we do not pass a string to check", function (){
    assert.doesNotThrow(function (){
      isMarkdown();
    });
  });

});