import {lazy} from 'react'
import Loadable from "../../src/layout/ui-component/Loadable"
const Login = Loadable(lazy(() => import('../views/pages/login/Login')))
const Page404 = Loadable(lazy(() => import('../views/pages/page404/Page404')))
const Page500 = Loadable(lazy(() => import('../views/pages/page500/Page500')))
const Index = Loadable(lazy(() => import('../views/pages/dashboard/index')))
const UsersAdd = Loadable(lazy(() => import('../views/pages/users/Add')))
// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = [
    {
        path: '/',
        title: "Home Page",
        component: Index,
    },
    {
        path: '/users/add',
        title: "Add User",
        component: UsersAdd
    },
    {
        path: "/login",
        title: "Login",
        component: Login
    },
    {
        path: "/404",
        title: "Page not found",
        component: Page404
    },
    {
        path: "/500",
        title: "Internal Server Error",
        component: Page500
    }
];

export default MainRoutes;
