
import ENVIRONMENT from "../config/environment.config.js"
import mailTransporter from "../config/mailTransporter.config.js"
import { ServerError } from "../error.js"
import ChannelRepository from "../repositories/channel.repository.js"
import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import UserRepository from "../repositories/user.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import ChannelService from "../services/channel.service.js"
import WorkspaceService from "../services/workspace.service.js"
import jwt from 'jsonwebtoken'

class WorkspaceController {

    
    static async getAll (request, response){
        try{
            //Muestro los datos de sesion del usuario
            const user = request.user

            //Necesito saber el user_id del cliente para saber exactamente quien es y que lista debo darle
            const workspaces = await WorkspaceService.getAll(user.id)

            response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: 'Espacios de trabajo obtenidos exitosamente',
                    data: {
                        workspaces: workspaces
                    }
                }
            )
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL OBTENER LOS WORKSPACES', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async create (request, response){
        try{
            const user = request.user
            const {name, url_img} = request.body

            const workspace_created = await WorkspaceService.create( user.id, name, url_img )

            response.status(201).json(
                {
                    status: 201,
                    ok: true,
                    message: 'Workspace creado con exito',
                    data: {
                        workspace_created
                    }
                }
            )
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL OBTENER LOS WORKSPACES', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async invite(request, response){
        try{
            const {member, workspace_selected, user} = request
            const {email_invited, role_invited} = request.body
           
            await WorkspaceService.invite(member, workspace_selected, email_invited, role_invited)
            response.json({
                status: 200,
                message: 'Invitacion enviada',
                ok: true
            })
            /* 
                - Verificar que exista un usuario (EN LA DB) con el email_invited
                    Por?: Hay que checkear que el usuario invitado existe
                    EJEMPLO: Los invito a un grupo de wsp y ustedes no tienen wsp
                    Sino existe tirar error 404
                
                - Verificar que YA NO ESTE en el workspace, sino seria un miembro duplicado

                - Generar un token con: 
                {
                    id_invited,
                    id_inviter,
                    id_workspace,
                    invited_role
                }
                
                - Enviar el mail de invitacion
                    Ejemplo: 
                        `
                        <h1>Has sido invitado al workspace: ${workspace_select.name}</h1>
                        <a href="${URL_FRONTEND}/api/member/confirm/${invite_token}"">Aceptar</a>
                        `
            */
        }
         catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL invitar', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async getById (request, response){
        try{
            const {workspace_selected, member, user} = request

            const channels = await ChannelService.getAllByWorkspaceId(workspace_selected._id)

            response.json(
                {
                    ok:true, 
                    status: 200,
                    message: 'Espacio de trabajo obtenido',
                    data: {
                        workspace_detail: workspace_selected,
                        channels: channels
                    }
                }
            )
        }
         catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL obtener detalles del workspace', error
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

export default WorkspaceController