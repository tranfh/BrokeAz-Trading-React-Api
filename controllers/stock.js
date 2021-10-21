'use strict';
const request = require('request');
require('dotenv').config();

const getCompanyOverview = (req, res) => {
  console.log(req.params.ticker);
  let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could not complete request');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
      }
    }
  );
};

const getIntradayData = (req, res) => {
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could not complete request');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
      }
    }
  );
};

const getDailyData = (req, res) => {
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could not complete request');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
      }
    }
  );
};

const getNews = (req, res) => {
  request.get(
    {
      url: 'https://fidelity-investments.p.rapidapi.com/news/list-top',
      qs: { symbol: req.params.ticker },
      headers: {
        'x-rapidapi-host': 'fidelity-investments.p.rapidapi.com',
        'x-rapidapi-key': '265252c1d9msh67900f76ecdfef2p1080bfjsnb825b758299c',
        useQueryString: true,
      },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could not complete request');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(JSON.parse(data.body));
      }
    }
  );
};

module.exports = {
  getCompanyOverview: getCompanyOverview,
  getIntradayData: getIntradayData,
  getDailyData: getDailyData,
  getNews: getNews,
};
