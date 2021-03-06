// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./../dbConnection').dbConnection;
var Disco = require('./models/disco');

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

// Rutas /Disco
router.route('/')

//crear
    .post(function (req, res) {

        var disco = new Disco();
        disco.nombre = req.body.nombre;
        disco.lanzamiento = req.body.lanzamiento;
        disco.imagenes = req.body.imagenes;
        disco.calificacion = req.body.calificacion;
        db.collection('Disco').insert(disco, function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Disco creado',
                data: disco
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('Disco').find({}).toArray(function (err, discos) {
            if (err)
                res.send(err);
            res.json(discos);
        });
    });

// rutas  buscar  /disco/:disco_id

router.route('/:disco_nombre')

.get(function (req, res) {
    db.collection('Disco').findOne(req.params.disco_id, function (err, disco) {
        if (err)
            res.status(500).send(err);
        else if (disco === null)
            res.status(404).send('No se encontró');
        else
            res.json(disco);
    });
})


    // actualizar disco
    .put(function (req, res) {
        db.collection('Disco').findById(req.params.disco_id, function (err, disco) {

            if (err)
                res.status(404).send(err);

            disco.nombre = req.body.nombre;
            disco.cantidad = req.body.cantidad;
            disco.save(function (err) {
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
        db.collection('Disco').remove({
            _id: req.params.disco_id
        }, function (err, disco) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;