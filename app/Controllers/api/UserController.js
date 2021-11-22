import Controller from "./Controller"
import UserRepositories from "../../Repositories/UserRepositories"
import {validateEmail} from "../../Helpers/function"
import md5 from "md5"

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
            req.session.userData = {
                user_id: userData.user_id,
                email: userData.email
            }
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
        if (req.session.userData) {
            req.session = null
            res.json({
                status: 200,
                message: "Logout thành công!",
                data: true
            })
        }
    }

    register = async (req, res) => {
        let {email, password} = {...req.body}
        if (!email || !password || !validateEmail(email)) {
            return res.json({
                status: 422,
                message: "Biến truyền vào không đúng"
            })
        }
        if (password.length < 4) {
            return res.json({
                status: 422,
                message: "Mật khẩu không an toàn"
            })
        }
        let users = await UserRepositories.listUsers({
            email: [email]
        })

        if(users[0] && users[0].length>0){
            return res.json({
                status: 400,
                message: "Tài khoản đã tồn tại"
            })
        }
        let userData = await UserRepositories.updateUser({
            email,
            password: md5(md5(password) + email)
        })
        res.json({
            status: 200,
            message: "Thêm tài khoản thành công!",
            data: userData
        })
    }

    me = async (req, res) => {
        res.json({
            status: 200,
            data: req.session?.userData
        })
    }
}

export const objClass = new UserController()
