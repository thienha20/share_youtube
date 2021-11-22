import React, {useEffect, useState} from "react"

import MainLayout from "../../../../src/layout/MainLayout"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {ValidateEmail} from "../../../utils/valid"
import allActions from "../../../store/actions"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Password do not match!")
    const [validPassword, setValidPassword] = useState(false)
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)
    let isLoggingIn = useSelector(state => state.users.isLoggingIn)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggingIn) {
            history.push("/")
        }
    }, [isLoggingIn, history])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!ValidateEmail(email)) {
            setValidEmail(true)
            return false
        }
        if (password.length < 4) {
            setErrorMessage("Password must be more than 4 characters")
            setValidPassword(true)
            return false
        }
        if (password !== confirmPassword) {
            setErrorMessage("Password do not match!")
            setValidPassword(true)
            return false
        }
        dispatch(allActions.users.userRegister({
            user: {
                email,
                password
            },
            loading: true
        }, history))
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
                        error={validEmail}
                        onChange={e => {
                            if (ValidateEmail(e.target.value)) {
                                setValidEmail(false)
                            }
                            setEmail(e.target.value)
                        }}
                        helperText={validEmail ? "Email incorrect!" : null}
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
                        onChange={e => {
                            setPassword(e.target.value)
                            if (e.target.value === confirmPassword) {
                                setValidPassword(false)
                                setValidConfirmPassword(false)
                            }
                        }}
                        error={validPassword}
                        helperText={validPassword ? errorMessage : null}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={e => {
                            setConfirmPassword(e.target.value)
                            if (password === e.target.value) {
                                setValidPassword(false)
                                setValidConfirmPassword(false)
                            }
                        }}
                        error={validConfirmPassword}
                        helperText={validConfirmPassword ? "Password do not match!" : null}
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
