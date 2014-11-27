var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';


var makeFileList = require(lib_dir + 'makeFileList.js');


describe('#makeFileList', function (){
  it("doesn't throw when we do not pass a files array", function (){
    assert.doesNotThrow(function (){
      makeFileList();
    });
  });

  it("doesn't throw when we pass an empty files array", function (){
    assert.doesNotThrow(function (){
      makeFileList([]);
    });
  });

  it("doesn't throw when we pass a wrong type", function (){
    assert.doesNotThrow(function (){
      makeFileList({wrong: 'type'});
    });
  });

  it('returns an empty string when we do not pass anything, wrong type or empty array', function (){
    assert.equal(makeFileList(), '');
    assert.equal(makeFileList([]), '');
    assert.equal(makeFileList({}), '');
  });

  it('returns a formatted file list when we pass an array with atleast 1 element', function (){
    assert.equal(makeFileList(['one']).length, 11);
    assert.equal(makeFileList(['one']).charAt(6), '-');
  });

});