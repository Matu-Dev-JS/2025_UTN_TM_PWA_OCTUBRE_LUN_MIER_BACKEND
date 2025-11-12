import pool from "../config/configMysql.config.js";
import Workspace from "../models/Workspace.model.js";

export const WORKSPACE_TABLE = {
    NAME: "Workspaces",
    COLUMNS: {
        ID: "_id",
        NAME: "name",
        URL_IMAGE: "url_image",
        CREATED_AT: "created_at",
        MODIFIED_AT: "modified_at",
        ACTIVE: "active"
    }
}

class WorkspaceRepository {
    /*  static async create(name, url_image) {
         try {
             return await Workspace.insertOne({
                 name: name,
                 url_image: url_image
             })
         }
         catch (error) {
             console.error('[SERVER ERROR]: no se pudo crear el workspace', error);
             throw error
         }
     } */

    static async create (name, url_image){
        try{
            let sql=`
                INSERT INTO ${WORKSPACE_TABLE.NAME}
                (${WORKSPACE_TABLE.COLUMNS.NAME}, ${WORKSPACE_TABLE.COLUMNS.URL_IMAGE}) 
                VALUES
                (?, ?)
            `
            const [result] = await pool.query(sql, [name, url_image])
            const id_creado = result.insertId
            return await WorkspaceRepository.getById(id_creado)
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo crear el workspace', error);
            throw error
        }
    }

    static async getById(workspace_id){
        try{
            let sql=`
            SELECT * FROM ${WORKSPACE_TABLE.NAME}
            WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ? AND ${WORKSPACE_TABLE.COLUMNS.ACTIVE } = 1
            `
            const [result]=await pool.query(sql, [workspace_id])
            return result[0]
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo encontrar el workspace con el id'+ workspace_id, error);
            throw error
        }
    }

   /*  
   MONGO DB
   static async getById(workspace_id) {
        try {
            const workspace_found = await Workspace.findById(workspace_id)
            return workspace_found
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el workspace con el id' + workspace_id, error);
            throw error
        }
    } */

    
   /*  
    MongoDB
   static async getAll() {
        try {
            const worksapces = await Workspace.find({ active: true })
            return worksapces
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo obtener la lista de worksapces')
            throw error
        }
    } */
   static async getAll(){
        try{
            let sql=`
            SELECT * FROM ${WORKSPACE_TABLE.NAME} WHERE ${WORKSPACE_TABLE.COLUMNS.ACTIVE} = 1
            `
            const [result] = await pool.query(sql)
            return result
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de worksapces', error);
            throw error
        }
    }
   /*  
    MONGODB
   static async deleteById(workspace_id) {
        try {
            const workspaece_delete = await Workspace.findByIdAndDelete(workspace_id)
            return workspaece_delete
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el worksapce con el id' + workspace_id, error);
            throw error
        }
    } */

    /* MYSQL */

    static async deleteById(workspace_id){
        try{
            let sql=`
            DELETE FROM ${WORKSPACE_TABLE.NAME}
            WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ?
            `
            const [result] = await pool.query(sql, [workspace_id])
            return result
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el worksapce con el id' + workspace_id, error);
            throw error
        }
    }

    /* 
        MONGODB
        static async updateById(worksapce_id, worksapce_update) {
            try {
                const update = await Workspace.findByIdAndUpdate(worksapce_id, worksapce_update)
                return update
            }
            catch (error) {
                console.error('[SERVER ERROR]: no se pudo actualizar el workspace', error)
                throw error
            }
        } */

    static async updateById(workspace_id, update_workspace) {
        try{
            const update_fields=Object.keys(update_workspace)
            const update_values=Object.values(update_workspace)
            const setSQLQuery = update_fields.map(
                (field)=> `${field} = ?`
            ).join(', ')
            let sql=`
                UPDATE ${WORKSPACE_TABLE.NAME}
                SET ${setSQLQuery}
                WHERE ${WORKSPACE_TABLE.COLUMNS.ID} = ? AND ${WORKSPACE_TABLE.COLUMNS.ACTIVE} = 1
            `
            
            pool.query(sql, [...update_values, workspace_id])
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el workspace', error)
            throw error
        }
    }
}

export default WorkspaceRepository