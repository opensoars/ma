var assert = require('assert');

var base_dir = __dirname + '/../..',
    module_dir = base_dir + '/node_modules/'
    lib_dir = base_dir + '/lib/';

process.cls = require(module_dir + 'opensoars_cls');

process.MSGS = require(lib_dir + 'msgs.js');


var getCommentData = require(lib_dir + 'getCommentData.js');


describe('#getCommentData', function (){

  it("doesn't throw when we pass no arguments", function (){
    assert.doesNotThrow(getCommentData);
  });

  it('returns an complete string', function (){
    var comment_data = getCommentData();
    assert.equal(typeof comment_data, 'string');
  });

  it('turns `true` green', function (){
    var comment_data = getCommentData('test', true, true, true, true);
    assert.notEqual(comment_data.indexOf('\x1B[32m'), -1);
  });

  it('turns `false` red', function (){
    var comment_data = getCommentData('test', false, false, false, false);
    assert.notEqual(comment_data.indexOf('\x1B[31m'), -1);
  });

});
