var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CancionSchema = new Schema({
    nombre: {
        type: String,
        minlength: 1,
        required: true
    },
    duracion: {
        type: Number,
        require: false
    },
    calificacion: {
        type: Number,
        minlength: 1,
        maxlength: 1,
        require: false
    }

});

module.exports = mongoose.model('Cancion', CancionSchema);