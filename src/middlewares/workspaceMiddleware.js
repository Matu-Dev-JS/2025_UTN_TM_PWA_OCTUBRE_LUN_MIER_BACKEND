import { ServerError } from "../error.js"
import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"


/* 
Checkear que el workspace con x ID exista
Checkear si el cliente es un miembro de ese workspace
Checkear si el miembro cuenta con el rol permitido
*/
function workspaceMiddleware(valid_member_roles = []) {
    return async function (request, response, next) {
        try {

            const { workspace_id } = request.params
            const user = request.user

            //Checkear que el workspace con x ID exista
            const workspace_selected = await WorkspaceRepository.getById(workspace_id)
            if (!workspace_selected) {
                throw new ServerError(404, 'Workspace no encontrado')
            }

            //Checkear si el cliente es un miembro de ese workspace
            const member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user.id, workspace_id)
            if (!member) {
                throw new ServerError(403, 'No tienes acceso a este espacio de trabajo')
            }

            //Checkear si el miembro cuenta con el rol permitido
            if (valid_member_roles.length > 0 && !valid_member_roles.includes(member.role)) {
                throw new ServerError(403, 'No puedes esta operacion')
            }

            //Guardamos en la request los datos del miembro
            request.member = member

            //Guardamos en la request los datos del espacio de trabajo
            request.workspace_selected = workspace_selected
            next()
        }
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR en workspaceMiddleware', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
}

export default workspaceMiddleware
/*
TODOS los middlewares deben recibir a request, response, next
*/

//workspaceMiddleware(['admin']) //Deje pasar al admin
//workspaceMiddleware(['admin', 'user']) //Deje pasar al admin y al user
//workspaceMiddleware() //Deje pasar a todos
