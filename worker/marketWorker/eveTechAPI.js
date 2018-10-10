const axios = require('axios');
const ENDPOINTS = require('./EveAPIEndPoints')
const eveTechApi = axios.create({
    baseURL: 'https://esi.evetech.net/latest',
    method: 'get'
})


function handleAxiosError(error) {
    if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    } else if (error.request) {
        console.error(error.request);
    } else {
        console.error('Error', error.message);
    }
    console.error(error.config);
    return error
}

function getFromEndPoint(endPoint) {
    return eveTechApi.get(endPoint)
    .then(data => data.data)
    .catch(handleAxiosError);
}


module.exports = {
    getCurrentPrices() {
        return getFromEndPoint(ENDPOINTS.getPrices());
    },

    getItemFromTypeId(typeId) {
        return getFromEndPoint(ENDPOINTS.getTypeNames(typeId));
    },

    getMarketGroup() {
        return getFromEndPoint(ENDPOINTS.getTypeNames(typeId))
    }
};