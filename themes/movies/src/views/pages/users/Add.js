import React, {useEffect} from "react"

import MainLayout from "../../../../src/layout/MainLayout"
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const Register = () => {
    let isLoggingIn = useSelector(state => state.users.isLoggingIn)
    const history = useHistory()

    useEffect(() => {
        if (isLoggingIn) {
            history.push("/")
        }
    }, [isLoggingIn, history])

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <MainLayout title={"Register"}>
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}

                style={{margin: "15px auto"}}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <AppRegistrationIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    )
}

export default Register
