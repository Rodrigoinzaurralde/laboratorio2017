var mongo_db_string = 'mongodb://noelmastrangelo:noelmas007@ds044577.mlab.com:44577/remi-search';

var mongoose = require('mongoose');
mongoose.connect(mongo_db_string, {
  useMongoClient: true
}); 

var dbConnection = mongoose.connection;

exports.dbConnection = dbConnection;