node-gdata-oauth2
==========

Version 0.1.0

A Google Data API client for node.js and OAuth 2.0. Only the latest release (version 3)
of the GData protocol supported.

Install
-------

    npm install gdata

Requirements
------------

* [node-oauth](https://github.com/ciaranj/node-oauth)

Example (Picasa Web Albums)
---------------------------

    var GDClient = require('node-gdata').GDClient;
    var PICASA_ALBUMS_URL = 'https://picasaweb.google.com/data/feed/api/user/default';

    var google = new GDClient('consumer key', 'consumer secret');

    // call setAccessToken() once have obtained a OAuth 2.0 access token
    google.setAccessToken('token');

    google.get(PICASA_ALBUMS_URL, function(err, feed) {
      feed.getEntries().forEach(function(entry) {
        console.log('album: ' + entry.getTitle());
      });
    });