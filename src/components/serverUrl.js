// change var for local or hosted

function serverUrl(entity) {
    //const baseUrl = 'https://cs340-mafia-server.herokuapp.com/' + entity;
    const baseUrl = 'http://localhost:8000/' + entity;
    return baseUrl;
}

export default serverUrl;
