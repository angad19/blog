const fs = require('fs');
const { promisify } = require('util');
const ejs = require('ejs');
const path = require('path');

/**
 * renderPosts
 * Render static post pages.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
async function renderPosts(posts, c) {
  try {
    await promisify(fs.mkdir)(path.join(c.build, 'posts'));
      
      for(let post of posts) {
        const html = await promisify(ejs.renderFile)(path.join(c.templates, 'post.ejs'), {post: post})
        await promisify(fs.writeFile)(path.join(c.build, 'posts', post.filename), html);
      }

      console.log('Rendered posts');
      return posts;
  } catch(e) { return Promise.reject(e); }
}

module.exports = renderPosts;
