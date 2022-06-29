const express = require('express');
const {CuentaController}=require('../controllers/cuenta');
const bodyParse = require('body-parser');
const multer = require('multer');
let upload = multer();

const router = express.Router();

module.exports.CuentaAPI = (app) => {

    router
        .get('/get/', CuentaController.obtenerCuentas)
        .get('/get/:id', CuentaController.obtenerCuentaPorId)

    app.use('/cuenta', router)
};