import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import MainLayout from "../../../layout/MainLayout"
import {useSelector, useDispatch} from "react-redux"
import allActions from "../../../store/actions"
import {ValidateEmail} from "../../../utils/valid"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validEmail, setValidEmail] = useState(false)
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
        dispatch(allActions.users.userLogin({
            user:{
                email,
                password
            },
            loading:true
        }))
    }

    return (
        <MainLayout title={"Login"}>
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
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        onChange={e => {
                            if (ValidateEmail(e.target.value)) {
                                setValidEmail(false)
                            }
                            setEmail(e.target.value)
                        }}
                        autoFocus
                        error={validEmail}
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
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    )
}

export default Login
