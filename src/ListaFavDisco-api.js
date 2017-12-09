// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Lista = require('./models/listaFavDisco');

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

        var listaFavDisco = new listaFavDisco();
        listaFavDisco.nombre = req.body.nombre;
        listaFavDisco.favorito1 = req.body.favorito1;
        listaFavDisco.favorito2 = req.body.favorito2;
        listaFavDisco.favorito3 = req.body.favorito3;
        listaFavDisco.favorito4 = req.body.favorito4;
        listaFavDisco.favorito5 = req.body.favorito5;
        db.collection('ListaFavDisco').insert(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Lista creada',
                data: listaFavDisco
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('ListaFavDisco').find(function (err, listasFavDisco) {
            if (err)
                res.send(err);
            res.json( listasFavDisco);
        });
    });

// rutas  buscar  /listaFavDisco/:lista_id

router.route('/: listaFavDisco_nombre')

    .get(function (req, res) {
        db.collection('ListaFavDisco').findOne(req.params.listaFavDisco_id, function (err, listaFavDisco) {
            if (err)
                res.status(500).send(err);
            else if ( listaFavDisco === null)
                res.status(404).send('No se encontró');
            else
                res.json(listaFavDisco);
        });
    })

    // actualizar lista
    .put(function (req, res) {
        db.collection('ListaFavDisco').findById(req.params.listaFavDisco_id, function (err, listaFavDisco) {

            if (err)
                res.status(404).send(err);

                listaFavDisco.nombre = req.body.nombre;
                listaFavDisco.favorito1 = req.body.favorito1;
                listaFavDisco.favorito2 = req.body.favorito2;
                listaFavDisco.favorito3 = req.body.favorito3;
                listaFavDisco.favorito4 = req.body.favorito4;
                listaFavDisco.favorito5 = req.body.favorito5;
            listaFavDisco.save(function (err) {
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
        db.collection('ListaFavDisco').remove({
            _id: req.params.listaFavDisco_id
        }, function (err, listaFavDisco) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;