var assert = require('assert');

var base_dir = __dirname + '/../..',
    module_dir = base_dir + '/node_modules/'
    lib_dir = base_dir + '/lib/';

process.cls = require(module_dir + 'opensoars_cls');

process.MSGS = require(lib_dir + 'msgs.js');


describe('#logCommentData', function (){

  it("doesn't throw when we pass no arguments", function (){
    assert.doesNotThrow(function (){
      logCommentData();
    });
  });

  it('calls logErr with 1 argument', function (done){

    process.logErr = function (){
      assert.equal(arguments.length, 1);
      done();
    };

    var logCommentData = require(lib_dir + 'logCommentData.js');
    logCommentData('a', 'b', 'c', 'd', 'e');
  });

});