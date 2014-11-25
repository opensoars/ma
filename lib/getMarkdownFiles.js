var fs = require('fs');

var MSGS = require(process.LIB + 'msgs.js');

var isMarkdown = require(process.LIB + 'isMarkdown.js');



/**
 * Returns an array of found markdown files
 *
 * @param dir {string}  The directory to look for markdown files
 * @return    {array}   Array of found markdown files
 */
module.exports = function getMarkdownFiles(dir){

  // Will be assigned files array of the cd
  var files;

  // Will hold the markdown files found in the cd
  var found_markdown = [];

  // Can we read the directory ma is called in?
  // If yes, assign files the array of files found
  // If not, log and exit
  try { files = fs.readdirSync(dir); }
  catch(e){
    logErr(MSGS.could_not_read);
    process.exit();
  }

  // Are there any files found in the cd? If not, log
  if(files.length === 0) logWarn(MSGS.empty_dir);

  // Find markdown files from files array and push them to md_files array
  files.forEach(function (file){
    if(isMarkdown(file))
      found_markdown.push(file);
  });

  return found_markdown;
}