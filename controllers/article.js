'use strict'

var validator = require('validator');
const { request } = require('../app');
var Article   = require('../models/article');
var path = require('path');

var controller = {

    
    dato_curso :  (request, response) => {
    
        return response.status(200).send({
            curso : 'Master framework js',
            autor : 'Francisco',
            url : 'paxtian.mx' 
        });
    },

    testing : (request, response) => {

        return response.status(200).send({
            message : 'testing message'
        });
    },
    
    save : (request, response) => {
        
        //post
        var params = request.body;
        console.log(params);
        //validator
        try {
            var validate_title   = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            log.error(error);
            return response.status(200).send({
                status : 'error',
                message : 'faltan datos'
            });   
        }        
        if(validate_title && validate_content){
            
            //object
            var article = new Article();

            //set
            article.title   = params.title;
            article.content = params.content;
            article.image   = null;

            //save bd
            article.save((err, article_stored) =>{
                if(err || !article_stored){
                    return response.status(404).send({
                        status : 'error',
                        message : 'no se a guardado'
                    });  
                }

                return response.status(200).send({
                    status  : 'successfull',
                    article : article_stored
                }); 
            });
            
            
        }else{
            return response.status(200).send({
                status : 'error',
                message : 'los datos no son validos'
            }); 
        }
    },
    get_articles : (request,response) =>{
        //last

        var query = Article.find({});
        var last  = request.params.last;
        
        if(last || last != undefined){
            query.limit(5);
        }
        //find 
        query.sort('-_id').exec((err, articles) =>{
            
            if(err){
                return response.status(500).send({
                    status  : 'error',
                    message : 'no se pudo regresar los articulos'
                });
            }

            if(!articles){
                return response.status(404).send({
                    status  : 'error',
                    message : 'no hay articulos'
                });
            }
            
            return response.status(200).send({
                status : 'successfull',
                articles
            });
        });
        
    },
    get_article : (request,response) =>{
        
        //get id
        var article_id = request.params.id;        
        //validator
        if(!article_id || article_id == null){
            return response.status(404).send({
                status  : 'error',
                message : 'no existe el articulo'
            });
        }  
        //search bd     
        Article.findById(article_id, (err, article) =>{            
            if(err || !article){
                return response.status(404).send({
                    status  : 'error',
                    message : 'no existe el articulo'
                });
            }
            //get
            return response.status(500).send({
                status  : 'successfull',
                article
            });
        });                        
    },
    update_article : (request, response) => {
        
        //get id
        var article_id = request.params.id;

        //put 
        var params = request.body;
        
        //validator
        try {

            var validate_title   = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            

            if(validate_title && validate_content){
                //find and update
                Article.findByIdAndUpdate({_id: article_id}, params, {new: true}, (err, article_update) =>{
                    if(err){
                        return response.status(404).send({
                            status  : 'error',
                            message : 'error al actulizar',
                            err
                        });
                    }
                    if(!article_update){
                        return response.status(404).send({
                            status  : 'error',
                            message : 'no existe el articulo'
                        });
                    }
                    return response.status(404).send({
                        status  : 'successfull',
                        article_update
                    });
                });
                //get
            }else{
                return response.status(404).send({
                    status  : 'error',
                    message : 'validacion incorrecta'
                });
            }
            
        } catch (error) {
            return response.status(404).send({
                status  : 'error',
                message : 'faltan datos'
            });
        }

        

    },
    delete : (request, response) => {

        //get id
        var article_id = request.params.id;

        //find and delete
        Article.findByIdAndDelete({_id: article_id}, (err, article_remove) =>{
            if(err){
                return response.status(404).send({
                    status  : 'error',
                    message : 'error al borrar'
                });
            }
            if(!article_remove){
                return response.status(404).send({
                    status  : 'error',
                    message : 'el articulo no existe'
                });
            }
            return response.status(200).send({
                status  : 'successfull',
                article_remove
            });            
        })        
    },
    upload_image : (request, response) =>{
        
        
        var file_name = "error al subir la imagen...";

        
        return response.status(200).send({
            message : "udload"              
        });        
        

    },
    search : (request, response) =>{

        //string 
        var search_string = request.params.search;

        
        //find or
        try {
            Article.find({
                '$or' : [
                     {'title': { '$regex': search_string, '$options': 'i'}},
                     {'content': { '$regex': search_string, '$options': 'i'}},
                ]
            })
            .sort([['date','descending']])
            .exec((err, articles) =>{
    
                if(err){
                 
                    return response.status(404).send({
                        message : 'error',
                        message : 'error en la peticion'
                    });
    
                }
                if(!articles || articles.length <= 0){
    
                    return response.status(404).send({
                        message : 'error',
                        message : 'no hay articulos para mostras'
                    });
    
                }
                return response.status(200).send({
                    message : 'successfull',
                    articles
                });
            });
        } catch (error) {
            return response.status(404).send({
                message : 'error',
                message : 'error en la peticion'
            });
        }
        
    }
};

module.exports = controller;