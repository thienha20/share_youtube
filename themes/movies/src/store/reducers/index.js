import commonsReducer from "./commonsReducer";
import usersReducer from "./usersReducer";
import shareReducer from "./shareReducer";

const reducers = {
    commons: commonsReducer,
    users: usersReducer,
    shares: shareReducer
}
export default reducers