const trash = require('trash');
const fs = require('fs');
const { promisify } = require('util');
const ncp = promisify(require('ncp'));
const path = require('path');

/**
 * clean
 * Clean public directory.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
async function clean(posts, c) {
  try {
    // Delete build directory
    await trash(c.build);
    console.log('Build directory deleted.');
    // Create new public directory
    await promisify(fs.mkdir)(c.build);
    console.log('New build directory created');
    // Copy assets directory
    await ncp(c.assets, path.join(c.build, 'assets'));
    console.log('Assets directory copied')
    return posts;
  } catch(e) { return Promise.reject(e) }
}

module.exports = clean;
