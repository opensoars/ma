// Command line arguments
var ARGV = process.argv,
    MD_DIR = ARGV[2],
    MD_FILE = ARGV[3];


// Module dependencies
var fs = require('fs');


// Pretty logging
var Ezlog = require('Ezlog'),
    log = new Ezlog({ p: {t: '[ma]', c: 'green'} }),
    logWarn = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'yellow'} });
    logErr = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'red'} });


// Logging messages
var MSGS = {

  could_not_read:
    'Could not read this directory, will exit now',

  empty_dir:
    'There are no files in this directory, will exit now',

  file_not_specified:
    'No markdown file specified, will try to find any markdown file now',

  no_md_files: 
    'No markdown files found in this directory, will exit now'

};


// Allowed file extensions
var OK_EXTENSIONS = ['.md', '.markdown'];

// Will hold markdown file(s) specified or found
var MD_FILES = [];


/**
 * Return true when a file has an allowed markdown extension
 *
 * @param file {string}  File name
 * @return     {bool}    Whether the file has an allowed markdown extension
 */
function isMarkdown(file){
  var extension_matches = /\.(.+)/.exec(file),
      extension = extension_matches === null ? '' : extension_matches[0];

  return OK_EXTENSIONS.indexOf(extension) !== -1 ? true : false;
}

/**
 * Returns an array of found markdown files
 *
 * @param dir {string}  The directory to look for markdown files
 * @return    {array}   Array of found markdown files
 */
function getMarkdown(dir){

  // Will be assigned files array of the cd
  var files,
      found_markdown = [];

  // Can we read the directory ma is called in?
  // If yes, assign files the array of files found
  // If not, log and exit
  try { files = fs.readdirSync(dir); }
  catch(e){ logErr(MSGS.could_not_read); }

  // Are there any files found in the cd?
  // If not, log and exit
  if(files.length === 0) logErr(MSGS.empty_dir);

  // Find markdown files from files array and push them to md_files array
  files.forEach(function (file){
    if(isMarkdown(file))
      found_markdown.push(file);
  });

  return found_markdown;
}


// If no markdown file is specified, we try to find files and log a warning
// Else we just push the specified file to the MD_FILES array
if(!MD_FILE){
  logWarn(MSGS.file_not_specified);
  MD_FILES = getMarkdown(MD_DIR);
}
else
  MD_FILES.push(MD_FILE);


// Are there any markdown files?
// If not, exit
if(MD_FILES.length === 0) return process.exit();


console.log(MD_FILES);