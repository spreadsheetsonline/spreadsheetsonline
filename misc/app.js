const endPoints = require('./EveAPIEndPoints.js');
const pricesAndTypeIds = require('../data/seedPrices.json');
const axios = require('axios');
const fs = require('fs');
const knex = require('../db/knex');

async function getItemNameFromTypeId(typeId) {
    return axios.get(endPoints.getTypeNames(typeId)).then(response => response.data).catch(err => {
        console.log(err)
    })
}

async function getItems() {
    // using promise
    return Promise.all(pricesAndTypeIds.map(async (item) => {
        let price = item
        let data = await getItemNameFromTypeId(item.type_id)
        
        try {
            data.dogma_attributes = JSON.stringify(data.dogma_attributes)
        } catch(err) {
            console.log(err)
        }

        return {...data, price: JSON.stringify(price)}
    }))
}

async function storeItem(item) {
    return knex('items').insert(item).catch(err => console.log(err))
}

async function app() {
    let items = await getItems()
    
    for(let i in items) {
        try {
            await storeItem(items[i])
        } catch (e) {
            console.log(err)
        }
    }
    
    return
}

app()


