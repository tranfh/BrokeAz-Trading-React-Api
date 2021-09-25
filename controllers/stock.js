'use strict';
const request = require('request');
const api_key = 'X0NMTL0ATGZH2WQF';

const getCompanyOverview = (req, res) => {
  let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.ticker}&apikey=${api_key}`;

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
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.ticker}&interval=5min&apikey=${api_key}`;

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
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.ticker}&interval=5min&apikey=${api_key}`;

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

module.exports = {
  getCompanyOverview: getCompanyOverview,
  getIntradayData: getIntradayData,
  getDailyData: getDailyData,
};
