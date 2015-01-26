var fs = require('fs');

var getCommentData = require(process.LIB + 'getCommentData.js');

// Regex used for testing if the file is already processed
var MA_PROCESSED_RE = /<!--- MA_PROCESSED -->/;

// Regex used for testing required comments
var TABLE_O_RE = /<!--- TABLE_OF_CONTENTS -->/,
    TABLE_C_RE = /<!--- \/TABLE_OF_CONTENTS -->/,
    CONTENT_O_RE = /<!--- CONTENT -->/,
    CONTENT_C_RE = /<!--- \/CONTENT -->/;


// Table of content capture regex
var TABLE_RE =
  /<!--- TABLE_OF_CONTENTS -->(.|[\r\n])+<!--- \/TABLE_OF_CONTENTS -->/g;


// Contents capture regex
var CONTENT_RE = 
  /<!--- CONTENT -->(.|[\r\n])+<!--- \/CONTENT -->/g


/**
 * Helper function to get headers in url format for anchors
 * Example: Hello world?! -> hello-world
 *
 * @param header {string}
 * @return {string}
 */
function getUrlFormat (header){
  return (!header || typeof header !== 'string') ? '' : header
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/\-{2,}/g, '-')
    .replace(/^\-|\-$/, '')
    .replace(/[\-\*\+]\s/, '');
}


/**
 * Processes a file its content
 *
 * @param  orig_fn        {string}  The file we are processing
 * @param  file_data      {string}  File content in utf8 format
 * @param  cb             {function}
 * @return processed_file {string}
 */
module.exports = function processFile(orig_fn, file_data, cb){

  // File already processed?
  // Yes, return the error message so we can log about it
  // and stop executing for this file
  if(MA_PROCESSED_RE.test(file_data))
    return cb('Already processed file: ' + orig_fn);


  // Test for required comment tags
  var table_o = TABLE_O_RE.test(file_data),
      table_c = TABLE_C_RE.test(file_data),
      content_o = CONTENT_O_RE.test(file_data),
      content_c = CONTENT_C_RE.test(file_data);

  // If one or more of the required comment tags is/are not present
  // Log which one is missing, and stop processing the current md_file
  if(!table_o || !table_c || !content_o || !content_c)
    return cb(getCommentData(orig_fn, table_o, table_c, content_o, content_c));

  // Will hold the indentation level used, 2 or 4
  var indentation_used;

  var table_matches = TABLE_RE.exec(file_data),
      table,
      table_lines,
      content_matches = CONTENT_RE.exec(file_data),
      content,
      content_lines;

  // Were we able to extract the file_data with the regex?
  // If not log and stop processing the file
  if(!table_matches)   return cb(MSGS.no_table_re   + orig_fn);
  if(!content_matches) return cb(MSGS.no_content_re + orig_fn);

  table = table_matches[0];
  content = content_matches[0];

  // EDIT HERE, if not working cross platform consistently
  // Split up the file_data into an array of lines
  table_lines = table.split('\r\n');
  content_lines = content.split('\r\n');

  // Remove first element from line arrays
  table_lines.splice(0, 1);
  content_lines.splice(0, 1);

  // Remove last element from line arrays
  table_lines.splice(table_lines.length - 1, 1);
  content_lines.splice(content_lines.length - 1, 1);


  // Will hold all our headers as objects, these objects
  // can have properties which represent headers in them.
  var headers = [],
      sections = [],
      results = [],
      table_to_write = [],
      content_to_write = [];


  // Remove empty string or 1 space string from tables_lines array
  table_lines.forEach(function (table_line, i){
    if(table_line === '' || table_line === ' ')
      table_lines.splice(i, 1);
  });


  // Lets first loop through the lines,
  table_lines.forEach(function (table_line){

    var spaces = table_line.match(/^(\s+)/);

    // If there are no spaces as prefix, we're dealing with a setion header
    if(!spaces)
      headers.push(table_line);
  });


  // Create section objects
  headers.forEach(function (header, i){

    // If the header is an empty string, continue with next iteration
    if(header.length === 0) return false;

    // Where the headers start and stop
    var starts_at = table_lines.indexOf(header),
        stops_at = table_lines.indexOf(headers[i + 1]);

    // If at the last line, it stops at lines.length
    if(stops_at === -1) stops_at = table_lines.length;

    var subs = [];

    for(var for_i=starts_at+1; for_i<stops_at; for_i+=1)
      subs.push(table_lines[for_i]);
    
    sections.push({
      header: header,
      subs: subs
    });

  });

  // Finds out which indentation level is used and store in `indentation_used`
  sections.forEach(function (section){
    if(!section.subs[0]) return;

    var sub = section.subs[0],
        space_matches = sub.match(/^(\s+)/);

    if(!space_matches)
      return;
    else
      indentation_used = space_matches[0].length;
  });


  // Fix section subs
  sections.forEach(function (section){

    // Remove `* ` from header
    section.header = section.header.replace(/\*\s/, '');

    section.subs.forEach(function (sub, i){

      section.subs[i] = {
        // Remove list prefixes from sub
        header: sub.replace(/[\-\*\+]/, ''),

        // Get indentation level
        indentation: function (){
          var indent_matches = sub.match(/^(\s+)/);

          if(indent_matches)
            return indent_matches[0].length
          else
            return 0
        }()
      };

    });

  });

  // Create headers with anchor links
  sections.forEach(function (section){

    // Create a string formatted for an anchor link
    var anchor_link = getUrlFormat(section.header);

    // Set header to formatted anchor link
    section.anchor_header =
      '* [**' + section.header + '**](#' + anchor_link + ')';

    section.subs.forEach(function (sub){

      // Remove spaces, so we can add prefix and anchor link
      sub.header = sub.header.replace(/^(\s+)/, '');

      // Create a string formatted for an anchor link
      var sub_anchor_link = getUrlFormat(sub.header);

      // Re-add correct indentation with spaces
      var indentation = ''
      for(var i=0; i<sub.indentation; i+=1)
        indentation += ' ';

      // Set sub header to formatted anchor link
      sub.anchor_header = indentation
        + '* [' + sub.header + ']'
        + '(#' + sub_anchor_link + ')';
    });
  });


  // Create the table_to_write array
  sections.forEach(function (section){

    table_to_write.push(section.anchor_header);

    section.subs.forEach(function (sub){
      table_to_write.push(sub.anchor_header);
    });

  });

  // Lets start working on content_to_write
  sections.forEach(function (section, sections_i){

    // For section headers we use h2
    content_to_write.push('## ' + section.header);

    // Add #s to sub headers
    section.subs.forEach(function (sub){
      var indents = sub.indentation / indentation_used,
          hashtags = '##';

      for(var i=0; i<indents; i+=1)
        hashtags += '#';

      content_to_write.push(hashtags + ' ' + sub.header);
    });

    // Add line breaks between sections, if we're not at the last add hr
    if(sections_i < sections.length -1)
      content_to_write.push('\r\n---\r\n');
    //else
      //content_to_write.push('\r\n');
  });


  // Re-add comments
  table_to_write.unshift('<!--- TABLE_OF_CONTENTS -->\r\n');
  table_to_write.push('\r\n<!--- /TABLE_OF_CONTENTS -->');
  content_to_write.unshift('<!--- CONTENT -->\r\n');
  content_to_write.push('\r\n<!--- /CONTENT -->');
  
  // Add linebreaks between table and content
  //table_to_write.push('\r\n');

  // Create strings to write
  table_to_write = table_to_write.join('\r\n');
  content_to_write = content_to_write.join('\r\n');

  // Create single string of both table and content
  //combined_result = table_to_write + content_to_write;

  // Add to_write data to existing file_data
  file_data = file_data.replace(TABLE_RE, table_to_write);
  file_data = file_data.replace(CONTENT_RE, content_to_write);

  file_data += '\r\n\r\n' + '<!--- MA_PROCESSED -->';

  return cb(null, file_data);

};