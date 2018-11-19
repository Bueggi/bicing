const Koa = require('koa');

const app = new Koa();
const cors = require('@koa/cors');
const router = require('./router');

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app.listen(3000, () => {
  console.log('server running on port 3000'); // eslint-disable-line no-console
});

