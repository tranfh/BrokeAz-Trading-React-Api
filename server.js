const express = require('express');
const cors = require('cors');
const stock = require('./controllers/stock');
const fintwit = require('./controllers/fintwit');
const apicache = require('apicache');

const app = express();
app.use(express.json());
app.use(cors());

// DATABASE
// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });

// MIDDLEWARE
let cache = apicache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses15 = cache('15 minutes', onlyStatus200);
const cacheSuccesses60 = cache('60 minutes', onlyStatus200);

// HOME
app.get('/', (req, res) => {
  res.json('Launching Application...');
});

// SEARCH
app.get('/search/:ticker', (req, res) => {
  stock.getCompanyOverview(req, res);
});
app.get('/quote/:ticker', (req, res) => {
  stock.getQuote(req, res);
});

// CHARTS
app.get('/chart/intraday/:ticker', cacheSuccesses15, (req, res) => {
  stock.getIntradayData(req, res);
});
app.get('/chart/daily/:ticker', cacheSuccesses15, (req, res) => {
  stock.getDailyData(req, res);
});

// NEWS
app.get('/news/:ticker?', cacheSuccesses15, (req, res) => {
  stock.getNews(req, res);
});

// TRENDING
app.get('/trending/:fintwit', cacheSuccesses60, (req, res) => {
  fintwit.getTrending(req, res);
});

// MARKET MOVERS
app.get('/mostactives', cacheSuccesses60, (req, res) => {
  stock.getMostActive(req, res);
});

app.get('/smallcaps', cacheSuccesses60, (req, res) => {
  stock.getSmallCapGainer(req, res);
});

app.get('/gainers', cacheSuccesses60, (req, res) => {
  stock.getDayGainers(req, res);
});

app.get('/losers', cacheSuccesses60, (req, res) => {
  stock.getDayLosers(req, res);
});

let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);
