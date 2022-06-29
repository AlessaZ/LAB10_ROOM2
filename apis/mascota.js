const express = require('express');
const {MascotasController}=require('../controllers/mascota');
const bodyParse = require('body-parser');
const multer = require('multer');
let upload = multer();

const router = express.Router();

module.exports.MascotaAPI = (app) => {
    router
    .post('/create',bodyParse.urlencoded({extended :true}), bodyParse.json(),upload.none(), MascotasController.createMascota)
   
    app.use('/mascota', router)
}; 