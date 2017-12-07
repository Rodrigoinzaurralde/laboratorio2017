var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaSchema = new Schema({
    nombre: {
        type: String,
        minlength:2,
        required: true
    },
    cantidad: Number
});

module.exports = mongoose.model('Lista', ListaSchema);