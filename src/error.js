
export class CustomError extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    }
}

const manejarError = (accionCallback) =>{
    try{
        accionCallback()
    }
    catch(error){
        if(error.status){
            console.error('[CLIENT ERROR]: ' + error.message, 'Status: ' + error.status)
        }
        else{
            console.error('[SERVER ERROR]: ' + error.message)
        }
    }
}


export class ServerError extends Error{
    constructor(status, message){
        super(message)
        this.status = status
    }
}

