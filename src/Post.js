function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0)
	{
		return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + ""; // always return a string
}

function Post(fm) {
	this.title = fm.attributes.title;
	this.date = fm.attributes.date;
	this.fdate = new Date(this.date);
	this.pdate = this.fdate.getFullYear() + '-' + zeroFill(this.fdate.getMonth() + 1, 2) + '-' + zeroFill(this.fdate.getDate(), 2);
	this.author = fm.attributes.hasOwnProperty('author') ? fm.attributes.author : 'Angad Singh';
	this.filename = fm.attributes.hasOwnProperty('url') ? this.pdate + '-' + fm.attributes.url + '.html' : this.pdate + '-' + this.title.toLowerCase().replace(' ', '-') + '.html';
	this.content = fm.body;
}

module.exports = Post;
