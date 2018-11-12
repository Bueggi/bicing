const rp = require('request-promise-native');

exports.getStations = async (ctx, next) => {
  console.log('new request to bicing');
  const info = await rp('http://wservice.viabicing.cat/v2/stations');
  console.log('55: solts:', JSON.parse(info).stations[52].slots);

  ctx.body = info;
  ctx.status = 200;
};
