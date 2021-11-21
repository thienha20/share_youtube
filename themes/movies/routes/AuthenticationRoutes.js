import { lazy } from 'react';
import Loadable from "../../src/layout/ui-component/Loadable"

const UsersManagement = Loadable(lazy(() => import('../views/pages/users/Share')))

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = [
    {
        path: '/users/share',
        title: "Users Manage",
        component: UsersManagement
    }
];

export default AuthenticationRoutes;
