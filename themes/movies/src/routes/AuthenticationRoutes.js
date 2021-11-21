import { lazy } from 'react';
import Loadable from "../../src/layout/ui-component/Loadable"

const ShareAdd = Loadable(lazy(() => import('../views/pages/shares/Add')))

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = [
    {
        path: '/share/add',
        title: "Share Video",
        component: ShareAdd
    }
];

export default AuthenticationRoutes;
