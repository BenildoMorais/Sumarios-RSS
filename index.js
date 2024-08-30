const RSSParser = require('rss-parser');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const feedURL = 'https://fenix.isutc.ac.mz/isutc/publico/summariesRSS.do?id=1689262177124364';

const parser = new RSSParser();
let sumarios = [];

const parse = async (url) => {

};

parse(feedURL);

app.get('/', async (req, res) => {
  try {
    const feed = await parser.parseURL(feedURL);
    console.log(feed.title);
    feed.items.forEach((item) => {
      const description = item.contentSnippet || item.content;

      const sumario = {
        title: item.title,
        link: item.link,
        description: description,
        pubDate: item.pubDate,
        guid: item.guid
      };
      sumarios.push(sumario);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter feed RSS' });
  }

  res.send(sumarios);
});

const server = app.listen(8080, () => {
  console.log('Servidor disponível em http://localhost:8080');
});

