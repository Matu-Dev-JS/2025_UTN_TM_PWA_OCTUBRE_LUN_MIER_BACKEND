import express from 'express'
import WorkspaceRepository from '../repositories/workspace.repository.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js'

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

// GET /workspaces/:workspace_id
/* 
- Obtener los detalles de un espacio de trabajo
- Cargar la lista de canales de un espacio de trabajo
*/
workspaceRouter.get(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(),
    WorkspaceController.getById
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