const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');
const Bottleneck = require('bottleneck');
const aigle = require('aigle');

const rateLimiter = new Bottleneck({ maxConcurrent: null, minTime: 1500 });


function localizeData(metadata, itemPrice) {
    metadata.dogma_attributes = JSON.stringify(metadata.dogma_attributes);
    return dbTools.addItem({ ...metadata, average_price: itemPrice.average_price, adjusted_price: itemPrice.adjusted_price });
}




async function addIfDoesNotExist(price) {
    let {type_id} = price
    let itemQueryResult = await dbTools.findBy('items', 'type_id', price.type_id)
    
    if (itemQueryResult.length === 0) {
        let itemMeta = await eveTechAPI.getItemFromTypeId(price);

        itemMeta.dogma_attributes = JSON.stringify(itemMeta.dogma_attributes)
        
        let itemFinalForm = {...itemMeta, typeId: price.type_id, average_price, adjusted_price}
        dbTools.addItem(itemFinalForm)
    } else {
        console.log(typeId, 'was in the db already')
    }

}

async function getItems() {
    const prices = await eveTechAPI.getCurrentPrices();

    let results = await aigle.map(prices, price => {
        return rateLimiter.schedule(() => {
            return addIfDoesNotExist(price);
        })
    })
    
}



async function app() {
    getItems();
    // dbTools.doesExistInTable('items', 34428)
}

app();