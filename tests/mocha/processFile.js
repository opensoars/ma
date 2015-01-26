var assert = require('assert'),
    fs = require('fs');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';

var processFile = require(lib_dir + 'processFile.js');

var test_file = fs.readFileSync(base_dir + '/tests/fixtures/md/correct/test.md');

describe('#processFile', function (){
  it('should write a processed file if everything succeeds', function (){
    
  });
});