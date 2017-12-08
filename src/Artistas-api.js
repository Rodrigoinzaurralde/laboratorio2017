// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Artista = require('./models/artista');
var db = require('./../dbConnection').dbConnection;
var router = new express.Router();

const ObjectId = require('mongodb').ObjectId;

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

// Rutas /Artista
router.route('/')

//crear
    .post(function (req, res) {

        var artista = new Artista();
        artista.nombre = req.body.nombre;
        artista.genero = req.body.genero;
        artista.imagenes = req.body.imagenes;
        artista.calificacion = req.body.calificacion;
        artista.integrantes = req.body.integrantes;
        db.collection('Artista').insert(artista, function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Artista creado',
                data: artista
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('Artista').find({}).toArray(function (err, artistas) {
            if (err)
                res.send(err);
            res.json(artistas);
        });
    });

// rutas  buscar  /artista/:artista_id

router.route('/:artista_id')

    .get(function (req, res) {
        Artista.findById(req.params.artista_id, function (err, artista) {
            if (err)
                res.status(500).send(err);
            else if (artista === null)
                res.status(404).send('No se encontró');
            else
                res.json(artista);
        });
    })

    // actualizar artista
    .put(function (req, res) {
        Artista.findById(req.params.artista_id, function (err, artista) {

            if (err)
                res.status(404).send(err);

                artista.nombre = req.body.nombre;
                artista.genero = req.body.genero;
                artista.imagenes = req.body.imagenes;
                artista.calificacion = req.body.calificacion;
                artista.integrantes = req.body.integrantes;
                artista.save(function (err) {
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
        Artista.remove({
            _id: req.params.artista_id
        }, function (err, artista) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;