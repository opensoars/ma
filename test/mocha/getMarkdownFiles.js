var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/',
    module_dir = base_dir + '/node_modules/';


process.LIB = lib_dir;
process.MSGS = require(lib_dir + 'MSGS.js');

process.logErr = require(module_dir + 'ezlog');


var getMarkdownFiles = require(lib_dir + 'getMarkdownFiles.js');


describe('#getMarkdownFiles', function (){
  it('test', function (){
    getMarkdownFiles();
  });
});