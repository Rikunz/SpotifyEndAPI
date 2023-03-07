import { readFileSync, writeFileSync } from "fs";
import { join, resolve } from 'path';

function syncWriteFile(filename: string, data: any) {
    writeFileSync(join(__dirname, filename), data, {
        flag: 'w',
    });

    const contents = readFileSync(join(__dirname, filename), 'utf-8');

    return contents;
}

function wait(ms: number) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
};


function readDataJSON(json: any) {
    wait(1000);
    return JSON.parse(readFileSync(join(__dirname, json), 'utf-8'));
};

interface track {
    artist: string;
    id: string;
    link: string;
    nama: string;
}

//Function
async function get_curent_track(token: string) {
    try {
        let response = await fetch('https://api.spotify.com/v1/me/player', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        const artist = data.item.artists;
        const artists = artist[0];
        const artists_name = artists.name;
        const curent_track: track = {
            artist: artists_name,
            id: data.item.id,
            link: data.item.external_urls.spotify,
            nama: data.item.name
        };
        syncWriteFile('./curentPlay.json', JSON.stringify(curent_track, null, 4));
        console.log(curent_track);
    } catch (e) {
        console.error(e)
    } finally {

    }
}

//Declare Variable
const generateToken = require('test');
generateToken();
var data = readDataJSON('data.json');
var token = data.body['access_token'];
get_curent_track(token);
