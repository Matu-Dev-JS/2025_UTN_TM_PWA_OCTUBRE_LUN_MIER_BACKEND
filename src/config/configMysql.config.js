import mysql from 'mysql2'
import ENVIRONMENT from './environment.config.js'

/* Es una instancia de acceso a nuestra DB */
const pool = mysql.createPool(
    {
        host: ENVIRONMENT.MYSQL_DB_HOSTNAME,
        user: ENVIRONMENT.MYSQL_DB_USERNAME,
        password: ENVIRONMENT.MYSQL_DB_PASSWORD,
        database: ENVIRONMENT.MYSQL_DB_NAME
    }
).promise()


export async function checkConnection () {
    try{
        //Una query tonta para probar si funciona
        await pool.query('SELECT 1')
        console.log('Base de datos MYSQL conectada con exito')
    }
    catch(error){
        console.error("Error al conectarse a la DB mysql")
    }
}

export default pool