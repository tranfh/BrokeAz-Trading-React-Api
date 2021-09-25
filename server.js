const express = require('express');
const cors = require('cors');
const stock = require('./controllers/stock');

const app = express();
app.use(express.json());
app.use(cors());

// HOME
app.get('/', (req, res) => {
  res.json('Launching Application...');
});

// SEARCH
app.get('/search/:ticker', (req, res) => {
  stock.getCompanyOverview(req, res);
});
app.get('/chart/intraday/:ticker', (req, res) => {
  stock.getIntradayData(req, res);
});
app.get('/chart/daily/:ticker', (req, res) => {
  stock.getDailyData(req, res);
});

let port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
