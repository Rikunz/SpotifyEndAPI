import { readFileSync, writeFileSync } from "fs";
import { join } from 'path';


var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: 'http://localhost:4000/callback',
});



function syncWriteFile(filename: string, data: any) {
    writeFileSync(join(__dirname, filename), data, {
        flag: 'w',
    });

    const contents = readFileSync(join(__dirname, filename), 'utf-8');

    return contents;
}

spotifyApi.clientCredentialsGrant().then(
    function (data: any) {
        spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(data.body['access_token']);
        syncWriteFile('./data.json', JSON.stringify(data, null, 4));
        console.log(data)
    }, function (err: any) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);




