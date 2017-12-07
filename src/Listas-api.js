// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Lista = require('./models/lista');

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

        var lista = new Lista();
        lista.nombre = req.body.nombre;
        lista.save(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Lista creada',
                data: lista
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        Lista.find(function (err, listas) {
            if (err)
                res.send(err);
            res.json(listas);
        });
    });

// rutas  buscar  /lista/:lista_id

router.route('/:lista_id')

    .get(function (req, res) {
        Lista.findById(req.params.lista_id, function (err, lista) {
            if (err)
                res.status(500).send(err);
            else if (lista === null)
                res.status(404).send('No se encontró');
            else
                res.json(lista);
        });
    })

    // actualizar lista
    .put(function (req, res) {
        Lista.findById(req.params.lista_id, function (err, lista) {

            if (err)
                res.status(404).send(err);

            lista.nombre = req.body.nombre;
            lista.save(function (err) {
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
        Lista.remove({
            _id: req.params.lista_id
        }, function (err, lista) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;