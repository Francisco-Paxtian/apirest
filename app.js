'use strict'

// load node module to create server
// cargar modulo de node para crear servidor

 var express = require('express');
 var bodyParser = require('body-parser');
 var path = require('path'); 
 const multer = require('multer');
 const upload = multer({dest: __dirname + '/uploads/images'});

// run express (htpp)
// ejecutar express (htpp)

 var app = express();

// upload route file 
// cargar rutas de fichero
var article_routes = require('./routes/article');
var client_routes  = require('./routes/client');
// middleawares

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
//app.use(bodyParser.json({limit:'50mb'}));
//app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
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
app.post('/upload', upload.single('file0'), (req, res) => {
    
    if(req.file) {
        res.json(req.file);
    }
    else res.json(__dirname);
});

// export module (current file)
// exportar modulo (fichero actual)

module.exports = app;
