'use strict';
function fetchSarsCov2Data(page = 1, page_size = 20) {
    const url = `https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=${page}&page_size=${page_size}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data.data.map(item => ({
                semaine: item.semaine,
                MAXEVILLE: item.MAXEVILLE
            }));
            // console.log(data);
        })
        .catch(error => {
            return [];
        });
}

async function fetchAllSarsCov2Data() {
    let result = [];
    let i = 1;
    while (true) {
        const data = await fetchSarsCov2Data(i);
        if (data.length === 0) {
            break;
        }
        result = result.concat(data);
        i++;
    }
    return result;
}

export {
    fetchSarsCov2Data,
    fetchAllSarsCov2Data
};
