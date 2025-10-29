class ChannelController {
    static async create(request, response) {
        try {
            const {workspace_selected, user, member} = request
            //Hasta este punto ya se valido que sea miembro, administrador y en que espacio de trabajo estamos trabajando
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
                    'ERROR AL CREAR UN CANAL', error
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


export default ChannelController