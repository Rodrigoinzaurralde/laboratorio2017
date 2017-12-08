var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistaSchema = new Schema({
    nombre: {
        type: String,
        minlength: 4,
        required: true
    },
    genero: {
        type: String,
        minlength: 3,
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
        require: false
    },
    integrantes: {
        type: String,
        require: false
<<<<<<< Updated upstream
=======
    },
    favorito: {
        type: boolean,
        require: false
>>>>>>> Stashed changes
    }
});

module.exports = mongoose.model('Artista', ArtistaSchema);