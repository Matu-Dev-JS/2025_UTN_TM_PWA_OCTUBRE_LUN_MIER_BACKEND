import MemberWorkspace from "../models/MemberWorkspace.model.js";

export const MEMBER_WORKSPACE_TABLE = {
    NAME: 'MemberWorkspace',
    COLUMNS: {
        ID: '_id',
        FK_ID_USER: 'id_user',
        FK_ID_WORKSPACE: 'id_workspace',
        CREATED_AT: 'created_at',
        ROLE: 'role'
    }
}

class MemberWorkspaceRepository {

    /*   
      MongoDB
      static async create(user_id, workspace_id, role) {
          try {
              await MemberWorkspace.insertOne({
                  id_user: user_id,
                  id_workspace: workspace_id,
                  role: role
              })
          }
          catch (error) {
              console.error('[SERVER ERROR]: no se pudo crear el miembro de workspace', error);
              throw error
          }
      } */

    static async create(user_id, workspace_id, role) {
        try{
            let sql=`
            INSERT INTO ${MEMBER_WORKSPACE_TABLE.NAME}
            (${MEMBER_WORKSPACE_TABLE.COLUMNS.FK_ID_USER}, ${MEMBER_WORKSPACE_TABLE.COLUMNS.FK_ID_WORKSPACE}, ${MEMBER_WORKSPACE_TABLE.COLUMNS.ROLE}) 
                VALUES
                (?, ?, ?)
            `
            const [result] = await pool.query(sql, [user_id, workspace_id, role])
            const id_creado = result.insertId
            return await MemberWorkspaceRepository.getById(id_creado)
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo crear el miembro de workspace', error);
            throw error
        }
    }
    static async getAll() {
        try {
            const member_worksapces = await MemberWorkspace.find()
            return member_worksapces
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo obtener la lista de miembros')
            throw error
        }
    }
    /* 
        MONGO DB
    static async getById(member_id) {
        try {
            const member_found = await MemberWorkspace.findById(member_id)
            return member_found
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el miembro con el id' + member_id, error);
            throw error
        }
    } */

    static async getById(member_id){
        try{
            let sql=`
            SELECT * FROM ${MEMBER_WORKSPACE_TABLE.NAME}
            WHERE ${MEMBER_WORKSPACE_TABLE.COLUMNS.ID} = ?
            `
            const [result] = await pool.query(sql, [member_id])
            return result[0]
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo encontrar el miembro con el id' + member_id, error);
            throw error
        }
    }
   /*  
    MONGO DB
    static async deleteById(member_id) {
        try {
            const member_workspeace_delete = await MemberWorkspace.findByIdAndDelete(member_id)
            return member_workspeace_delete
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el miembro con el id' + member_id, error);
            throw error
        }
    } */

    static async deleteById(member_id) {
        try {
            let sql = `
            DELETE FROM ${MEMBER_WORKSPACE_TABLE.NAME}
            WHERE ${MEMBER_WORKSPACE_TABLE.COLUMNS.ID} = ?
            `
            const [result] = await pool.query(sql, [member_id])
            return result
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el miembro con el id' + member_id, error);
            throw error
        }
    }
   /*  
    MONGO DB
   static async updateById(member_id, member_update) {
        try {
            const update = await MemberWorkspace.findByIdAndUpdate(member_id, member_update)
            return update
        }
        catch (error) {
            {
                console.error('[SERVER ERROR]: no se pudo actualizar el miembro', error)
                throw error
            }
        }
    } */

    static async updateById(member_id, member_update) {
        try {
            const update_fields = Object.keys(member_update)
            const update_values = Object.values(member_update)
            const setSQLQuery = update_fields.map(
                (field) => `${field} = ?`
            ).join(' , ')
            let sql = `
                UPDATE ${MEMBER_WORKSPACE_TABLE.NAME}
                SET ${setSQLQuery}
                WHERE ${MEMBER_WORKSPACE_TABLE.COLUMNS.ID} = ? AND ${MEMBER_WORKSPACE_TABLE.COLUMNS.ACTIVE} = 1
            `
            const [result] = await pool.query(sql, [...update_values, member_id])
            return await MemberWorkspaceRepository.getById(member_id)
        }
        catch (error) {
            {
                console.error('[SERVER ERROR]: no se pudo actualizar el miembro', error)
                throw error
            }
        }
    } 

    static async getAllByUserId(user_id) {
        //.populate nos permite expandir los datos de una referencia
        const members = await MemberWorkspace.find({ id_user: user_id }).populate('id_workspace')

        /* Dar formato a la respuesta, ya que mongoose nos da los datos pero desordenados */
        const members_list_formatted = members.map(
            (member) => {
                return {
                    workspace_id: member.id_workspace._id,
                    workspace_name: member.id_workspace.name,
                    workspace_created_at: member.id_workspace.created_at,
                    workspace_url_image: member.id_workspace.url_image,
                    member_id: member._id,
                    member_user_id: member.id_user,
                    member_role: member.role
                }
            }
        )
        return members_list_formatted
    }

    /* 
    MONGO DB
    static async getByUserIdAndWorkspaceId(user_id, workspace_id) {
        const member = await MemberWorkspace.findOne({ id_user: user_id, id_workspace: workspace_id })
        return member
    } */

    static async getByUserIdAndWorkspaceId(user_id, workspace_id) {
        let sql = `
        SELECT * FROM ${MEMBER_WORKSPACE_TABLE.NAME}
        WHERE ${MEMBER_WORKSPACE_TABLE.COLUMNS.FK_ID_USER} = ? AND ${MEMBER_WORKSPACE_TABLE.COLUMNS.FK_ID_WORKSPACE} = ?
        `
        const [result] = await pool.query(sql, [user_id, workspace_id])
        return result[0]
    }
}

export default MemberWorkspaceRepository