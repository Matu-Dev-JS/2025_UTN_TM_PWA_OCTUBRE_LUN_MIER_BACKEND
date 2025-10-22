

/api/auth
    - POST register
    - POST login
    - GET verifyEmail
    - GET recoveryPassword
        body: {
            email: 'email a recuperar'
        }
    
    - POST resetPassword
        body{
            new_password
            recovery_token
        }
    

/api/workspace Authenticated
    - GET getAll
        Obtener todos los espacios de trabajo de x usuario
    
    - POST createWorkspace
        Crear un espacio de trabajo
        body: {
            name,
            url_image
        }
    
    /:workspace_id workspaceMiddleware
        - PUT updateWorkspace
            Actualizar un espacio de trabajo
            body: {
                name,
                url_image
            }
        
        - DELETE deleteWorkspace
            Eliminar un espacio de trabajo
        
        - GET getWorkspaceById
            Obtener un espacio de trabajo por id

        /invite

            - POST  inviteUserByEmail
                Invitar un usuario a un espacio de trabajo
                Enviar un mail de invitacion a ese usuario si existe
                body: {
                    email
                }

/api/member
    GET /acept-invite/:invite_token
        Aceptar una invitacion a un espacio de trabajo
        Crear un miembro en el espacio de trabajo 
