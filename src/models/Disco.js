var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscoSchema = new Schema({
    nombre: {
        type: String,
        minlength: 2,
        required: true
    },
    lanzamiento: {
        type: Date,
        require: false
    },
    imagenes: {
        type: String,
        maxlength: 500,
        require: false
    },
    calificacion: {
        type: Number,
        minlength: 1,
        maxlength: 1,
        required: false
    }
});

module.exports = mongoose.model('Disco', DiscoSchema);