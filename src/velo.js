'use strict';

function fetchStations() {
    return fetch("https://api.cyclocity.fr/contracts/nancy/gbfs/station_information.json")
    .then(response => response.json())
    .then(data => {
        return data.data.stations
    })
    .catch(error => console.error(error));
}

function fetchStationStatus(stationId) {
    return fetch("https://api.cyclocity.fr/contracts/nancy/gbfs/station_status.json")
    .then(response => response.json())
    .then(data => {
        return data.data.stations.find(station => station.station_id === stationId)
    })
    .catch(error => console.error(error));
}

export {
    fetchStations,
    fetchStationStatus
};
