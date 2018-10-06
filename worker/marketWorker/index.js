const endPoints = require('./EveAPIEndPoints.js');
const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');


async function getItems() {
    const prices = await eveTechAPI.getCurrentPrices();
    
    return Promise.all(await prices.map(async (item) => {
        let data = await eveTechAPI.getItemFromTypeId(item.type_id);

        if(data) {
            try {
                data.dogma_attributes = JSON.stringify(data.dogma_attributes);
            } catch (err) {
                console.log(err);
            }
        }

        return { ...data, average_price: item.average_price, adjusted_price: item.adjusted_price };
    }))
}


async function addItems(items) {
    for (let i in items) {
        console.log(items[i])
        try {
            dbTools.addItem(items[i]);
            console.log('added ', items[i].name)
        } catch (e) {
            console.log(e);
            return
        }
    }
    return;
}

async function app() {
    const items = await getItems();
    addItems(items)
}

app();