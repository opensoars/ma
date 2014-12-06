var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';


process.MSGS = require(lib_dir + 'msgs.js');

var writeFile = require(lib_dir + 'writeFile.js');


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
    writeFile('test_file', undefined, function (err){
      if(err) done();
    });
  });

  it('returns an error when file_data is not a string', function (done){
    writeFile('test_file', {a: 'b'}, function (err){
      if(err) done();
    });
  });

  it('throws when no callback is given', function (){
    assert.throws(function (){
      writeFile('test_file', 'test_data');
    });
  });

  it('throws when callback is not a function', function (){
    assert.throws(function (){
      writeFile('test_file', 'test_data', {a: 'b'});
    });
  });

  it('returns an error when fs could not write the file', function (done){
    writeFile(__dirname + '/does_not_exist/test/123', 'test_data', function (err){
      if(err) done();
    });
  });

  it('does not return an error and writes a file when all parameters are present and correct', function (done){
    writeFile(__dirname + '/../test_file', 'test_data', function (err){
      if(!err) done();
    });
  });

});