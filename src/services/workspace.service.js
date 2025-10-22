import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"

class WorkspaceService {
    static async getAll(user_id){
        MemberWorkspaceRepository.getAllByUserId(user_id)
    } 
}


export default WorkspaceService