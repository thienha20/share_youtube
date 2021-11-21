// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

const routes = [...AuthenticationRoutes, ...MainRoutes];
// ===========================|| ROUTING RENDER ||=========================== //

export default routes;