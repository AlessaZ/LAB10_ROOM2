const express = require('express');
const {ServicioController}=require('../controllers/servicio');
const bodyParse = require('body-parser');
const multer = require('multer');
let upload = multer();

const router = express.Router();

module.exports.ServicioAPI = (app) => {

    router
        .post('/create/:idmascota?',bodyParse.urlencoded({extended :true}), bodyParse.json(),upload.none(), ServicioController.createServicioMascota)
    app.use('/servicio', router)
};