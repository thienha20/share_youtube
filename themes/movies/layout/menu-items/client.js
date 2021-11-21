// assets
import WebIcon from '@mui/icons-material/Web';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const client = {
    id: 'client',
    title: 'Client use Api',
    name: 'Client use Api',
    type: 'group',
    icon: AccountTreeIcon,
    children: [
        {
            id: 'client-website',
            title: 'Website',
            name: 'Website',
            type: 'item',
            url: '/client/website',
            icon: WebIcon
        }
    ]
};

export default client;
