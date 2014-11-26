var fs = require('fs');

var log = process.log,
    logErr = process.logErr;


/**
 * Writes file_data to file_name (markdown input file);
 *
 * Will add the prefix: `test_` (for now)
 *
 * @param file_name {string}
 * @param file_data {string}
 */
module.exports = function writeFile(file_name, file_data){

  //file_name = 'test_' + file_name;
  file_name = file_name;


  fs.writeFile(file_name, file_data, function (err){
    if(err) return logErr('Could not write file: ' + file_name, err);

    log('File: ' + file_name + ' written succesfuly');
  });

};