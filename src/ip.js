'use strict';

function getIp() {
    return fetch("https://ipinfo.io/json")
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => console.error(error));
}

export {
    getIp,
};
