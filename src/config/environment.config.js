import dotenv from 'dotenv'


//Cargar las variables de entorno en process.env
dotenv.config()


//Diccionario donde guando mis variables de entorno
const ENVIRONMENT = {
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    PORT: process.env.PORT,
    URL_FRONTEND: process.env.URL_FRONTEND,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    URL_BACKEND: process.env.URL_BACKEND,

    MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
    MYSQL_DB_HOSTNAME: process.env.MYSQL_DB_HOSTNAME,
    MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME, 
    MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    /*   MONGO_DB_HOST: process.env.MONGO_DB_HOST,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME, */
}


export default ENVIRONMENT