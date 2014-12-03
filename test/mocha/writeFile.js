var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';


describe('#writeFile', function (){
  it('logs and exits when we do not specify a file name', function (){
    

    process.logErr = function (){
      assert.equal(arguments.length, 1);
      done();
    };

    var writeFile = require(lib_dir + 'writeFile.js');

    writeFile();

  });
});