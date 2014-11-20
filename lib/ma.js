var ARGV = process.argv,
    MD_DIR = ARGV[2],
    MD_FILE = ARGV[3];

var fs = require('fs');

var Ezlog = require('Ezlog'),
    log = new Ezlog({ p: {t: '[ma]', c: 'green'} }),
    logWarn = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'yellow'} });
    logErr = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'red'} });

var files;
try { files = fs.readdirSync(MD_DIR); }
catch(e){
  logErr('Could not read the directory ma is called from, '
    + 'will exit now');

  process.exit();
}

if(!MD_FILE)
  logWarn('No markdown file to edit given, '
    + 'will try to find any markdown file now');

if(files.length === 0)
  return logErr('There are no files in the directory ma is called from, '
    + 'will exit now');

var md_files = [];

files.forEach(function (file){
  if(file.indexOf('.md') !== -1 || file.indexOf('.markdown') !== -1){
    log('Found a markdown file: ' + file);
    md_files.push(file);
  }
});


if(md_files.length === 0)
  logErr('No markdown files found in the directory ma is called from, '
    + 'will exit now');