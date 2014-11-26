var fs = require('fs');

var isMarkdown = require(process.LIB + 'isMarkdown.js');

var MSGS = process.MSGS;

var logErr = process.logErr,
    logWarn = process.logWarn;

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
    logWarn(MSGS.empty_dir, e);
    files = [];
  }

  // Find markdown files from files array and push them to md_files array
  files.forEach(function (file){
    if(isMarkdown(file))
      found_markdown.push(file);
  });

  return found_markdown;
};