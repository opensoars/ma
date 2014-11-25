var fs = require('fs');

var logCommentData = require(process.LIB + 'logCommentData.js');

var log = process.log,
    logWarn = process.logWarn,
    logErr = process.logErr;


// Regex used for testing required comments
var TABLE_O_RE = /<!--- TABLE_OF_CONTENTS -->/,
    TABLE_C_RE = /<!--- \/TABLE_OF_CONTENTS -->/,
    CONTENT_O_RE = /<!--- CONTENT -->/,
    CONTENT_C_RE = /<!--- \/CONTENT -->/;


// Table of content capture regex
var T_O_C_RE =
  /<!--- TABLE_OF_CONTENTS -->(.|[\r\n])+<!--- \/TABLE_OF_CONTENTS -->/g;


// Contents capture regex
var C_RE = 
  /<!--- CONTENT -->(.|[\r\n])+<!--- \/CONTENT -->/g


/**
 * Processes a file its content
 *
 * . . . . . . .
 *
 * @param fn   {string}  The file we are processing
 * @param data {string}  File content in utf8 format
 */
module.exports = function processFile(fn, data){

  // Test for required comment tags
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

  // Were we able to extract the data with the regex?
  // If not log and stop processing the file
  if(!table_matches)   return logErr(no_table_re   + fn);
  if(!content_matches) return logErr(no_content_re + fn);

  table = table_matches[0];
  content = content_matches[0];

  // EDIT HERE, if not working cross platform consistently
  // Split up the data into an array of lines
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
          return sub.match(/^(\s+)/)[0].length;
        }()
      }

    });

  });

  // Create headers with anchor links
  sections.forEach(function (section){

    // Create a string formatted for an anchor link
    var anchor_link = section.header
      .replace(/\s/g, '-')
      .replace(/\./g, '')
      .toLowerCase();

    // Set header to formatted anchor link
    section.anchor_header =
      '* [**' + section.header + '**](#' + anchor_link + ')';

    section.subs.forEach(function (sub){

      // Remove spaces, so we can add prefix and anchor link
      sub.header = sub.header.replace(/^(\s+)/, '');

      // Create a string formatted for an anchor link
      var sub_anchor_link = sub.header
        .replace(/\s/g, '-')
        .replace(/\./g, '')
        .toLowerCase();

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


  // Create the table to write array
  sections.forEach(function (section){

    table_to_write.push(section.anchor_header);

    section.subs.forEach(function (sub){
      table_to_write.push(sub.anchor_header);
    });

  });

  // Lets start working on content
  sections.forEach(function (section){

    // For section headers we use h2
    content_to_write.push('## ' + section.header);

    // Add h's to sub headers
    section.subs.forEach(function (sub){
      switch(sub.indentation){
        case 2: content_to_write.push('### ' + sub.header);    break;
        case 4: content_to_write.push('#### ' + sub.header);   break;
        case 6: content_to_write.push('##### ' + sub.header);  break;
        case 8: content_to_write.push('###### ' + sub.header); break;
      }
    });

    // Add (line) breaks between sections
    content_to_write.push('\r\n---\r\n')
  });


  // Add linebreaks between table and content
  table_to_write.push('\r\n\r\n---\r\n\r\n\r\n');

  // Create strings to write
  table_to_write = table_to_write.join('\r\n');
  content_to_write = content_to_write.join('\r\n');

  // Create single string of both table and content
  combined_result = table_to_write + content_to_write;


  // Write to test file
  var combined_file_name = 'test_result.md';

  fs.writeFile(combined_file_name, combined_result, function (err){
    if(err) return logErr('Could not write ' + combined_file_name, err);
    log('Wrote ' + combined_file_name)
  });

};