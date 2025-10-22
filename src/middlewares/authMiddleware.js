import ENVIRONMENT from "../config/environment.config.js"
import { ServerError } from "../error.js"
import jwt from 'jsonwebtoken'

function authMiddleware(request, response, next) {
    try {
        const auth_header = request.headers.authorization
        if (!auth_header) {
            throw new ServerError(401, 'No hay header de autorizacion')
        }

        const auth_token = auth_header.split(' ')[1]
        if (!auth_token) {
            throw new ServerError(401, 'No hay token de autorizacion')
        }

        const user_session_data = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET)

        //HOT POINT: GUARDAMOS LOS DATOS DEL TOKEN DENTRO DE LA REQUEST
        request.user = user_session_data
        next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            response.status(400).json(
                {
                    ok: false,
                    message: 'Token invalido',
                    status: 400
                }
            )
        }
        else if (error instanceof jwt.TokenExpiredError) {
            response.status(401).json(
                {
                    ok: false,
                    message: 'Token expirado',
                    status: 401
                }
            )
        }
        else if (error.status) {
            return response.status(error.status).json({
                ok: false,
                message: error.message,
                status: error.status
            })
        }
        else {
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

export default authMiddleware