/**
 * Build Script
 */

const fs = require('fs');
const c = require('../config');
const path = require('path');
const { promisify } = require('util');

module.exports = async function() {
	try {
		let posts = [];

		/**
		 * Run plugins
		 */
		// Get all plugins
		let plugins = await promisify(fs.readdir)('./src/plugins')
		plugins = plugins.filter(file => path.extname(file) === '.js');

		// Run plugins
		for(let plugin of plugins) {
			posts = await require('./plugins/' + plugin)(posts, c);
		}

		// Write posts to file
		await promisify(fs.writeFile)('posts.json', JSON.stringify(posts, null, '\t'));
	} catch(e) {
		console.error(e);
	}
} 
