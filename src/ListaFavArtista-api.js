// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Lista = require('./models/listaFavArtista');

var router = new express.Router();

router.use(morgan('dev'));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


// RUTAS 

router.use(function (req, res, next) {
    console.log('Invocación a url: ' + req.url);
    next();
});

// Rutas /Lista
router.route('/')

//crear
    .post(function (req, res) {

        var listaFavArtista = new listaFavArtista();
        listaFavArtista.nombre = req.body.nombre;
        listaFavArtista.favorito1 = req.body.favorito1;
        listaFavArtista.favorito2 = req.body.favorito2;
        listaFavArtista.favorito3 = req.body.favorito3;
        listaFavArtista.favorito4 = req.body.favorito4;
        listaFavArtista.favorito5 = req.body.favorito5;
        db.collection('ListaFavArtista').insert(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Lista creada',
                data: listaFavArtista
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('ListaFavArtista').find(function (err, listasFavArtista) {
            if (err)
                res.send(err);
            res.json( listasFavArtista);
        });
    });

// rutas  buscar  /listaFavArtista/:lista_id

router.route('/: listaFavArtista_nombre')

    .get(function (req, res) {
        db.collection('ListaFavArtista').findOne(req.params.listaFavArtista_id, function (err, listaFavArtista) {
            if (err)
                res.status(500).send(err);
            else if ( listaFavArtista === null)
                res.status(404).send('No se encontró');
            else
                res.json(listaFavArtista);
        });
    })

    // actualizar lista
    .put(function (req, res) {
        db.collection('ListaFavArtista').findById(req.params.listaFavArtista_id, function (err, listaFavArtista) {

            if (err)
                res.status(404).send(err);

                listaFavArtista.nombre = req.body.nombre;
                listaFavArtista.favorito1 = req.body.favorito1;
                listaFavArtista.favorito2 = req.body.favorito2;
                listaFavArtista.favorito3 = req.body.favorito3;
                listaFavArtista.favorito4 = req.body.favorito4;
                listaFavArtista.favorito5 = req.body.favorito5;
            listaFavArtista.save(function (err) {
                if (err)
                    res.status(500).send(err);
                res.json({
                    message: 'actualizado!'
                });
            });

        });
    })

    //eliminar

    .delete(function (req, res) {
        db.collection('ListaFavArtista').remove({
            _id: req.params.listaFavArtista_id
        }, function (err, listaFavArtista) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;