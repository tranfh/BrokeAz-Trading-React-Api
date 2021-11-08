'use strict';
const request = require('request');
require('dotenv').config();

const getLatestNews = (req, res) => {
  let url = `https://financialmodelingprep.com/api/v3/stock_news?limit=100&apikey=
    ${process.env.FMP_API_KEY}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could Not Retrieve News');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
      }
    }
  );
};

const getInsiders = (req, res) => {
  let url = `https://financialmodelingprep.com/api/v4/insider-trading?transactionType=P-Purchase,S-Sale&limit=100&apikey=
    ${process.env.FMP_API_KEY}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        res.statusCode(404).json('Could Not Retrieve Insiders');
      } else {
        // data is successfully parsed as a JSON object:
        res.json(data);
      }
    }
  );
};

module.exports = {
  getLatestNews: getLatestNews,
  getInsiders: getInsiders,
};
