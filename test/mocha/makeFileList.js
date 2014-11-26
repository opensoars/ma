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

});