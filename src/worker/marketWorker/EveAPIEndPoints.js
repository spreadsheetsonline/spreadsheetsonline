module.exports =  {
    getTypes: () => "/universe/types/?datasource=tranquility&page=1",
    getTypeNames: (typeId) => `/universe/types/${typeId}/?datasource=tranquility&language=en-us`,
    getPrices: () => `/markets/prices/?datasource=tranquility`,
    getMarketGroup: (market_group_id) => `/markets/groups/${market_group_id}/?datasource=tranquility&language=en-us`
}