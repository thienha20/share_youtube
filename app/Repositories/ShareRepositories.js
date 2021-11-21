import Models from '../Models/Mysql/'
class ShareRepositories {
    ShareModel = null
    constructor() {
        this.ShareModel = Models.Shares
    }

    getShare = async (params) => {
        let {shareId, userId, code, link, customFields} = {...params}
        let defaultFields = [
            "share_id",
            "user_id",
            "link",
            "youtube_code",
            "timestamp"
        ]
        if(customFields) {
            defaultFields = {...customFields}
        }
        let condition = {}
        if(shareId){
            condition.share_id = shareId
        }
        if(userId){
            condition.user_id = userId
        }
        if(code){
            condition.code = code
        }
        if(link){
            condition.link = link
        }
        let Share = []
        try{
            Share = await this.ShareModel.findOne({
                attributes: defaultFields,
                where: condition
            })
        }catch (e) {
            return null
        }
        return Share
    }

    listShares = async (params, per_page = 10) => {
        let {shareId, userId, code, link, getUserInfo, sort, limit, page, item_per_page, customFields} = {...params}
        let defaultFields = [
            "*"
        ]
        if(customFields) {
            defaultFields = {...customFields}
        }
        let condition = {}
        if(shareId){
            condition.share_id = shareId
        }
        if(userId){
            condition.user_id = userId
        }
        if(code){
            if(!Array.isArray(code)){
                code = code.split(",")
            }
            condition.code = code
        }
        if(link) {
            condition.link = link
        }

        let Shares = []
        let offset = 0
        let order = null
        let includes = null
        if(getUserInfo){
            includes = [{
                model: Models.Users,
                attributes: ["email"]
            }]
        }
        if (sort) {
            order = sort
        }
        try{
            if (!limit) {
                params.total = await this.ShareModel.count({
                    where: condition
                })
                let per = !item_per_page ? per_page : item_per_page
                if (page) {
                    if (page < 1) page = 1
                    offset = (page - 1) * per
                }
            }
            Shares = await this.ShareModel.findAll({
                attributes: defaultFields,
                include: includes,
                where: condition,
                offset: offset,
                limit: limit,
                order: order
            })
        }catch (e) {
            console.log(e)
            return null
        }

        return [Shares, params]
    }

    updateShare = async (params, ShareId = 0) => {
        try{
            let Share
            if (ShareId === 0) {
                Share = await this.ShareModel.create(params)
            } else {
                Share = await this.ShareModel.update(params, {
                    where: {
                        Share_id: ShareId
                    }
                })
            }
            return Share
        }catch (e) {
            return false
        }
    }

    deleteShare = async (params) => {
        let {ShareId} = {...params}
        try{
            await this.ShareModel.destroy({
                where: { share_id: ShareId }
            })
        }catch (e) {
            return false
        }
        return true
    }

}

export default new ShareRepositories()
