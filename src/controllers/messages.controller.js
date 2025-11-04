import MessageService from "../services/messages.service.js"

class MessagesController {
    static async getAllByChannelId(request, response){
        try{    
            const {channel_selected, member} = request
            const {messages} = await MessageService.getAllByChannelId(channel_selected._id)
            response.status(200).json({
                ok: true,
                status: 200,
                message: "Messages",
                data: {
                    messages: messages
                },
            });
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
                    'ERROR AL REGISTRAR', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }


    static async create(request, response){
        try{    
            const {channel_selected, member, user} = request
            const {content} = request.body
            //Crear un mensaje
            //(Para la clase que viene) Obtener la lista de mensajes y responder
            const {messages, message_created} = await MessageService.create(content, member._id, channel_selected._id)

            return response.status(201).json({
                ok: true,
                status: 201,
                message: "Messages created",
                data: {
                    messages: messages,
                    message_created: message_created
                },
            });
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
                    'ERROR AL REGISTRAR', error
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

export default MessagesController