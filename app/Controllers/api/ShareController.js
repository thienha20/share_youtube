import Controller from "./Controller"
import ShareRepositories from "../../Repositories/ShareRepositories"
import {valid_youtube_link} from "../../Helpers/function"

class ShareController extends Controller {

    constructor() {
        super()
    }

    list = async (req, res) => {
        let params = {...req.body, getUserInfo: true}
        let listShares = await ShareRepositories.listShares(params)
        res.json({
            status: 200,
            message: "Thành công!",
            data: listShares
        })
    }

    add = async (req, res) => {
        let {link} = {...req.body}
        if(!link){
            return res.json({
                status: 400,
                message: "Dữ liệu truyền lên không đúng!"
            })
        }
        let code = valid_youtube_link(link)
        if(!code){
            return res.json({
                status: 400,
                message: "Link youtube không đúng!"
            })
        }
        let Share = await ShareRepositories.updateShare({
            user_id: req.session.userData["user_id"],
            link,
            code
        })

        if(!Share){
            return res.json({
                status: 500,
                message: "Lổi không thể thêm vào!"
            })
        }

        return res.json({
            status: 200,
            message: "Thêm vào thành công!",
            data: Share
        })

    }
}

export const objClass = new ShareController()
