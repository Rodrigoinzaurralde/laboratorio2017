// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Cancion = require('./models/cancion');
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


// Rutas /Cancion
router.route('/')

//crear
    .post(function (req, res) {

        var cancion = new Cancion();
        cancion.nombre = req.body.nombre;
        cancion.duracion = req.body.duracion;
        cancion.calificacion = req.body.calificacion;
        db.collection('Cancion').insert(cancion, function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'cancion creada',
                data: cancion
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('Cancion').find({}).toArray(function (err, canciones) {
            if (err)
                res.send(err);
            res.json(canciones);
        });
    });

// rutas  buscar  /cancion/:cancion_id

router.route('/:cancion_nombre')

.get(function (req, res) {
    db.collection('Cancion').findOne(req.params.cancion_id, function (err, cancion) {
        if (err)
            res.status(500).send(err);
        else if (cancion === null)
            res.status(404).send('No se encontró');
        else
            res.json(cancion);
    });
})

    // actualizar cancion
    .put(function (req, res) {
        db.collection('Cancion').findById(req.params.cancion_id, function (err, cancion) {

            if (err)
                res.status(404).send(err);

            cancion.nombre = req.body.nombre;
            cancion.duracion = req.body.duracion;
            cancion.calificacion = req.body.calificacion;
            cancion.save(function (err) {
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
        db.collection('Cancion').remove({
            _id: req.params.cancion_id
        }, function (err, cancion) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;