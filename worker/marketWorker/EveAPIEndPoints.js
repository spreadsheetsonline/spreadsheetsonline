module.exports =  {
    getTypes: () => "/universe/types/?datasource=tranquility&page=1",
    getTypeNames: (typeId) => `/universe/types/${typeId}/?datasource=tranquility&language=en-us`,
    getPrices: () => `/markets/prices/?datasource=tranquility`
}