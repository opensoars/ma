var log = process.log,
    logErr = process.logErr;

var cls = process.cls;

var MSGS = process.MSGS;


/**
 * Logs about the presence of required comment tags
 *
 * @param fn  {string}  Name of file that is being processed
 * @param t_o {bool}    Data has table open?
 * @param t_c {bool}    Data has table close ?
 * @param c_o {bool}    Data has table open?
 * @param c_c {bool}    Data has table close?
 */
module.exports = function logCommentData(fn, t_o, t_c, c_o, c_c){
  logErr(MSGS.bad_tags + cls('`' + fn + '`', 'white'));
  log(
    'open  table of contents: ' + cls(t_o, (t_o ? 'green' : 'red') ),
    'close table of contents: ' + cls(t_c, (t_c ? 'green' : 'red') ),
    'open  content: ' + cls(c_o, (c_o ? 'green':'red') ),
    'close content: ' + cls(c_c, (c_c ? 'green' : 'red') )
  );
}