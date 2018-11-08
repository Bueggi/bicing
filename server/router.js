const Router = require('koa-router');
const router = new Router();
const stationController = require('./controllers/station.controller');

router.get('/stations', stationController.getStations);

module.exports = router;
