'use strict'

var validator = require('validator');
var Client   = require('../models/client');

var controller = {


    save_client : (req, res) => {

        //post
        var params = req.body;
        console.log(params);

        try {
            var validate_first_name     = !validator.isEmpty(params.first_name);
            var validate_last_name      = !validator.isEmpty(params.last_name);
            var validate_email          = !validator.isEmpty(params.email);
            var validate_password       = !validator.isEmpty(params.password);
            var validate_street         = !validator.isEmpty(params.street);
            
        } catch (error) {
            
            return res.status(404).send({
                status : 'error',
                message : 'faltan datos'
            });   
        }        
        if(validate_first_name  &&
            validate_last_name  &&
            validate_email      &&
            validate_password   &&
            validate_street
        ){         
            
            var client = new Client();

        
            client.first_name   = params.first_name;
            client.last_name    = params.last_name;
            client.email        = params.email;
            client.password     = params.password;
            client.address[0]   = params.street;
            client.address[1]   = "array";
            
            client.save((err, client_stored) =>{
                if(err || !client_stored){
                    return res.status(404).send({
                        status  : 'error',
                        message : 'error al guardar cliente'
                    });
                }

                return res.status(200).send({
                    status  : 'successfull',
                    client  : client_stored
                });
            })       
        }else{
            return response.status(200).send({
                status : 'error',
                message : 'los datos no son validos'
            });
        }

    },
    get_clients : (req, res) => {
        var query = Client.find({});
        var last  = req.params.last;
        
        if(last || last != undefined){
            query.limit(5);
        }
        //find 
        query.sort('-_id').exec((err, client) =>{
            
            if(err){
                return res.status(500).send({
                    status  : 'error',
                    message : 'error al regresar los clientes'
                });
            }

            if(!client){
                return res.status(404).send({
                    status  : 'error',
                    message : 'no hay clientes'
                });
            }
            
            return res.status(200).send({
                status : 'successfull',
                client
            });
        });
    },
    get_client : (req, res) => {
        
        
        var client_id = req.params.id;        

        if(!client_id || client_id == null){
            return res.status(404).send({
                status  : 'error',
                message : 'no existe el cliente'
            });
        }  
        //search bd     
        Client.findById(client_id, (err, client) =>{            
            if(err || !client){
                return res.status(404).send({
                    status  : 'error',
                    message : 'no existe el cliente'
                });
            }
            //get
            return res.status(500).send({
                status  : 'successfull',
                client
            });
        });                        
    },
    update_client : (req, res) => {
        
        var client_id = req.params.id;
        
        var params = req.body;
                
        try {

            var validate_first_name     = !validator.isEmpty(params.first_name);
            var validate_last_name      = !validator.isEmpty(params.last_name);
            var validate_email          = !validator.isEmpty(params.email);
            var validate_password       = !validator.isEmpty(params.password);
            var validate_street         = !validator.isEmpty(params.street);            
            if(validate_first_name  &&
                validate_last_name  &&
                validate_email      &&
                validate_password   &&
                validate_street
            ){
                Client.findByIdAndUpdate({_id: client_id}, params, {new: true}, (err, client_update) =>{
                    if(err){
                        return res.status(404).send({
                            status  : 'error',
                            message : 'error al actulizar',
                            err
                        });
                    }
                    if(!client_update){
                        return res.status(404).send({
                            status  : 'error',
                            message : 'no existe el cliente'
                        });
                    }
                    return res.status(404).send({
                        status  : 'successfull',
                        client_update
                    });
                });
            }else{
                return res.status(404).send({
                    status  : 'error',
                    message : 'error al actulizar',
                    err
                });
            }
                                                            
        } catch (error) {
            return res.status(404).send({
                status  : 'error',
                message : 'faltan datos'
            });
        }
        
    },
    delete_client : (req, res) => {
        
        var client_id = req.params.id;

        Client.findByIdAndDelete({_id: client_id}, (err, client_remove) =>{
            if(err){
                return res.status(404).send({
                    status  : 'error',
                    message : 'error al borrar'
                });
            }
            if(!client_remove){
                return res.status(404).send({
                    status  : 'error',
                    message : 'el cliente no existe'
                });
            }
            return res.status(200).send({
                status  : 'successfull',
                client_remove
            });            
        });      

    },

};

module.exports = controller;