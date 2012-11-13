/**
* entry.js
* A GData Entry
*
* @author Amir Malik
*/

function Entry(entry) {
  this.entry = entry;

  if(entry)
    this._init();
}

Entry.prototype._init = function _init() {
  var self = this;
  var selfId;
  var subFeedId;
  var parentId;

  // type of entry
  if (typeof(this.entry['category']) != "undefined") {
    this.entry['category'].forEach(function(category) {
      if('http://schemas.google.com/g/2005#kind' == category['scheme']) {
        self.kind_uri = category['term'];
      }
    });
  };

  // parent folder
  if (typeof(this.entry['link']) != "undefined") {
    this.entry['link'].forEach(function(link) {
      switch(link['rel']) {
        case 'self':
          selfId = link['href'];
          break;

        case 'http://schemas.google.com/g/2005#feed':
          subFeedId = link['href'];
          break;

        case 'http://schemas.google.com/docs/2007#parent':
          parentId = link['href'];
          break;
      }
    });
  };

  if(subFeedId)
    this.feed_url = subFeedId;
};

Entry.prototype.getEtag = function getEtag() {
  return this.entry['gd$etag'];
};

Entry.prototype.getTitle = function getTitle() {
  return this.entry['title']['$t'];
};

Entry.prototype.getPublishedDate = function getPublishedDate() {
  return new Date(Date.parse(this.entry['published']['$t']));
};

Entry.prototype.getUpdateDate = function getUpdateDate() {
  return new Date(Date.parse(this.entry['updated']['$t']));
};

Entry.prototype.getId = function getId() {
  return this.entry['id']['$t'];
};

Entry.prototype.getIdShort = function getIdShort() {
  return this.entry['id'];
};

Entry.prototype.getFeedURL = function getFeedURL() {
  return this.feed_url;
};

Entry.prototype.getResourceId = function getResourceId() {
  return this.entry['gd$resourceId']['$t'];
};

Entry.prototype.getKind = function getKind() {
  return this.kind_uri;
};

Entry.prototype.getHtmlLink = function getHtmlLink() {
  return this.entry['htmlLink'];
};

Entry.prototype.getSummary = function getSummary() {
  return this.entry['summary'];
};

Entry.prototype.getStartTime = function getStartTime() {
  return this.entry['start']['dateTime'];
};

Entry.prototype.getEndTime = function getEndTime() {
  return this.entry['end']['dateTime'];
};

Entry.prototype.getLocation = function getLocation() {
  return (this.entry['location'] || '');
};

Entry.prototype.getICalUID = function getICalUID() {
  return this.entry['iCalUID'];
};

Entry.prototype.getRecipientEmails = function getRecipientEmails() {
  var emails = [];
  if (typeof(this.entry['attendees']) != "undefined") {
    this.entry['attendees'].forEach(function(attendee) {
      emails.push(attendee['email']);
    });
  }
  emails.splice(emails.indexOf(this.entry['creator']['email']), 1);
  return emails;
};

Entry.prototype.getSenderEmail = function getSenderEmail() {
  var email = (this.entry['creator']['email'] || this.entry['organizer']['email']);
  return email;
};


exports.Entry = Entry;
