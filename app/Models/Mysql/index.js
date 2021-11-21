import Users from "./Users"
import Shares from "./Shares"
import db from "../../Connectors/mysql"
import {Sequelize} from 'sequelize'
const models = {Users, Shares}
Object.entries(models).forEach(([key, value]) => value.init(db, Sequelize))
Object.entries(models).forEach(([key, value]) => value.associate(models))
export default models