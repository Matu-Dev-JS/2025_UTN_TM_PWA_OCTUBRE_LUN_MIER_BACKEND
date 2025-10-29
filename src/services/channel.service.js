import ChannelRepository from "../repositories/channel.repository.js";

class ChannelService {
    static async getAllByWorkspaceId (workspace_id){
        return await ChannelRepository.getAllByWorkspaceId(workspace_id)
    }
}


export default ChannelService