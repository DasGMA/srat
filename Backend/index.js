 // implement your API here
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const server = express();

server.use(express.json());
server.use(cors());

  let spotifyApi = new SpotifyWebApi({
    clientId: '63881124054e49d9a64b354c370d19cc',
    clientSecret: '2f160adb68b049d4953218e7c5d11005',
    redirectUri: 'http://localhost:8888/callback'
  });


// The code that's returned as a query parameter to the redirect URI
let code = 'AQD9skDF0GKS20zDMqPN40Urckn6CfbkD06dL7GgDI9ZuzCzBhgppjrdxxXcvu4x3_EghSMMTuQh7P_ZpR0KtTzKUIEV-XotUj_d5XAHSGZOXbhy26rEE4OFX8i053mEZNYFYMLXq0Bv6cjpFioApRulaUt6Ee7VqN_2EMWdmtgJ8EFpPxAN3teAdGV-6GgsrNqpYS7u6RKFyaLLOviWdTuk-DHbOY1nUgbCTNM34rwUP8ZpQs0NdTOm';

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code).then(
  function(data) {

    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

function timer() {
  
  spotifyApi.refreshAccessToken().then(
    function(data) {
      
      spotifyApi.setAccessToken(data.body['access_token']);
      
      spotifyApi.getAccessToken(data.body['acces_token']);
      
      console.log('The new access token is ' + data.body['access_token']);

      },
      function(err) {
        console.log('Could not refresh the token!', err);
      }
    );
};
setInterval(timer, 3600000);


server.get('/albums', (req, res) => {
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      const albums = data.body;
      res.status(200).json(albums);
      console.log('Artist albums', albums);
    },
    function(err) {
      res.status(err.code);
      res.send(err.message);
      console.error(err);

    }
  );
})


server.listen(8888, () => console.log('API running on port 8888'));


// https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?country=US
