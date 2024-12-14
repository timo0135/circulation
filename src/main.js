'use strict';
import { initCarte, displayStations } from './carte.js';
import { fetchAllSarsCov2Data } from "./covid.js";
import { createChart } from "./chart.js";
import { fetchAirQualityByDate, displayAirQuality } from "./qualite.js";
import {displayMeteo, fetchMeteo} from "./meteo.js";

window.addEventListener('load', async () => {
    const data = await fetchAllSarsCov2Data();
    createChart(data);
    const date = Date.now();
    const airQuality = await fetchAirQualityByDate(date);
    displayAirQuality(airQuality);
    const meteo = await fetchMeteo();
    displayMeteo(meteo);
    const map = await initCarte();
    await displayStations(map);
});


