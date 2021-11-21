import React, {useEffect} from "react"
import propTypes from "prop-types"
import {Link} from "react-router-dom"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import CssBaseline from "@mui/material/CssBaseline"
import Copyright from "../ui-component/copyright/copyright"
import AppBar from "../ui-component/commons/AppBar"
import CircularProgress from "@mui/material/CircularProgress"
import MovieFilterIcon from "@mui/icons-material/MovieFilter"
import {useSelector, useDispatch} from "react-redux"
import allActions from "../../store/actions"
// ===========================|| MAIN LAYOUT ||=========================== //
const mdTheme = createTheme()

const AuthorizationLayout = props => {
    let loading = useSelector(state => state.commons.loading)
    let user = useSelector(state => state.users.currentUser)
    let isLoggingIn = useSelector(state => state.users.isLoggingIn)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allActions.users.userMe())
    },[dispatch])

    return (
        <ThemeProvider theme={mdTheme}>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <MovieFilterIcon sx={{mr: 2}}/>
                    <Typography variant="h6" component={Link} to="/" color="inherit" noWrap style={{flex: 1}}>
                        Share Movies
                    </Typography>
                    {!isLoggingIn ? <Box className={"header-login"}>
                        <Typography component={Link} to="/login" variant="login">
                            Login
                        </Typography> | <Typography component={Link} to="/register" variant="register">
                        Register
                    </Typography>
                    </Box> : <Box className={"header-login"}>
                        <Typography sx={{mr: 2}}>hi {user.email}</Typography>
                        <Typography component={Link} to="/share" variant="Share Movie" style={{color: "red"}}>
                            Share Movie
                        </Typography> | <Typography component={Link} to="/logout" variant="Logout">
                        Logout
                    </Typography>
                    </Box>}
                </Toolbar>
            </AppBar>
            <Box sx={{display: "flex"}}>
                <Container>
                    <Grid container spacing={1} sx={{mt: 8}} className={"container-height"}>
                        {props.children}
                    </Grid>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
            {loading ? <><Box className={"waiting-background"}> </Box>
                    <CircularProgress className={"waiting-icon"}/></>
                : null}
        </ThemeProvider>
    )
}

AuthorizationLayout.props = {
    title: propTypes.string
}

export default AuthorizationLayout
