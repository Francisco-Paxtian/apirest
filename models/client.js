'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var client_schema = schema({
    
    first_name  : String,
    last_name   : String,
    email       : String,
    password    : String,
    address     : [String]

});

module.exports = mongoose.model('Client', client_schema);