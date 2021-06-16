var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var formidable = require('formidable');
var path = require('path');

router.post("/upload", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        console.log(files);
        console.log(fields);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });
    form.on('error', function (err) {
        console.error(err);
    });
    form.on('progress', function (bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
    form.on('end', function (fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/images/';

        fs.readFile(temp_path, function (err, data) {
            fs.writeFile(new_location + file_name, data, function (err) {
                fs.unlink(temp_path, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("success!");
                    }
                });
            });
        });
    });
});