var cls = process.cls,
    MSGS = process.MSGS;


/**
 * Logs about the presence of required comment tags
 *
 * @param fn  {string}  Name of file that is being processed
 * @param t_o {bool}    Data has table open?
 * @param t_c {bool}    Data has table close ?
 * @param c_o {bool}    Data has table open?
 * @param c_c {bool}    Data has table close?
 * @return    {string}  Msg to logErr
 */
module.exports = function getCommentData(fn, t_o, t_c, c_o, c_c){

  return ''
    + cls(MSGS.bad_tags, 'red') + '`' + fn + '`\n'
    + '     open  table of contents: ' + cls(t_o, t_o ? 'green' : 'red') + '\n'
    + '     close table of contents: ' + cls(t_c, t_c ? 'green' : 'red') + '\n'
    + '     open  content: ' + cls(c_o, c_o ? 'green':'red') + '\n'
    + '     close content: ' + cls(c_c, c_c ? 'green' : 'red') + '\n';

};