const Koa = require('koa');
const Router = require('koa-router');
const rp = require('request-promise-native');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

router.get('/stations', async (ctx, next) => {
  console.log('new request to bicing');

  const info = await rp('http://wservice.viabicing.cat/v2/stations');
  console.log('55: solts:', JSON.parse(info).stations[52].slots);

  ctx.body = info;
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server running on port 3000');
});
