const createError = require('http-errors');
const mysql = require('mysql2');

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
     password: 'root',
     port: 3306,
     database : 'sandylance'
 });
 
 conn.connect(function (err){
    if(err) throw err;
    console.log("Conexion exitosa")
 });

module.exports.MascotasController = {
    createMascota: (req, res) => {
        const {body} = req;
        if (!body || Object.keys(body).length===0){
            Response.error(res, new createError.BadRequest());
        }else{
            let nombre = req.body.nombre;
            let anho = req.body.anho;
            let historia = req.body.historia;
            let observaciones = req.body.observaciones;
            let sexo = req.body.sexo;
            let raza_especie_idraza = req.body.raza_especie_idraza;
            let raza_otros = req.body.raza_otros;
            let cuenta_idcuenta = req.body.cuenta_idcuenta;
            let mascota = [nombre,anho,historia,observaciones,sexo,raza_especie_idraza,raza_otros,cuenta_idcuenta]
            let sql = "INSERT INTO `sandylance`.`mascota` (`nombre`, `anho`, `historia`, `observaciones`, `sexo`, `raza_especie_idraza`, `raza_otros`,`cuenta_idcuenta`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            conn.query(sql,mascota,function (err,result){
                if(err){
                    res.status(500).json({message:'Se ha producido un error', error:err});
                }else{
                    res.status(201).json({message : 'Mascota agregade', result});
                }
            }) 
        }
    },
}