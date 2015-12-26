var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var graphqlHTTP = require('express-graphql');
var schema = require('./data/schema.js');
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + '/semantic'));

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/app*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/graphql', graphqlHTTP({schema: schema, pretty:true}));

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
