import React, {useEffect, useState} from 'react'
import propTypes from 'prop-types'
import {useHistory} from "react-router"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import Copyright from "../ui-component/copyright/copyright"
import AppBar from "../ui-component/commons/AppBar"
import Drawer from "../ui-component/commons/Drawer"
import {MenuListItems, menuItems} from "../menu-items"
import {IconBreadcrumbs} from "../ui-component/commons/Breadcrumbs"
import {MenuAppBar} from "../ui-component/commons/MenuAppBar"
import CircularProgress from "@mui/material/CircularProgress"
import { useSelector} from "react-redux"
// ===========================|| MAIN LAYOUT ||=========================== //
const mdTheme = createTheme();
const AuthorizationLayout = props => {
    const [title, setTitle] = useState(props.title ?? "Reports gateway");
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    let loading = useSelector(state => state.commons.loading)
    const history = useHistory();
    // const dispatch = useDispatch()

    useEffect(() => {
        for (let parent of menuItems){
            if (parent.url === history.location.pathname) {
                setTitle(parent.title)
                document.title = parent.title;
                return false;
            }
            for (let c in parent.children) {
                if (parent.children[c].url === history.location.pathname) {
                    setTitle(parent.children[c].title)
                    document.title = parent.children[c].title;
                    return false;
                }
            }
        }
    },[history, setTitle]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <MenuAppBar title={title}/>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <label style={{color:"orange"}}>TATMART Gateway API</label>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>

                    <Divider />
                    <MenuListItems open={open}/>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
                        <IconBreadcrumbs />
                        <Grid container spacing={1} sx={{mt:2}} className={'container-height'}>
                                {props.children}
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
            {loading ?<><Box className={'waiting-background'}> </Box>
            <CircularProgress className={'waiting-icon'} /></>
            : null}
        </ThemeProvider>
    )
};

AuthorizationLayout.props = {
    title: propTypes.string
}
export default AuthorizationLayout;
