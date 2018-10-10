const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');
const Bottleneck = require('bottleneck');
const aigle = require('aigle');

const rateLimiter = new Bottleneck({ maxConcurrent: 5, minTime: 100 });

async function addIfDoesNotExist(price) {
    let {type_id, average_price, adjusted_price} = price
    let itemQueryResult = await dbTools.findBy('items', 'type_id', type_id)
    if (itemQueryResult.length === 0) {
        let itemMeta = await eveTechAPI.getItemFromTypeId(type_id);

        itemMeta.dogma_attributes = JSON.stringify(itemMeta.dogma_attributes)
        itemMeta.dogma_effects = JSON.stringify(itemMeta.dogma_effects)
        itemMeta.mass = 0

        let itemFinalForm = {...itemMeta, average_price: Math.floor(average_price) || null, adjusted_price: Math.floor(adjusted_price) || null}
        return await dbTools.addItem(itemFinalForm)
    } else {
        console.log(type_id, 'was in the db already')
        return
    }

}

async function getItems() {
    const prices = await eveTechAPI.getCurrentPrices();

    let results = await aigle.map(prices, price => {
        return rateLimiter.schedule(() => {
            return addIfDoesNotExist(price);
        })
    })

    console.log(results, "results");
    return results;
}

function getGroup() {
    

}



async function app() {
    return await getItems();
}

app();