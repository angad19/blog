const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const org = require('org');
const orgParser = new org.Parser();
const OrgPost = require('../OrgPost');

/**
 * getOrgPosts
 * Generate post objects from org files.
 * @param {array} posts An array of post objects.
 * @param {object} c User config
 */
async function getOrgPosts(posts, c) {
  try {
    let pList = await promisify(fs.readdir)(c.posts);
    pList = pList.filter(p => {
      return path.extname(p) == '.org';
    })
    for(let pPath of pList) {
      // Read file
      const raw = await promisify(fs.readFile)(path.join(c.posts, pPath), 'utf-8');
      // Parse org-files
      const parsed = orgParser.parse(raw);
      // Generate post object and push to posts array
      // console.log(new OrgPost(parsed));
      posts.push(new OrgPost(parsed));
    }
    // Sort posts
    posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log('Retrieved HTML posts');
    return posts;
  } catch(e) { return Promise.reject(e) }
}

module.exports = getOrgPosts;

