const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const front = require('front-matter');
const Post = require('../Post');

/**
 * getPosts
 * Generate post objects from HTML files.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function getPosts(posts, c) {
	return new Promise(async function (resolve, reject) {
		try {
			posts = [];
			
			const pList = await promisify(fs.readdir)(c.posts);
			for(let pPath of pList) {
				// Read file
				const raw = await promisify(fs.readFile)(path.join(c.posts, pPath), 'utf-8');
				// Parse front matter
				const fm = front(raw);

				// Generate post object and push to posts array
				posts.push(new Post(fm));
			}
			
			// Sort posts
			posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			
			console.log('Retrieved posts');
			resolve(posts);
		} catch(e) { reject(e) }
	});
}

module.exports = getPosts;
