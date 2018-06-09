const fs = require('fs');
const { promisify } = require('util');
const ejs = require('ejs');
const path = require('path');

function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0)
	{
		return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + ""; // always return a string
}

/**
 * renderPosts
 * Render static post pages.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function renderPosts(posts, c) {
	return new Promise(async function (resolve, reject) {
		try {
			await promisify(fs.mkdir)(path.join(c.build, 'posts'));
			
			for(let i in posts) {
				posts[i].fdate = new Date(posts[i].date);
				posts[i].pdate = posts[i].fdate.getFullYear() + '-' + zeroFill(posts[i].fdate.getMonth() + 1, 2) + '-' + zeroFill(posts[i].fdate.getDate(), 2);
				posts[i].filename = posts[i].pdate + '-' + posts[i].title.toLowerCase().replace(' ', '-') + '.html';

				const html = await promisify(ejs.renderFile)(path.join(c.templates, 'post.ejs'), {post: posts[i]})
				await promisify(fs.writeFile)(path.join(c.build, 'posts', posts[i].filename), html);
			}

			console.log('Rendered posts');
			resolve(posts);
		} catch(e) { reject(e) }
	});
}

module.exports = renderPosts;
