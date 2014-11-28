var assert = require('assert');

var base_dir = __dirname + '/../..',
    module_dir = base_dir + '/node_modules/'
    lib_dir = base_dir + '/lib/';

process.cls = require(module_dir + 'opensoars_cls');

process.MSGS = require(lib_dir + 'msgs.js');


var getCommentData = require(lib_dir + 'getCommentData.js');


describe('#getCommentData', function (){

  it("doesn't throw when we pass no arguments", function (){
    assert.doesNotThrow(function (){
      getCommentData();
    });
  });

  it('returns an object with properties: msg and list', function (){
    var comment_data = getCommentData();

    assert.notEqual(comment_data.msg, undefined);
    assert.notEqual(comment_data.list, undefined);
  });

  it('return an object with property msg of type string', function (){
    assert.equal(comment_data.list.constructor , Array);
  });

  it('return an object with property list of type array', function (){
    assert.equal(comment_data.list.constructor , Array);
  });

  it('returns a msg string with the passed in file name in it', function (){
    var comment_data = getCommentData('test');

    assert.notEqual(comment_data.msg.indexOf('test'), -1);
  });
 
  it('turns `true` green', function (){
    var comment_data = getCommentData('test', true, true, true, true);
    assert.notEqual(comment_data.list[0].indexOf('\x1B[32m'), -1);
  });

  it('turns `false` red', function (){
    var comment_data = getCommentData('test', false, false, false, false);
    assert.notEqual(comment_data.list[0].indexOf('\x1B[31m'), -1);
  });

});
