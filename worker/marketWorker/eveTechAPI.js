const axios = require('axios');
const ENDPOINTS = require('./EveAPIEndPoints')
const eveTechApi = axios.create({
    baseURL: 'https://esi.evetech.net/latest',
    method: 'get'
})

module.exports = {
    getFromEndPoint(endPoint) {
        return eveTechApi.get(endPoint)
        .then(data => data.data)
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    },

    async getCurrentPrices() {
        return this.getFromEndPoint(ENDPOINTS.getPrices());
    },

    async getItemFromTypeId(typeId) {
        return this.getFromEndPoint(ENDPOINTS.getTypeNames(typeId));
    }
};