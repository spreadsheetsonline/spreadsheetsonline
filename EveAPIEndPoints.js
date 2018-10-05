module.exports =  {
    getTypes: () => "https://esi.evetech.net/latest/universe/types/?datasource=tranquility&page=1",
    getTypeNames: (typeId) => `https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility&language=en-us`,
    getPrices: () => `https://esi.evetech.net/v1/markets/prices`
}