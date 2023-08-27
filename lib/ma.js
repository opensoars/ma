// Acces our lib folder with ease
var LIB = __dirname + '/';
process.LIB = LIB;

/* DEPENDENCIES */

// Module dependencies
var fs = require('fs');

var log = process.log,
  logWarn = process.logWarn,
  logErr = process.logErr;

/* MODULE GLOBALS */

// Logging messages
var MSGS = require(LIB + 'msgs');
process.MSGS = MSGS;

// Command line arguments
var ARGV = process.argv,
  MD_DIR = ARGV[2],
  MD_FILE = ARGV[3];

/* MODULE HELPERS */

var getMarkdownFiles = require(LIB + 'getMarkdownFiles.js'),
  makeFileList = require(LIB + 'makeFileList.js'),
  processFile = require(LIB + 'processFile.js'),
  writeFile = require(LIB + 'writeFile.js');

/* EXECUTE */

/**
 * Find markdown files, either by specified filename or fs.readdir
 * If a file is specified, check if we can read it
 * Log about file(s)
 * For each file found, read its content and call processFile with it
 */
(function () {
  // Will hold the markdown file(s) we are going to process
  var md_files = [];

  // If no markdown file is specified, we try to find files and log a warning
  // Else we check if the specified file exists if so, we push the file to
  // the MD_FILES array
  if (!MD_FILE) {
    logWarn(MSGS.file_not_specified);
    md_files = getMarkdownFiles(MD_DIR);

    // Are there still no markdown files? If not, exit
    if (md_files.length === 0) {
      logErr(MSGS.no_md_files);
      return logErr('Exit now');
    }
  } else {
    log(MSGS.file_specified + ' `' + MD_FILE + '`');
    log(MSGS.check_exists);

    // Does the files exist?
    // If yes we continue without saving the code (overhead!)
    // If not, log and exit
    try {
      fs.readFileSync(MD_FILE);
    } catch (e) {
      logErr(MSGS.does_not_exists + MD_FILE + ', will exit now');
      return logErr('Exit now');
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
  md_files.forEach(function (md_file) {
    fs.readFile(md_file, 'utf8', function (err, data) {
      if (err) return logErr('Error while reading file: ' + md_file, err);

      processFile(md_file, data, function (err, processed_file) {
        if (err) return logErr(err);

        writeFile(md_file, processed_file, function (err) {
          if (err) return logErr(err);

          log('File written succesfuly to: ' + md_file);
        });
      });
    });
  });
})();
