const fs = require('fs');
const { promisify } = require('util');
const ejs = require('ejs');
const path = require('path');

/**
 * renderHome
 * Render homepage.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function renderHome(posts, c) {
	return new Promise(async function (resolve, reject) {
		try {
			let displayedPosts = posts.filter(post => {
				return post.hasOwnProperty('display') ? post.display : true;
			});

			const html = await promisify(ejs.renderFile)(path.join(c.templates, 'home.ejs'), { title: 'Angad Singh\'s Blog', posts: displayedPosts});
			await promisify(fs.writeFile)(path.join(c.build, 'index.html'), html);

			console.log('Rendered homepage');
			resolve(posts);
		} catch(e) { reject(e) }
	});
}

module.exports = renderHome;
