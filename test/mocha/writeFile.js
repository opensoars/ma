var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';


process.MSGS = require(lib_dir + 'msgs.js');

var writeFile = require(lib_dir + 'writeFile.js')


describe('#writeFile', function (){

  it('returns an error when no file_name is given', function (done){
    writeFile(undefined, undefined, function (err){
      if(err) done();
    });
  });

  it('returns an error when file_name is not a string', function (done){
    writeFile({a: 'b'}, undefined, function (err){
      if(err) done();
    });
  });

  it('returns an error when no file_data is given', function (done){
    writeFile('hello', 'world', function (err){

    });
  });

  it('returns an error when file_data is not a string', function (done){
    writeFile('hello', 'world', function (err){

    });
  });

  it('returns an error when no callback is given', function (){
    writeFile('hello', 'world', function (err){

    });
  });

  it('returns an error when callback is not a function', function (){
    writeFile('hello', 'world');
  });

});


/*

describe('#writeFile', function (){

  it('logs and exits when we do not specify a file name', function (done){
    
    process.logErr = function (){
      assert.equal(arguments.length, 1);
      done();
    };

    var writeFile = require(lib_dir + 'writeFile.js')
    writeFile();
  });


  it("doesn't throw when we specify a wrong file_data type", function (){

    process.logErr = function (){
      console.log('WONT GET CALLED');
    };

    
    assert.doesNotThrow(function (){
      var writeFile = require(lib_dir + 'writeFile.js')
      writeFile('test', {a: 'b'});
    });

  });

});
*/