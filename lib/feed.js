/**
* feed.js
* A GData Feed
*
* @author Amir Malik
*/

var Entry = require('./entry').Entry;

function Feed(feed) {

  this.feed = feed;
  this.entries = [];

  if(this.feed['items']) {
    for(var i = 0; i < this.feed['items'].length; i++) {
      this.entries.push(new Entry(this.feed['items'][i]));
    }
  }
}

Feed.prototype.getUpdateDate = function getUpdateDate() {
  return this.last_update;
};

Feed.prototype.getEntries = function getEntries(i) {
  if(i)
    return this.entries[i];
  else
    return this.entries;
};

Feed.prototype.count = function count() {
  return this.entries.length;
};

exports.Feed = Feed;
