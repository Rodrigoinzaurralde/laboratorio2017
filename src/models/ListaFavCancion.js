var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaFavCancionSchema = new Schema({
    nombre: {
        type: String,
        minlength:2,
        required: true
    },
    cancion1: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
    cancion2: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
    cancion2: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
    cancion3: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
    cancion4: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
    cancion5: {
        favorito: { type: Schema.ObjectId, ref: "Cancion" }
    },
});

module.exports = mongoose.model('ListaFavCancion', ListaFavCancionSchema);