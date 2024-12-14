import { getIp } from "./ip.js";
import { fetchStations, fetchStationStatus} from "./velo.js";

async function initCarte(){
    const infos = await getIp();
    const lat = infos.loc.split(',')[0];
    const lon = infos.loc.split(',')[1];
    var map = L.map('map').setView([lat, lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return map;
}

async function displayStations(map){
    const stations = await fetchStations();
    stations.forEach(async station => {
        const status = await fetchStationStatus(station.station_id);
        const marker = L.marker([station.lat, station.lon]).addTo(map);
        marker.bindPopup(`<b>${station.name}</b><br>${station.address}<br>Capicité : ${station.capacity}<br>Vélos disponibles : ${status.num_bikes_available}<br>Emplacements disponibles : ${status.num_docks_available}`);
    });
}

export {
    initCarte,
    displayStations
}
