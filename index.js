'use strict'

var mongoose = require('mongoose'); // use dependece mongoose
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false); // desactivate old methods
mongoose.Promise = global.Promise;
// conection mongodb
mongoose.connect('mongodb://localhost:27017/api_rest_blog',{ useNewUrlParser : true, useUnifiedTopology : true }).then( () => {
    console.log('connection successfull !!');

    // create server and listen to htpp request
    app.listen(port, () =>{
        console.log('server create successful and port: '+port);
    });    
});

