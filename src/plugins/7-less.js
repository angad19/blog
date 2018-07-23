const fs = require('fs');
const { promisify } = require('util');
const less = require('less');
const path = require('path');

/**
 * lessC
 * Compile LESS stylesheets.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
async function lessC(posts, c) {
  try {
    const raw = await promisify(fs.readFile)(path.join(c.less, 'style.less'), 'utf-8');
    const css = await less.render(raw);
    await promisify(fs.writeFile)(path.join(c.build, 'assets/style.css'), css.css);
    
    console.log('Compiled LESS stylesheets');
    return posts;
  } catch(e) { return Promise.reject(e) }
}

module.exports = lessC;
