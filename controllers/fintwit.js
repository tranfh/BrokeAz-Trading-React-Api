'use strict';
const stocktwits = require('stocktwits-api');
const snoowrap = require('snoowrap');
const twit = require('twit');
const _ = require('lodash');
require('dotenv').config();

const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_APP_ID,
  clientSecret: process.env.REDDIT_APP_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

const twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const getTrending = (req, res) => {
  switch (req.params.fintwit) {
    case 'stocktwits':
      let data = [];
      stocktwits
        .trendingStocks()
        .then((stocks) => {
          data = stocks.symbols.map((ticker) => ticker.symbol).slice(0, 5);
          res.json(data);
        })
        .catch((err) => {
          res.status(400).json('Could Not Fetch StockTwits Data');
        });
      break;

    case 'reddit':
      let tickers = [];
      let symbols = [];
      let subs = ['pennystocks', 'wallstreetbets', 'stocks'];
      let getRedditTrending = async () => {
        for (const sub of subs) {
          const response = await reddit
            .getSubreddit(sub)
            .getHot()
            .then((posts) => {
              tickers = tickers.concat(posts.map((thread) => thread.title));
              tickers = tickers.join(' ').split(' ');
              for (let idx = 0; idx < tickers.length; idx++) {
                if (tickers[idx].indexOf('$') !== -1) {
                  let word = tickers[idx]
                    .replace(/[^A-Za-z]/gi, '')
                    .toUpperCase();
                  if (word.length > 2 && word.length < 5) {
                    symbols.push(word);
                  }
                }
              }
            });
        }
        return symbols;
      };
      getRedditTrending()
        .then((data) => {
          data = _.countBy(data);
          let sortedData = Object.keys(
            Object.fromEntries(
              Object.entries(data).sort(([, a], [, b]) => b - a)
            )
          ).slice(0, 5);
          res.json(sortedData);
        })
        .catch((err) => res.status(400).json('Could Not Retrieve Reddit Data'));
      break;

    case 'twitter':
      // #pennystocks OR #trendingstocks OR #stocks OR #stockmarket
      twitter.get(
        'search/tweets',
        {
          q: '#pennystocks OR #trendingstocks OR #stocks OR #stockmarket',
          count: 1000,
        },
        function (err, data, response) {
          let tickers = [];
          if (!err) {
            for (let i = 0; i < data.statuses.length; i++) {
              tickers = tickers.concat(
                data.statuses[i].entities.symbols.map((data) =>
                  data.text.toUpperCase()
                )
              );
            }
            tickers = _.countBy(tickers);
            let sortedData = Object.keys(
              Object.fromEntries(
                Object.entries(tickers).sort(([, a], [, b]) => b - a)
              )
            ).slice(0, 5);
            res.json(sortedData);
          } else {
            res.status(404).json('Could Not Fetch Twitter Data');
          }
        }
      );
      break;
  }
};

module.exports = {
  getTrending: getTrending,
};
