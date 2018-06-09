const fs = require('fs');
const { promisify } = require('util');
const RSS = require('rss');
const path = require('path');

/**
 * feed
 * Generate RSS feed
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function feed(posts, c) {
	return new Promise(async function (resolve, reject) {
		try {
			
			
			
			console.log('Generated RSS feed');
			resolve(posts);
		} catch(e) { reject(e) }
	});
}

module.exports = feed;
