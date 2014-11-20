/* DEPENDENCIES */

// Module dependencies
var fs = require('fs');

// Pretty logging (dependency)
var Ezlog = require('Ezlog'),
    log = new Ezlog({ p: {t: '[ma]', c: 'green'} }),
    logWarn = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'yellow'} });
    logErr = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'red'} });


/* GLOBALS */

// Logging messages
var MSGS = {
  could_not_read: 'Could not read this directory, will exit now',
  empty_dir:'There are no files in this directory',
  file_not_specified:
    'No markdown file specified, will try to find any markdown file now',
  file_specified: 'Markdown file specified',
  check_exists: 'Checking if the specified file exists',
  does_not_exists: 'The following file does not exist: ',
  no_md_files: 'No markdown files to use, will exit now',
  files_used: 'The following markdown file(s) will be used: '
};


// Command line arguments
var ARGV = process.argv,
    MD_DIR = ARGV[2],
    MD_FILE = ARGV[3];

// Allowed file extensions
var OK_EXTENSIONS = ['.md', '.markdown'];


/* HELPERS */

/**
 * Checks whether a file is a markdown file or not
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

/**
 * Makes a pretty list string of file names to log using `log`
 *
 * @param  files {array}  File name strings
 * @return list  {string} Prettified files list
 */
function makeFileList(files){
  var list_str = '';

  files.forEach(function (file){
    list_str += '\n     - ' + file;
  });

  return list_str;
}

/**
 * Processes a file its content
 *
 * @param data {string}  File content in utf8 format
 */
function processFile(err, data){
  if(err) return logErr('fs.readFile error', err);


  console.log(data.length);

}



/* EXECUTE */

(function (){

  // Will hold the markdown file(s) we are going to process
  var md_files = [];

  // If no markdown file is specified, we try to find files and log a warning
  // Else we check if the specified file exists if so, we push the file to
  // the MD_FILES array
  if(!MD_FILE){
    logWarn(MSGS.file_not_specified);
    md_files = getMarkdown(MD_DIR);

    // Are there still no markdown files? If not, exit
    if(md_files.length === 0){
      logErr(MSGS.no_md_files)
      return process.exit();
    }
  }
  else{
    log(MSGS.file_specified + ' `' + MD_FILE + '`');
    log(MSGS.check_exists);

    // Does the files exist?
    // If yes we continue without saving the code (overhead!)
    // If not, log and exit
    try { fs.readFileSync(MD_FILE); }
    catch(e){
      logErr(MSGS.does_not_exists + MD_FILE + ', will exit now');
      process.exit();
    }

    md_files.push(MD_FILE);
  }

  // Log about the file(s) we're going to use
  log(MSGS.files_used + makeFileList(md_files));


  // Loop through file names and read utf8 content from it
  // We pass the processFile function as a callback
  md_files.forEach(function (md_file){
    fs.readFile(md_file, 'utf8', processFile);
  });


}());

