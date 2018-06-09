const trash = require('trash');
const fs = require('fs');
const { promisify } = require('util');
const ncp = promisify(require('ncp'));

/**
 * renderPosts
 * Render static post pages.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function renderPosts(posts, c) {
	return new Promise((resolve, reject) => {

			//.catch(e => reject(e))
	});
}

module.exports = renderPosts;
