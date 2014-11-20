var ARGV = process.argv,
    MD_DIR = ARGV[2],
    MD_FILE = ARGV[3];

var fs = require('fs');

var Ezlog = require('Ezlog'),
    log = new Ezlog({ p: {t: '[ma]', c: 'green'} }),
    logWarn = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'yellow'} });
    logErr = new Ezlog({ p: {t: '[ma]', c: 'green'}, t: {c: 'red'} });


try { fs.readdirSync(MD_DIR); }
catch(e){ logWarn('Could not read the directory ma is called from'); }


if(!MD_FILE)
  logWarn('No markdown file to edit given, '
    + 'will try to find any markdown file now');

var files = fs.readdirSync(MD_DIR);

if(files.length === 0)
  return logErr('There are no files in the directory ma is called from, '
    + 'will exit now');