import commonsReducer from "./commonsReducer";
import usersReducer from "./usersReducer";
import paymentsReducer from "./paymentsReducer";
import smsReducer from "./smsReducer";
import sapReducer from "./sapReducer";
import authReducer from "./authReducer";
import settingsReducer from "./settingsReducer";

const reducers = {
    commons: commonsReducer,
    users: usersReducer,
    payments: paymentsReducer,
    sms: smsReducer,
    sap: sapReducer,
    auth: authReducer,
    settings: settingsReducer
}
export default reducers