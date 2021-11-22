import React, {useEffect, useState} from "react"
import MainLayout from "../../../../src/layout/MainLayout"
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ShareIcon from "@mui/icons-material/Share"
import Avatar from "@mui/material/Avatar"
import {ValidYoutubeLink} from "../../../utils/valid"
import allActions from "../../../store/actions"
//= ===============================|| AUTH3 - LOGIN ||================================//

const ShareAdd = () => {
    const [link, setLink] = useState("")
    const [validLink, setValidLink] = useState(false)
    const isLoggingIn = useSelector(state => state.users.isLoggingIn)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggingIn) {
            history.push("/")
        }
    }, [isLoggingIn, history])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!ValidYoutubeLink(link)) {
            setValidLink(true)
            return false
        }
        dispatch(allActions.shares.shareAdd({
            share: {
                link
            },
            loading: true
        }, history))
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

                style={{margin: "15px auto", width: "100%"}}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <ShareIcon/>
                </Avatar>
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
                        error={validLink}
                        onChange={e => {
                            if (ValidYoutubeLink(e.target.value)) {
                                setValidLink(false)
                            }
                            setLink(e.target.value)
                        }}
                        helperText={validLink ? "Link youtube incorrect!" : null}
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
