const endPoints = require('./EveAPIEndPoints.js')
// const eveOnlineItems = require('./items.json')
const pricesAndTypeIds = require('./seedPrices.json')
const axios = require('axios')
const fs = require('fs')

async function getItemNameFromTypeId(typeId) {
    return axios.get(endPoints.getTypeNames(typeId)).then(response => response.data).catch(err => {
        console.log(err)
    })
}

// async function getTypeIds() {
//     eveOnlineItems.map((item) => {

//     })
// }

async function getItems() {
    return Promise.all(pricesAndTypeIds.map(async (item) => {
        let price = item
        let data = await getItemNameFromTypeId(item.type_id)
        return {...data, price}
    }))
}

async function app() {
    let items = await getItems()
    fs.writeFile("/Users/stewa/Documents/EVE/spreadsheetsOnline/items.json", JSON.stringify(items), (err) => {
        if(err) throw err

        console.log("done writing to file")
    })
}

app()


