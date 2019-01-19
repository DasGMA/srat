 // implement your API here
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

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
let code = 'AQCk2_gS8QmePWK3wzUR-sEs3K-7-MS7k4XlaEFvAdQoIOmEYDAdmTCNVtqJIg01I7qJOlf_PhbM91SOzj4fQG4YLoXwyojwU_oJtOUExZi4__-LkWziVfUevAPni-rmWqCl9d2wsoyuS81GPwWQQUHlYBueq6boKBy3WSiqt3nPwk-FaJ-to8v8F-7mjVyGpL-1YabSTIpLZpCvi1jnxuH_2IN96-yvsGw2NYkLZ0J728K-ZSTNSVn1';

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


// ############################################################ //
// keeping heroku awake by sending a request to app every 29 minutes

let http = require("http");
function ping() {
    http.get("https://testing-spotify-api.herokuapp.com/");
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
