const express = require('express');
const path = require('path');
const app = express();
const env = require('dotenv');
const port = process.env.PORT || 3000;
const apikey = process.env.APIKEY;

require('./handlebars-utils');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

const fetch = require('node-fetch');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/getmovies', (req, res) => {
  getMovies(req, res);
});

app.post('/getmovies', async (req, res) => {
  getMovies(req, res);
});

const getMovies = async (req, res) => {
  const isQuery = Object.keys(req.query).length;
  const { query, page = 1 } = isQuery ? req.query : req.body;
  if (!query) {
    return res.render('error');
  }
  const url = `http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apikey}`;
  const request = await fetch(url);
  const { Search, totalResults } = await request.json();
  const pages = Math.floor(Number(totalResults) / 10);
  res.render('movies', { Search, query, pages, page, apikey });
}

app.listen(port, () => 'Listening on port', port);
