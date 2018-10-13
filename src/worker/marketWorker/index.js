const eveTechAPI = require('./eveTechAPI');
const dbTools = require('../../db/tools');
const Bottleneck = require('bottleneck');
const aigle = require('aigle');

const rateLimiter = new Bottleneck({ maxConcurrent: 5, minTime: 100 });

async function addIfDoesNotExistPrice(price) {
    let {type_id, average_price, adjusted_price} = price;
    let itemQueryResult = await dbTools.findBy('items', 'type_id', type_id);
    if (itemQueryResult.length === 0) {
        let itemMeta = await eveTechAPI.getItemFromTypeId(type_id);

        itemMeta.dogma_attributes = JSON.stringify(itemMeta.dogma_attributes);
        itemMeta.dogma_effects = JSON.stringify(itemMeta.dogma_effects);
        itemMeta.mass = 0;

        let itemFinalForm = {...itemMeta, average_price: Math.floor(average_price) || null, adjusted_price: Math.floor(adjusted_price) || null};
        return await dbTools.addItem(itemFinalForm);
    } else {
        console.log(type_id, 'was in the db already');
        return;
    }
}

async function getItems() {
    const prices = await eveTechAPI.getCurrentPrices();

    let results = await aigle.map(prices, price => {
        return rateLimiter.schedule(() => {
            return addIfDoesNotExistPrice(price);
        })
    })

    console.log(results, "results");
    return results;
}

function getGroupIds(groupName) {
    return dbTools.findByReturningColumns('items', groupName);
}

function getGroupIdNames(id) {
    return eveTechAPI.getMarketGroup(parseInt(id));
}

function addGroup(tableName, group) {
    return dbTools.addGroup(tableName, group);
}

async function getAndAdd(id, tableName) {
    let group = await getGroupIdNames(id);
    let { types } = group;
    group.types = JSON.stringify(types);
    return addGroup(tableName, group);
}

async function addGroupIds(from, to) {
    let groups = await getGroupIds(from)

    let results = await aigle.map(groups, group => {
        return rateLimiter.schedule(() => {
           return getAndAdd(group[from], to);
        });
    });

    return results
}



async function app() {
    return addGroupIds('market_group_id', 'market_groups');
}

app();