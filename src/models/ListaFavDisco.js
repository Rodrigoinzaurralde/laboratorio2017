var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaFavDiscoSchema = new Schema({
    nombre: {
        type: String,
        minlength:2,
        required: true
    },
    disco1: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
    disco2: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
    disco2: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
    disco3: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
    disco4: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
    disco5: {
        favorito: { type: Schema.ObjectId, ref: "Disco" }
    },
});

module.exports = mongoose.model('ListaFavDisco', ListaFavDiscoSchema);