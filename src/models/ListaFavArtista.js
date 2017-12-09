var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaFavArtistaSchema = new Schema({
    nombre: {
        type: String,
        minlength:2,
        required: true
    },
    artista1: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
    artista2: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
    artista2: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
    artista3: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
    artista4: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
    artista5: {
        favorito: { type: Schema.ObjectId, ref: "Artista" }
    },
});

module.exports = mongoose.model('ListaFavArtista', ListaFavArtistaSchema);