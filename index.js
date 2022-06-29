const express = require('express');
const {MascotaAPI}=require('./apis/mascota');
const {CuentaAPI}=require('./apis/cuenta');
const {ServicioAPI} =require('./apis/servicio');

const app = express();
app.use(express.json());

MascotaAPI(app);
CuentaAPI(app);
ServicioAPI(app);

app.listen(5000, ()=>{
    console.log(`Servidor escuchando en el puerto 5000`)
})
