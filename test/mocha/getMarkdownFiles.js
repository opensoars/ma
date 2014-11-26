var assert = require('assert');

var base_dir = __dirname + '/../..',
    lib_dir = base_dir + '/lib/',
    module_dir = base_dir + '/node_modules/'
    md_dir = __dirname + '/../fixtures/md/';


process.LIB = lib_dir;
//process.MSGS = require(lib_dir + 'msgs.js');

process.MSGS = {
  could_not_read_md_dir: 'Could not read this directory: ',
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
  no_content_re: 'Could not find the content in file: ',
  processed_file_err: 'Could not write processed_file because '
};


process.logErr = function (){};
process.log = function (){};
process.logWarn = function (){};


var getMarkdownFiles = require(lib_dir + 'getMarkdownFiles.js');


describe('#getMarkdownFiles', function (){

  it("doesn't throw when we don't pass a dir to read", function (){
    assert.doesNotThrow(function (){
      getMarkdownFiles();
    });
  });

  it("doesn't throw if a dir is empty", function (){
    assert.doesNotThrow(function (){
      getMarkdownFiles(md_dir + 'empty');
    });
  });

  it("reads files in a dir with files", function (){
    assert.doesNotThrow(function (){
      getMarkdownFiles(md_dir + 'correct');
    });
  });

  it("doesn't process files other than markdown files", function (){
    var files = getMarkdownFiles(md_dir + 'non_md');

    assert.equal(files.length, 1);
    assert.equal(files[0], 'test.md');
  });

  it("returns multiple files if present", function (){
    var files = getMarkdownFiles(md_dir + 'multi');
    assert.equal(files.length, 2);
  });

});