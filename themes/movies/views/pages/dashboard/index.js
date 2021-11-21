import React from 'react'
import AuthorizationLayout from "../../../layout/MainLayout/Authorization"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {SmsLogsSmall} from "../../../layout/ui-component/tables/SmsLogsSmall"
import {PaymentRequestLogsSmall} from "../../../layout/ui-component/tables/PaymentRequestLogsSmall"
import {PaymentResponseLogsSmall} from "../../../layout/ui-component/tables/PaymentResponseLogsSmall"

const Dashboard = () => {
    return (
        <AuthorizationLayout>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <SmsLogsSmall />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:1}}>
                    <PaymentRequestLogsSmall />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', mt:1}}>
                    <PaymentResponseLogsSmall />
                </Paper>
            </Grid>
        </AuthorizationLayout>
    )
}

export default Dashboard
