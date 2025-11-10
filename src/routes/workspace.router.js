import express from 'express'
import WorkspaceRepository from '../repositories/workspace.repository.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js'
import ChannelController from '../controllers/channel.controller.js'
import channelMiddleware from '../middlewares/channelMiddleware.js'
import MessagesController from '../controllers/messages.controller.js'

const workspaceRouter = express.Router()


/* workspaceRouter.get(
    '/all',
    WorkspaceController.getAll
) */


/* 
Obtener la lista de espacios de trabajo DEL CLIENTE QUE ME ESTE CONSULTANDO
*/
workspaceRouter.get(
    '/',
    authMiddleware,
    WorkspaceController.getAll
)


workspaceRouter.post(
    '/',
    authMiddleware,
    WorkspaceController.create
)

// POST /workspaces/:workspace_id/channels (Solo admins)
/* 
body: {
    name
}
- Crear un nuevo canal
*/

// GET /workspaces/:workspace_id
/* 
- Obtener los detalles de un espacio de trabajo
- Cargar la lista de canales de un espacio de trabajo
*/


workspaceRouter.get(
    '/:workspace_id/channels',
    authMiddleware,
    workspaceMiddleware(),
    WorkspaceController.getById
)

workspaceRouter.post(
    '/:workspace_id/channels',
    authMiddleware,
    workspaceMiddleware(['admin']), // => Solo miembros con rol de administrador pueden crear canales
    ChannelController.create
)

//CONSIGNA:
//Crear los controladores para crear mensajes y obtener mensajes
//Siempre que se cree o obtenga la lista el servidor debera responder con la lista de mensajes

//Crear mensajes
workspaceRouter.post(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.create
)
//Obtener mensajes
workspaceRouter.get(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.getAllByChannelId
)


workspaceRouter.get(
    '/:workspace_id/test',
    authMiddleware,
    workspaceMiddleware(),
    (request, response) => {
        console.log(request.workspace_selected)
        console.log(request.member)
        response.json({
            ok: true,
            status: 200,
            message: 'test'
        })
    }
)


workspaceRouter.post(
    '/:workspace_id/invite', 
    authMiddleware, 
    workspaceMiddleware(['admin']), 
    WorkspaceController.invite
)

export default workspaceRouter