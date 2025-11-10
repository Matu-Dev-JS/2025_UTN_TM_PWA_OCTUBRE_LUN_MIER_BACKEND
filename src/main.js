import ENVIRONMENT from "./config/environment.config.js";
import connectToMongoDB from "./config/configMongoDB.config.js";
import express from 'express'
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import cors from 'cors'
import memberRouter from "./routes/member.router.js";
import MessagesChannelRepository from "./repositories/messageChannel.repository.js";
import ChannelRepository from "./repositories/channel.repository.js";
import { checkConnection } from "./config/configMysql.config.js";
import UserRepository from "./repositories/user.repository.js";


connectToMongoDB()

const app = express()

//Configuro a mi API como API publica, cualquier dominio puede hacer peticiones
app.use( cors() )


app.use(express.json())

//Todas las consultas que empiezen con /api/auth va a ser gestionadas por el authRouter
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/member', memberRouter)

/* mailTransporter.sendMail(
    {
        from: ENVIRONMENT.GMAIL_USER, //Desde quien
        to:  'mati.dev.gimenez@gmail.com', //Hacia adonde enviar
        subject: 'Mail de prueba', //asunto
        html: `<h1>Hola desde node js</h1>` //Body del mail
    }
) */


app.listen(
    ENVIRONMENT.PORT || 8080,
    () => {
        console.log(`Tu servidor se esta ejecutando correctamente en el puerto ${ENVIRONMENT.PORT}`)
    }
)

/* ChannelRepository.getAllByWorkspaceId() */


/* MessagesChannelRepository.create(
    "69021f8d1f59e8d52c3e60f8",
    "68f8d8cc6968605f86bc6c90",
    'hola'
) */
/* MessagesChannelRepository.getAllByChannelId("69021f8d1f59e8d52c3e60f8").then(
    (messages) => console.log(messages[0])
) */

checkConnection()

UserRepository.create('test', 'test@gmail.com', 'Test')