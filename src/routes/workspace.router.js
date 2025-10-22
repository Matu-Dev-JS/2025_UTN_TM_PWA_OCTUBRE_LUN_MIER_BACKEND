import express from 'express'
import WorkspaceRepository from '../repositories/workspace.repository.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

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



export default workspaceRouter