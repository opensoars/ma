/* DEPENDENCIES */

// Module dependencies
var fs = require('fs');

// Pretty logging (dependency)
var cls = require('opensoars_cls'),
    Ezlog = require('Ezlog'),
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
  files_used: 'The following markdown file(s) will be used: ',
  bad_tags: 'The required tags are not present (details below) in file: ',
  no_table_re: 'Could not find the table of contents in file: ',
  no_content_re: 'Could not find the content in file: '
};


// Command line arguments
var ARGV = process.argv,
    MD_DIR = ARGV[2],
    MD_FILE = ARGV[3];

// Allowed file extensions
var OK_EXTENSIONS = ['.md', '.markdown'];

// Regex used for testing required comments
var TABLE_O_RE = /<!--- TABLE_OF_CONTENTS -->/,
    TABLE_C_RE = /<!--- \/TABLE_OF_CONTENTS -->/,
    CONTENT_O_RE = /<!--- CONTENT -->/,
    CONTENT_C_RE = /<!--- \/CONTENT -->/;

// Table of content regex
var T_O_C_RE =
  /<!--- TABLE_OF_CONTENTS -->(.|[\r\n])+<!--- \/TABLE_OF_CONTENTS -->/g;

var C_RE = 
  /<!--- CONTENT -->(.|[\r\n])+<!--- \/CONTENT -->/g

// Comment tags lengths
var TABLE_O_LEN = '<!--- TABLE_OF_CONTENTS -->'.length,
    TABLE_C_LEN = '<!--- /TABLE_OF_CONTENTS -->'.length,
    CONTENT_O_LEN = '<!--- CONTENT -->'.length,
    CONTENT_C_LEN = '<!--- /CONTENT -->'.length;


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
 * Logs about the presence of required comment tags
 *
 * @param fn  {string}  Name of file that is being processed
 * @param t_o {bool}    Data has table open?
 * @param t_c {bool}    Data has table close ?
 * @param c_o {bool}    Data has table open?
 * @param c_c {bool}    Data has table close?
 */
function logCommentData(fn, t_o, t_c, c_o, c_c){
  logErr(MSGS.bad_tags + cls('`' + fn + '`', 'white'));
  log(
    'open  table of contents: ' + cls(t_o, t_o ? 'green' : 'red'),
    'close table of contents: ' + cls(t_c, t_c ? 'green' : 'red'),
    'open  content: ' + cls(c_o, c_o ? 'green':'red'),
    'close content: ' + cls(c_c, c_c ? 'green' : 'red')
  );
}

/**
 * Processes a file its content
 *
 * @param fn   {string}  The file we are processing
 * @param data {string}  File content in utf8 format
 */
function processFile(fn, data){

  var table_o = TABLE_O_RE.test(data),
      table_c = TABLE_C_RE.test(data),
      content_o = CONTENT_O_RE.test(data),
      content_c = CONTENT_C_RE.test(data);

  // If one or more of the required comment tags is/are not present
  // Log which one is missing, and stop processing the current md_file
  if(!table_o || !table_c || !content_o || !content_c)
    return logCommentData(fn, table_o, table_c, content_o, content_c);

  var table_matches = T_O_C_RE.exec(data),
      table,
      table_lines,
      content_matches = C_RE.exec(data),
      content,
      content_lines;

  // We're we able to extract the data with the regex?
  // If not log and stop processing the file
  if(!table_matches)   return logErr(no_table_re   + fn);
  if(!content_matches) return logErr(no_content_re + fn);

  table = table_matches[0];
  content = content_matches[0];

  // EDIT HERE, if not working cross platform
  // Split up the data into an array of lines
  table_lines = table.split('\r\n');
  content_lines = content.split('\r\n');

  // Remove first element from line arrays
  table_lines.splice(0, 1);
  content_lines.splice(0, 1);

  // Remove last element from line arrays
  table_lines.splice(table_lines.length - 1, 1);
  content_lines.splice(content_lines.length - 1, 1);

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
  // This is done async, since we might want to process multiple files
  // Using anonymous function as callback since we might want to
  // add a callback to the processFile function
  md_files.forEach(function (md_file){
    fs.readFile(md_file, 'utf8', function (err, data){
      if(err) return logErr('Error while reading file: ' + md_file, err);

      processFile(md_file, data);
    });
  });

}());
