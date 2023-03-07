async function get_curent_track() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer('5bb41046b4274f9eb53486c7315cede8' + ':' + 'd4fe42cccc1d4ba48cda568eb4ad2dde').toString('base64'))
        },
    });
    const data = await response.json()
    console.log(data);
}

get_curent_track();