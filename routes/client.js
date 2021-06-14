'use strict'

var express = require('express');
var client_controller = require('../controllers/client');
var router = express.Router();

router.post('/save_client', client_controller.save_client);
router.get('/get_clients', client_controller.get_clients);
router.get('/get_client/:id', client_controller.get_client);
router.put('/update_client/:id', client_controller.update_client);
router.delete('/delete_client/:id', client_controller.delete_client);

module.exports = router;