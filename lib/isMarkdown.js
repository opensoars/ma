// Allowed file extensions
var OK_EXTENSIONS = ['.md', '.markdown'];


/**
 * Checks whether a file is a markdown file or not
 *
 * @param file {string}  File name
 * @return     {bool}    Whether the file has an allowed markdown extension
 */
module.exports = function isMarkdown(file){
  var extension_matches = /\.(.+)/.exec(file),
      extension = extension_matches === null ? '' : extension_matches[0];

  return OK_EXTENSIONS.indexOf(extension) !== -1 ? true : false;
};