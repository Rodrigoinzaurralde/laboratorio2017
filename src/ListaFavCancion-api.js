// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Lista = require('./models/listaFavCancion');

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

        var listaFavCancion = new listaFavCancion();
        listaFavCancion.nombre = req.body.nombre;
        listaFavCancion.favorito1 = req.body.favorito1;
        listaFavCancion.favorito2 = req.body.favorito2;
        listaFavCancion.favorito3 = req.body.favorito3;
        listaFavCancion.favorito4 = req.body.favorito4;
        listaFavCancion.favorito5 = req.body.favorito5;
        db.collection('ListaFavCancion').insert(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Lista creada',
                data: listaFavCancion
            });
        });
    })

    // Obtener 
    .get(function (req, res) {
        db.collection('ListaFavCancion').find(function (err, listasFavCancion) {
            if (err)
                res.send(err);
            res.json( listasFavCancion);
        });
    });

// rutas  buscar  /listaFavCancion/:lista_id

router.route('/: listaFavCancion_nombre')

    .get(function (req, res) {
        db.collection('ListaFavCancion').findOne(req.params.listaFavCancion_id, function (err, listaFavCancion) {
            if (err)
                res.status(500).send(err);
            else if ( listaFavCancion === null)
                res.status(404).send('No se encontró');
            else
                res.json(listaFavCancion);
        });
    })

    // actualizar lista
    .put(function (req, res) {
        db.collection('ListaFavCancion').findById(req.params.listaFavCancion_id, function (err, listaFavCancion) {

            if (err)
                res.status(404).send(err);

                listaFavCancion.nombre = req.body.nombre;
                listaFavCancion.favorito1 = req.body.favorito1;
                listaFavCancion.favorito2 = req.body.favorito2;
                listaFavCancion.favorito3 = req.body.favorito3;
                listaFavCancion.favorito4 = req.body.favorito4;
                listaFavCancion.favorito5 = req.body.favorito5;
            listaFavCancion.save(function (err) {
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
        db.collection('ListaFavCancion').remove({
            _id: req.params.listaFavCancion_id
        }, function (err, listaFavCancion) {
            if (err)
                res.send(err);
            res.json({
                message: 'eliminado'
            });
        });
    });


module.exports = router;