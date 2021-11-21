import React from 'react'
import MainLayout from "../../../layout/MainLayout"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Videos from "../../../layout/ui-component/listing/Videos"

const Dashboard = () => {
    return (
        <MainLayout>
            <Grid item xs={12}>
                <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                    <Videos />
                </Paper>
            </Grid>
        </MainLayout>
    )
}

export default Dashboard
