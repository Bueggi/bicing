const Koa = require('koa');
const Router = require('koa-router');
const rp = require('request-promise-native');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

router.get('/stations', async (ctx, next) => {
  ctx.body = await rp('http://wservice.viabicing.cat/v2/stations');
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
