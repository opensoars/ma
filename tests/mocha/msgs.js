var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/';


var msgs = require(lib_dir + 'msgs.js');

describe('#msgs', function (){

  it("returns an object when it's required", function (){
    assert.equal(typeof msgs, 'object');
  });

  it('has atleast 1 key value pair', function (){

    var c = 0;
    for(var key in msgs)
      c += 1;

    assert.equal(c > 0, true);

  });

  it('has only string values', function (){

    var isnt_string = false;

    for(var key in msgs)
      if(typeof msgs[key] !== 'string')
        isnt_string = true;

    assert.equal(isnt_string, false);

  });

});