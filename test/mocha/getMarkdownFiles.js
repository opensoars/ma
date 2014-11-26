var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/',
    module_dir = base_dir + '/node_modules/'
    md_dir = __dirname + '/md/';


process.LIB = lib_dir;
process.MSGS = require(lib_dir + 'MSGS.js');

process.logErr = function (){};
process.log = function (){};
process.logWarn = function (){};


var getMarkdownFiles = require(lib_dir + 'getMarkdownFiles.js');


describe('#getMarkdownFiles', function (){

  it("doesn't throw when we don't pass a dir to read", function (){
    assert.doesNotThrow(function (){
      getMarkdownFiles();
    });
  });

  it("doesn't throw if a dir is empty", function (){
    assert.doesNotThrow(function (){
      getMarkdownFiles(md_dir);
    });
  });

});