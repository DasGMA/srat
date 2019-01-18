const SpotifyWebApi = require('spotify-web-api-node');


// Run node getcode.js and follow the link in the console. Will redirect to the spotify account authentification and copy the code from url adress up until &scope....

var scopes = ['user-read-private', 'user-read-email'],
  redirectUri = 'http://localhost:8888/callback',
  clientId = '63881124054e49d9a64b354c370d19cc',
  state = 'State';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);