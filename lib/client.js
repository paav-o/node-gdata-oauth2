/**
 * client.js
 * Google Data API client
 *
 * @author Amir Malik
 */

var querystring = require('querystring'),
    OAuth2      = require('oauth').OAuth2;

var Feed = require('./feed').Feed;

var GDClient = function(client_id, client_secret) {
  this.clientId = client_id;
  this.clientSecret = client_secret;
  this.access_token = undefined;
  this.oauth = new OAuth2(client_id, client_secret, 'https://www.googleapis.com');
  //this.oauth._headers['GData-Version'] = '3.0'; // HACK
};

GDClient.prototype.setAccessToken = function setAccessToken(token) {
  this.access_token = token;
};

GDClient.prototype.get = function get(url, optargs, cb) {
  if(typeof optargs == 'function') cb = optargs, optargs = {};

  // always request JSON output instead of XML
  // TODO: try adding header: Accept: application/json to force JSON
  if(!optargs.raw && url.lastIndexOf('alt=json') == -1) {
    if(url.lastIndexOf('?') > -1) {
      url += '&alt=json&v=3.0';
    } else {
      url += '?alt=json&v=3.0';
    }
  }

  var token = optargs.token || this.access_token;

  this.oauth.get(url, token, function(err, data, res) {
    if(err) {
      cb(err);
    } else {
      try {
        if(optargs.raw) cb(null, data, res);
        else cb(null, new Feed(JSON.parse(data)), res);
      } catch(e) {
        cb(e);
      }
    }
  });
};

exports.GDClient = GDClient;
