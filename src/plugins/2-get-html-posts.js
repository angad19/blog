const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const front = require('front-matter');
const Post = require('../Post');

/**
 * getHTMLPosts
 * Generate post objects from HTML files.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
async function getHTMLPosts(posts, c) {
	try {
		let pList = await promisify(fs.readdir)(c.posts);
		pList = pList.filter(p => {
			return path.extname(p) == '.html' || path.extname(p) == '.html';
		})
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
		console.log('Retrieved HTML posts');
		return posts;
	} catch(e) { return Promise.reject(e) }
}

module.exports = getHTMLPosts;
