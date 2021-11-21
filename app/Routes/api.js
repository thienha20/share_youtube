import dotenv from 'dotenv'
import path from "path"

dotenv.config(path.resolve(process.cwd(), '.env'))
export const apiPath = "/api/v1"

export default (app, Controllers) => {
    /* controller API*/
    //-- user Controller
    app.post(apiPath + '/login', (req, res) => Controllers["User"].login(req, res))
    app.post(apiPath + '/me', (req, res) => Controllers["User"].me(req, res))
    app.post(apiPath + '/register', (req, res) => Controllers["User"].register(req, res))
    app.post(apiPath + '/logout', (req, res) => Controllers["User"].logout(req, res))
    //--tasks Controller
    app.get(apiPath + '/shares', (req, res) => Controllers["Share"].list(req, res))
    app.post(apiPath + '/share/add', (req, res) => Controllers["Share"].add(req, res))


}
// sequelize-auto -o "./app/Models/Mysql" -d manabie -h localhost -u root -p 3306 -x  -e mariadb --lang esm --caseModel p -t tasks
