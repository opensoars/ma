var fs = require('fs');

var log = process.log,
    logErr = process.logErr;

var MSGS = process.MSGS;

/**
 * Writes file_data to file_name (markdown input file);
 *
 * Will add the prefix: `test_` (for now)
 *
 * @param  file_name {string}
 * @param  file_data {string}
 * @param  cb        {function}
 * @return err       {string}
 */
module.exports = function writeFile(file_name, file_data, cb){

  if(!file_name || typeof file_name !== 'string')
    return cb(MSGS.processed_file_err + 'no filename string given');

  if(!file_data || typeof file_data !== 'string')
    return cb(MSGS.processed_file_err + 'no file_data string given');


  fs.writeFile(file_name, file_data, function (err){
    if(err)
      return cb(MSGS.processed_file_err + 'fs.writeFile error. ' + err.msg);

    cb();
  });

};