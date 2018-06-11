const fs = require('fs');
const { promisify } = require('util');
const RSS = require('rss');
const path = require('path');

const feed = new RSS({
	title: 'Angad Singh',
	feed_url: 'http://angadsingh.me/feed.xml/',
	site_url: 'http://angadsingh.me/'
});

/**
 * RSSfeed
 * Generate RSS feed
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
function RSSfeed(posts, c) {
	return new Promise(async function (resolve, reject) {
		try {
			for(let post of posts) {
				feed.item({
					title: post.title,
					description: post.content.slice(0, 50),
					guid: new Date(post.date).getTime(),
					date: post.date
				});
			}

			const xml = feed.xml({ indent: true });
			await promisify(fs.writeFile)(path.join(c.build, 'feed.xml'), xml);
			
			console.log('Generated RSS feed');
			resolve(posts);
		} catch(e) { reject(e) }
	});
}

module.exports = RSSfeed;
