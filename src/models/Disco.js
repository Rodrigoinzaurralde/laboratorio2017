var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscoSchema = new Schema({
    nombre: {
        type: String,
        minlength: 2,
        required: true
    },
    cantidad: Number
});

module.exports = mongoose.model('Disco', DiscoSchema);