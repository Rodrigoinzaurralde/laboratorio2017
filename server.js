  // server.js
// where your node app starts
// var mongo_db_string = 'mongodb://localhost:27017/api-mongo'
// var mongo_db_string = 'mongodb://noelmastrangelo:noelmas007@ds044577.mlab.com:44577/remi-search';

var express = require('express');
var artista_router = require('./src/artistas-api');
var cancion_router = require('./src/canciones-api');
var disco_router = require('./src/discos-api');
var lista_router = require('./src/listas-api');
var app = express();
var db = require('./dbConnection').dbConnection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Conexión con la BD establecida");
});

app.use(express.static('public'));
app.use('/api/artista', artista_router);
app.use('/api/cancion', cancion_router);
app.use('/api/disco', disco_router);
app.use('/api/lista', lista_router);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});