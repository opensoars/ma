/**
 * Makes a pretty list string of file names to log using `log`
 *
 * @param  files {array}  File name strings
 * @return list  {string} Prettified files list
 */
module.exports = function makeFileList(files){

  if(files.constructor !== Array)
    files = [];

  files = files || [];

  var list_str = '';

  files.forEach(function (file){
    list_str += '\n     - ' + file;
  });

  return list_str;
};