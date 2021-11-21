import { lazy } from 'react';
import Loadable from "../../src/layout/ui-component/Loadable"

const shareAdd = Loadable(lazy(() => import('../views/pages/shares/Add')))

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = [
    {
        path: '/share/add',
        title: "Share Video",
        component: shareAdd
    }
];

export default AuthenticationRoutes;
