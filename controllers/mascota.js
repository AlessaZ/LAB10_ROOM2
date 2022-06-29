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
    obtenerMascotas: (req, res)=>{
        let sql = "SELECT * FROM mascota";
        conn.query(sql, function (err,result){
            if(err){
                res.status(500).json({message:'Se ha producido un error', error:err});
            }else{
                for(let i=0;i < result.length;i++){
                    if(result[i].raza_otros == null){
                        result[i].raza_otros = "ninguno";
                    }
                }
                res.status(200).json({message : 'Lista de mascotas', result});
            }
        })
    },
    obtenerMascotaPorId: (req, res) =>{
        let idmascota=req.params.id;

        let sql = "SELECT * FROM mascota WHERE idmascota = ?";
        let params = [idmascota];
        conn.query(sql, params ,function (err,result){
            if (err){
                res.status(500).json({message:'Se ha producido un error', error:err});
            }else{
                if(result.length == 0){
                    res.json({message:'No se encontró la mascota',error: "No existe mascota con ese id"});
                }else{
                    for(let i=0;i < result.length;i++){
                        if(result[i].raza_otros == null){
                            result[i].raza_otros = "ninguno";
                        }
                    }
                    res.status(200).json({message : 'Mascota encontrada', result});
                }
            }
        })

    },

    createMascota: (req, res) => {
        const {body} = req;
        if (!body || Object.keys(body).length===0){
            const {statusCode, message} = new createError.BadRequest();
            res.status(statusCode).json({message});
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
                    res.status(500).json({message:'Se ha producido un error al crear la mascota', error:err});
                } else{
                    let params = [result.insertId]
                    conn.query("select * from mascota where idmascota = ? limit 1", params, function (err, results) {
                        if (err){
                            res.status(500).json({message:'La mascota se ha creado, pero se ha producido un error al visualizarla', error:err});
                        } else {
                            for(let i=0;i < results.length;i++){
                                if(results[i].raza_otros == null){
                                    results[i].raza_otros = "ninguno";
                                }
                            }
                            res.status(201).json({message:'La mascota se ha creado.', mascotaCreada : results});
                        }
                    })
                }
            }) 
        }
    }
}

