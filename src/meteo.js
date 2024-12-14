'use strict';
import { getIp } from "./ip.js";

async function fetchMeteo() {
    const infos = await getIp();
    return fetch(`https://www.infoclimat.fr/public-api/gfs/json?_ll=${infos.loc}&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2`)
        .then(response => response.json())
        .then(data => {
            return data
        });
}

function getWeatherEmoji(weather) {
    if (weather.pluie > 0) {
        return '🌧️';
    } else if (weather.nebulosite.totale > 50) {
        return '☁️';
    } else {
        return '☀️';
    }
}

async function displayMeteo(meteo) {
    console.log(meteo);
    const meteoContainer = document.getElementById('meteoContainer');
    const timesOfDay = ['Matin', 'Midi', 'Après-midi', 'Soir'];
    const meteoData = Object.values(meteo).slice(5, 9);
    console.log(meteoData);

    meteoContainer.innerHTML = meteoData.map((weather, index) => `
        <div>
            <h3>${timesOfDay[index]}</h3>
            <p>${getWeatherEmoji(weather)}</p>
            <p>🌡️${(weather.temperature['2m'] - 273.15).toFixed(2)}°C</p>
            <p>💧${weather.humidite['2m']}%</p>
            <p>🌬️${weather.vent_moyen['10m']} m/s</p>
        </div>
    `).join('');
}

export {
    fetchMeteo,
    displayMeteo
};
