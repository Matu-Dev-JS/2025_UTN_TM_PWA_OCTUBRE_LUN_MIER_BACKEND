import jwt from 'jsonwebtoken'
import ENVIRONMENT from '../config/environment.config.js'
import MemberWorkspaceRepository from '../repositories/memberWorkspace.repository.js'
import { ServerError } from '../error.js'
import MemberWorkspaceService from '../services/memberWorkspace.service.js'

class MemberController {
    static async confirmInvitation (request, response){
        try{
            const {invitation_token} = request.params
            /* 
              {
                id_invited: user_invited._id,
                id_inviter: member._id,
                id_workspace: workspace_selected._id,
                invited_role: role_invited
            },
            */
            await MemberWorkspaceService.confirmInvitation(invitation_token)
            response.redirect(`${ENVIRONMENT.URL_FRONTEND}/login`)
        }
         catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                return response.status(400).json(
                    {
                        ok: false,
                        message: 'Token invalido',
                        status: 400
                    }
                )
            }
            else if(error instanceof jwt.TokenExpiredError){
                return response.status(400).json(
                    {
                        ok: false,
                        message: 'Token expirado, volve a solicitar que te inviten',
                        status: 400
                    }
                )
            }
            else if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL confirmar invitacion', error
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

export default MemberController