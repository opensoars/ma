var fs = require('fs');

var log = process.log,
    logErr = process.logErr;

var MSGS = process.MSGS;

/**
 * Writes file_data to file_name (markdown input file);
 *
 * Will add the prefix: `test_` (for now)
 *
 * @param file_name {string}
 * @param file_data {string}
 */
module.exports = function writeFile(file_name, file_data){

  if(!file_name)
    return logErr(MSGS + 'no filename is specified');

  if(typeof file_data !== 'string')
    file_data = undefined;

  file_data = file_data || '';


  fs.writeFile(file_name, file_data, function (err){
    if(err) return logErr('Could not write file: ' + file_name, err);

    log('File: ' + file_name + ' written succesfuly');
  });

};