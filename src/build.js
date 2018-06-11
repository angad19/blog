/**
 * Build Script
 */

const fs = require('fs');
const c = require('../config');
const path = require('path');
const { promisify } = require('util');

module.exports = async function() {
	try {
		// Read posts.json
		let posts = JSON.parse(await promisify(fs.readFile)('./posts.json', 'utf-8'));

		/**
		 * Run plugins
		 */
		// Get all plugins
		let plugins = await promisify(fs.readdir)('./src/plugins')
		plugins = plugins.filter(file => path.extname(file) === '.js');

		// Run plugins
		for(let i in plugins) {
			posts = await require('./plugins/' + plugins[i])(posts, c);
		}

		await promisify(fs.writeFile)('posts.json', JSON.stringify(posts, null, '\t'));
	} catch(e) {
		console.error(e);
	}
} 
