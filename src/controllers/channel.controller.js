import ChannelService from "../services/channel.service.js";

class ChannelController {
    static async create(request, response) {
        try {
            const { workspace_selected } = request;
            const { name } = request.body;
            // Validar nombre de canal ok
            if (!name) {
                return response.status(400).json({
                    ok: false,
                    message: 'El nombre del canal es requerido',
                });
            }
            // Crear el canal usando .createChannel
            const channel_list = await ChannelService.create(workspace_selected.id, name);
            response.status(201).json({
                ok: true,
                message: 'Canal creado',
                status: 201,
                data: {
                    channels: channel_list
                }
            });
        } catch (error) {
            console.error('Error al crear:', error);
            response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
            });
        }
    }
}


export default ChannelController