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

module.exports.CuentaController = {

    obtenerCuentas:(req, res) =>{

        let sql = "SELECT * FROM cuenta";
        conn.query(sql, function (err,result){
            if(err){
                res.status(500).json({message:'Se ha producido un error', error:err});
            }else{
                res.status(201).json({message : 'Lista de cuentas', result});
            }
        })
    },

    obtenerCuentaPorId: (req, res) =>{

        let idcuenta = req.params.id;

        let sql = "SELECT * FROM cuenta WHERE idcuenta = ?";
        let params = [idcuenta];

        conn.query(sql, params ,function (err,result){
            if (err){
                res.status(500).json({message:'Se ha producido un error', error:err});
            }else{
                if(result.length == 0){
                    res.json({err: "No existe cuenta con ese id"});
                }else{
                    res.status(201).json({message : 'Cuenta encontrada', result});
                }
            }
        })
    },

}

