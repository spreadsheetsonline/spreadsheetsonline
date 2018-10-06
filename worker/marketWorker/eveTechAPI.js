const axios = require('axios');
const eveTechApi = axios.create({
    baseURL: 'https://esi.evetech.net/',
    method: 'get',
    transformResponse: [(data) => data.data]

})

module.exports = {
    getFromEndPoint(endPoint) {
        return axios.get().catch(function (error) {
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
    }    
}