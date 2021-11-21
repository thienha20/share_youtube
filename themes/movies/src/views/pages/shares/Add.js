import React, {useEffect} from "react"
import MainLayout from "../../../../src/layout/MainLayout"
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

//= ===============================|| AUTH3 - LOGIN ||================================//

const ShareAdd = () => {

    const isLoggingIn = useSelector(state => state.users.isLoggingIn)
    const history = useHistory()

    useEffect(() => {
        if (!isLoggingIn) {
            history.push("/")
        }
    }, [isLoggingIn, history])

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <MainLayout title={"Share Video"}>
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}

                style={{margin: "15px auto", width:"100%"}}
            >

                <Typography component="h1" variant="h5">
                    Share Video
                </Typography>
                <Box component="form" onSubmit={handleSubmit} style={{width: "inherit"}} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="link"
                        label="Youtube Link"
                        name="link"
                        autoComplete="Youtube Link"
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

export default ShareAdd
