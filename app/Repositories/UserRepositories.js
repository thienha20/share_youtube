import Models from '../Models/Mysql/'
import md5 from 'md5'
class UserRepositories {
    UserModel = null
    constructor() {
        this.UserModel = Models.Users
    }

    getUser = async (params) => {
        let {email, password, customFields, userId} = {...params}
        let defaultFields = [
            "user_id",
            "email"
        ]
        if(customFields) defaultFields = customFields
        let condition = {}
        if(userId){
            condition.user_id = userId
        }
        if(email && password){
            password = md5(md5(password) + email)
            condition.email = email
            condition.password = password
        }
        let user = []
        try{
            user = await this.UserModel.findOne({
                attributes: defaultFields,
                where: condition
            })

        }catch (e) {
            return null
        }
        return user
    }

    listUsers = async (params, per_page = 10) => {
        let {email, userId, sort, limit, page, item_per_page, customFields} = {...params}
        let defaultFields = [
            "*"
        ]
        if(customFields) {
            defaultFields = {...customFields}
        }
        let condition = {}
        if(userId){
            condition.user_id = userId
        }
        if(email){
            if(!Array.isArray(email)){
                email = email.split(",")
            }
            condition.email = email
        }

        let Users = []
        let offset = 0
        let order = null
        if (sort) {
            order = sort
        }
        try{
            if (!limit) {
                params.total = await this.UserModel.count({
                    where: condition
                })
                let per = !item_per_page ? per_page : item_per_page
                if (page) {
                    if (page < 1) page = 1
                    offset = (page - 1) * per
                }
            }
            Users = await this.UserModel.findAll({
                attributes: defaultFields,
                where: condition,
                offset: offset,
                limit: limit,
                order: order
            })
        }catch (e) {
            return null
        }

        return [Users, params]
    }

    updateUser = async (params, userId = 0) => {
        try{
            let user
            if (userId === 0) {
                user = await this.UserModel.create(params)
            } else {
                user = await this.UserModel.update(params, {
                    where: {
                        user_id: userId
                    }
                })
            }
            return user
        }catch (e) {
            return false
        }
    }

    deleteUser = async (params) => {
        let {userId} = {...params}
        try{
            await this.UserModel.destroy({
                where: { user_id: userId }
            })
        }catch (e) {
            return false
        }
        return true
    }

}

export default new UserRepositories()
