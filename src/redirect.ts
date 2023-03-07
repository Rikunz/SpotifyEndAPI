async function get_curent_track() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer('ClientID' + ':' + 'Secret').toString('base64'))
        },
    });
    const data = await response.json()
    console.log(data);
}

get_curent_track();
