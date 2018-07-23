const org = require('org');

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0)
  {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

function OrgPost(parsed) {
  this.title = parsed.title;
  this.date = parsed.directiveValues.date;
  this.fdate = new Date(this.date);
  this.pdate = this.fdate.getFullYear() + '-' + zeroFill(this.fdate.getMonth() + 1, 2) + '-' + zeroFill(this.fdate.getDate(), 2);
  this.author = parsed.hasOwnProperty('author') ? parsed.author : 'Angad Singh';
  this.filename = parsed.directiveValues.hasOwnProperty('url') ? this.pdate + '-' + parsed.directiveValues.url + '.html' : this.pdate + '-' + this.title.toLowerCase().replace(' ', '-') + '.html';
  this.filename = parsed.directiveValues.hasOwnProperty('permalink') ? parsed.directiveValues.permalink + '.html' : this.filename;
  this.content = parsed.convert(org.ConverterHTML, {
    headerOffset: 1,
    exportFromLineNumber: false,
    suppressSubScriptHandling: false,
    suppressAutoLink: false
  }).contentHTML;
  this.display = parsed.directiveValues.hasOwnProperty('display') ? parsed.directiveValues.display : true;
  this.display = this.display == 'true';
}

module.exports = OrgPost;
