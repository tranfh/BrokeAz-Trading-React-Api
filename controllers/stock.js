'use strict';
const request = require('request');
require('dotenv').config();

const getCompanyOverview = (req, res) => {
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
        'x-rapidapi-key': process.env.FIDELITY_API_KEY,
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

const getMostActive = (req, res) => {
  request.get(
    {
      url: 'https://stock-market-data.p.rapidapi.com/market/screener/most-actives',
      headers: {
        'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.STOCK_MARKET_API_KEY,
        useQueryString: true,
      },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could not complete request');
      } else {
        console.log(data);
        // data is successfully parsed as a JSON object:
        res.json(JSON.parse(data.body));
      }
    }
  );
};

const getSmallCapGainer = (req, res) => {
  request.get(
    {
      url: 'https://stock-market-data.p.rapidapi.com/market/screener/small-cap-gainers',
      headers: {
        'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.STOCK_MARKET_API_KEY,
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

const getDayLosers = (req, res) => {
  request.get(
    {
      url: 'https://stock-market-data.p.rapidapi.com/market/screener/day-losers',
      headers: {
        'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.STOCK_MARKET_API_KEY,
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

const getDayGainers = (req, res) => {
  request.get(
    {
      url: 'https://stock-market-data.p.rapidapi.com/market/screener/day-gainers',
      headers: {
        'x-rapidapi-host': 'stock-market-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.STOCK_MARKET_API_KEY,
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
const getQuote = (req, res) => {
  request.get(
    {
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      qs: {
        function: 'GLOBAL_QUOTE',
        symbol: req.params.ticker,
        datatype: 'json',
      },
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': process.env.STOCK_MARKET_API_KEY,
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
  getMostActive: getMostActive,
  getDayGainers: getDayGainers,
  getDayLosers: getDayLosers,
  getSmallCapGainer: getSmallCapGainer,
  getQuote: getQuote,
};
