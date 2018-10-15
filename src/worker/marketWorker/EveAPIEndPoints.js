export function getTypes() {
  return '/universe/types/?datasource=tranquility&page=1';
}
export function getTypeNames(id) {
  return `/universe/types/${id}/?datasource=tranquility&language=en-us`;
}
export function getPrices() {
  return '/markets/prices/?datasource=tranquility';
}
export function getMarketGroup(id) {
  return `/markets/groups/${id}/?datasource=tranquility&language=en-us`;
}
