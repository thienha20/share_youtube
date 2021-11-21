// assets
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const users = {
    id: 'users',
    title: 'Users',
    name: 'Users',
    type: 'group',
    icon: PersonIcon,
    children: [
        {
            id: 'user-manage',
            title: 'Users Manage',
            name: 'Manage',
            type: 'item',
            url: '/users/manage',
            icon: ManageSearchIcon
        },
        {
            id: 'user-add',
            title: 'User Add',
            name: 'Add',
            type: 'item',
            url: '/user/add',
            icon: PersonAddIcon
        }
    ]
};

export default users;
