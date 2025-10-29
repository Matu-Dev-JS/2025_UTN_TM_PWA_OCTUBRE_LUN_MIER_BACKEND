class MessagesController {
    static async getAllByChannelId(request, response){
        try{    
            const {channel_selected, member} = request

        }
        catch(error){

        }
    }


    static async create(request, response){
        try{    
            const {channel_selected, member, user} = request
            const {content} = request.body
            //Crear un mensaje
            //(Para la clase que viene) Obtener la lista de mensajes y responder
        }
        catch(error){

        }
    }
}

export default MessagesController