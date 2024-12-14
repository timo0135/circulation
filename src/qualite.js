'use strict';

function fetchAirQuality() {
    return fetch("https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=")
    .then(response => response.json())
    .then(data => {
        return data.features
    })
    .catch(error => console.error(error));
}

function fetchAirQualityByDate(date) {
    return fetch(`https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`)
        .then(response => response.json())
        .then(data => {
            const targetTimestamp = new Date(date).getTime();
            let closestFeature = null;
            let smallestDifference = Infinity;
            data.features.forEach(feature => {
                const featureTimestamp = new Date(feature.attributes.date_ech / 1000).getTime();
                const difference = Math.abs(targetTimestamp - featureTimestamp);

                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    closestFeature = feature;
                }
            });
            return closestFeature;
        })
        .catch(error => console.error(error));
}

function displayAirQuality(airQuality) {
    const airQualityContainer = document.getElementById('airQualityContainer');
    airQualityContainer.innerHTML = `
        <div style="background-color: ${airQuality.attributes.coul_qual}; padding: 10px; border-radius: 5px;">
            <h2>La qualité de l'air à ${airQuality.attributes.lib_zone}</h2>
            <p><strong>Qualité:</strong> ${airQuality.attributes.lib_qual}</p>
            <p><strong>Code postal :</strong> ${airQuality.attributes.code_zone}</p>
            <p><strong>Source:</strong> ${airQuality.attributes.source}</p>
        </div>
    `;
}

export {
    fetchAirQuality,
    fetchAirQualityByDate,
    displayAirQuality
};
