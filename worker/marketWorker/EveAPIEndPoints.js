module.exports =  {
    getTypes: () => "latest/universe/types/?datasource=tranquility&page=1",
    getTypeNames: (typeId) => `latest/universe/types/${typeId}/?datasource=tranquility&language=en-us`,
    getPrices: () => `v1/markets/prices`
}