 // implement your API here
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');


const server = express();

server.use(express.json());
server.use(cors());


server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let spotifyApi = new SpotifyWebApi({
  clientId: '63881124054e49d9a64b354c370d19cc',
  clientSecret: '2f160adb68b049d4953218e7c5d11005',
  redirectUri: 'https://testing-spotify-api.herokuapp.com/callback'
});


// The code that's returned as a query parameter to the redirect URI
let code = 'AQBhTOTrWYSM8xZ1Ymdx2V9HIO7tEWEMBs5YmEGiiM8oDjlG-UVeokaeWu1fgh9OqwPjXdzsFS_p5tEmSlmq1VvLLHd0HVWeWOKBJ41I8RxlSxzqcgu_dvy0dF8AMkxBxFIKkD1aaIc6ouRvmFur9i49LGrihpwVAcjUJcPLmgRrZZ1QyXq83Gbs5rhq7SZvFR0cL8zCfJc7-kO_NHEEoAZ39SWgT72M1GCVsTQmhoSU-E2GFkQShcxixzbtmFV52QjWUrekfwd2dBtOFq4';

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
setInterval(timer, 3590000);


// ############################################################ //
// keeping heroku awake by sending a request to app every 29 minutes

let https = require("https");
function ping() {
    https.get("https://testing-spotify-api.herokuapp.com/");
    console.log('Ping is sent.');
};

setInterval(ping, 1740000); // every 29 minutes

// ############################################################ //

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




server.listen(process.env.PORT || 8888, function(){
  console.log('Your node js server is running');
});


// https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?country=US
