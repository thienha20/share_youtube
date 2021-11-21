import Controller from "./Controller"
import UserRepositories from "../../Repositories/UserRepositories"

class UserController extends Controller {

    constructor() {
        super()
    }

    login = async (req, res) => {
        let params = {...req.body}
        if (!params.email || !params.password) {
            return res.json({
                status: 422,
                message: "Biến truyền vào không đúng"
            })
        }
        let userData = await UserRepositories.getUser({
            email: params.email,
            password: params.password
        })
        if (userData != null && userData) {
            req.session.userData = userData
            res.json({
                status: 200,
                message: "Thành công!",
                data: userData
            })
        } else {
            return res.json({
                status: 400,
                message: "Tài khoản không tồn tại"
            })
        }
    }


    logout = async (req, res) => {
        if(req.session.userData){
            req.session.reload((err) => {
               if(err){
                   res.json({
                       status: 500,
                       message: "Lổi hệ thống không thể logout"
                   })
               }else{
                   res.json({
                       status: 200,
                       message: "Logout thành công!",
                       data: true
                   })
               }
            })
        }
    }

    me = async (req, res) => {
        res.json({
            status: 200,
            data: req.session.userData
        })
    }
}

export const objClass = new UserController()
