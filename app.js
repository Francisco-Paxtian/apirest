'use strict'

// load node module to create server
// cargar modulo de node para crear servidor

 var express = require('express');
 var bodyParser = require('body-parser');
 var path = require('path'); 

// run express (htpp)
// ejecutar express (htpp)

 var app = express();

// upload route file 
// cargar rutas de fichero
var article_routes = require('./routes/article');
var client_routes  = require('./routes/client');
// middleawares

//app.use(bodyParser.urlencoded({extended : false}));
//app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({ extended:true, limit:'50mb' }));
//
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
//app.use(express.static(path.join(__dirname, 'upload')));
// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// add prefixes route
// añadir prefijos para rutas // cargar rutas
app.use('/api', article_routes);
app.use('/client', client_routes);

// export module (current file)
// exportar modulo (fichero actual)

module.exports = app;
