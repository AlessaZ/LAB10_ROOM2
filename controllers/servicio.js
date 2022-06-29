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

module.exports.ServicioController = {
    createServicioMascota: (req,res) => {
        const {body} = req;

        if (!body || Object.keys(body).length===0) {
            const {statusCode, message} = new createError.BadRequest();
            res.status(statusCode).json({message});
        }else{
            let idmascota=req.params.idmascota;
            let cuenta = req.body.cuenta_idcuenta;
            let inicio = req.body.hora_inicio;
            let dura = req.body.duracion;
            let entrega = req.body.entrega;
            let responsable = req.body.responsable_idresponsable;
            let params = [idmascota,cuenta,inicio,dura,entrega,responsable]
            let sql = "INSERT INTO `sandylance`.`servicio` (`mascota_idmascota`, `cuenta_idcuenta`, `hora_inicio`, `duracion`, `entrega`, `responsable_idresponsable`) VALUES (?,?, ?,?, ?, ?)";
            conn.query(sql,params,function (err,result){
                if(err){
                    res.status(500).json({message:'Se ha producido un error al crear el servicio.', error:err});
                } else{
                    let params = [result.insertId]
                    conn.query("select * from servicio where idservicio = ? limit 1", params, function (err, results) {
                        if (err){
                            res.status(500).json({message:'El servicio está creado, pero se ha producido un error al visualizarlo.', error:err});
                        } else {
                            res.status(201).json({message:'El servicio se ha creado.', servicioCreado : results});
                        }
                    })
                }
            })
        }
    }
}
