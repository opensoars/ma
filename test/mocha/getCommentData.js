var assert = require('assert');

var base_dir = __dirname + '/../..',
    module_dir = base_dir + '/node_modules/'
    lib_dir = base_dir + '/lib/';

process.cls = require(module_dir + 'opensoars_cls');

process.MSGS = require(lib_dir + 'msgs.js');


var getCommentData = require(lib_dir + 'getCommentData.js');




/*
describe('#getCommentData', function (){

  it("doesn't throw when we pass no arguments", function (){
    assert.doesNotThrow(function (){
      getCommentData();
    });
  });

  it('calls logErr with 1 argument', function (done){

    process.logErr = function (){
      assert.equal(arguments.length, 1);
      console.log("WORKD");
    };

    var logCommentData1 = require(lib_dir + 'getCommentData.js');
    logCommentData1('a', 'b', 'c', 'd', 'e');
  });

});
*/