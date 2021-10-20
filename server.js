const express = require('express');
const cors = require('cors');
const stock = require('./controllers/stock');
const apicache = require('apicache');

const app = express();
app.use(express.json());
app.use(cors());

// MIDDLEWARE
let cache = apicache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('15 minutes', onlyStatus200);

// HOME
app.get('/', (req, res) => {
  res.json('Launching Application...');
});

// SEARCH
app.get('/search/:ticker', (req, res) => {
  stock.getCompanyOverview(req, res);
});
app.get('/chart/intraday/:ticker', cacheSuccesses, (req, res) => {
  stock.getIntradayData(req, res);
});
app.get('/chart/daily/:ticker', cacheSuccesses, (req, res) => {
  stock.getDailyData(req, res);
});

let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);
