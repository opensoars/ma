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
var msgs = {

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
var allowed_extensions = ['.md', '.markdown'];


// Will be assigned files array of the cd
var files;


// Can we read the directory ma is called in?
// If yes, assign files the array of files found
// If not, log and exit
try { files = fs.readdirSync(MD_DIR); }
catch(e){ return logErr(msgs.could_not_read); }

// Are there any files found in the cd?
// If not, log and exit
if(files.length === 0) return logErr(msgs.empty_dir);

// Did the user specify a markdown file?
if(!MD_FILE) logWarn(msgs.file_not_specified);


var md_files = [];

// Find markdown files from files array and push them to md_files array
files.forEach(function (file){
  var extension_matches = /\.(.+)/.exec(file),
      extension = extension_matches === null ? '' : extension_matches[0];

  if(allowed_extensions.indexOf(extension) !== -1)
    md_files.push(file);
});

// Did we find any markdown files?
// If not, log and exit
if(md_files.length === 0) return logErr(msgs.no_md_files);