const axios = require('axios');
const ENDPOINTS = require('./EveAPIEndPoints')
const eveTechApi = axios.create({
    baseURL: 'https://esi.evetech.net/',
    method: 'get',
    transformResponse: [(data) => data.data]
})

module.exports = {
    async getFromEndPoint(endPoint) {
        return axios.get(endPoint).catch(function (error) {
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
        return await getFromEndPoint(ENDPOINTS.getCurrentPrices())
    },

    getItemFromTypeId: async (typeId) => {
        return await getFromEndPoint(ENDPOINTS.getTypeNames(typeId))
    }
}