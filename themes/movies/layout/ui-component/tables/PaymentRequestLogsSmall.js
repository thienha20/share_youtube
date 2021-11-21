import * as React from 'react';
import {Link} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect} from "react"
import Typography from "@mui/material/Typography"
import {useDispatch, useSelector} from "react-redux"
import allActions from "../../../store/actions"
import moment from "../../../utils/datetime"
import {vnd} from "../../../utils/currency"
// Generate Order Data
export const PaymentRequestLogsSmall = React.memo((props) => {
    let rows = useSelector(state => state.payments.data.request);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allActions.payments.paymentRequestLogs({
            type: "1,4",
            page: 1,
            sort: {
                timestamp: -1
            }
        }));
    }, [dispatch])

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Recent Client &lt;=&gt; Gateway</Typography>
            <Table size="small">
                <caption>
                    <Link to="/payments/request-logs">
                        <Typography color="primary" gutterBottom>
                            Xem tất cả
                        </Typography>
                    </Link>
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Website client</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell align="right">Hình thức thanh toán</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{moment(row.createdAt).format("llll")}</TableCell>
                            <TableCell>{row.order_info.order_nr}</TableCell>
                            <TableCell>{row.website_name ? row.website_name: row.domain}</TableCell>
                            <TableCell>{row.type === "1" ? "Request" : "Response"}</TableCell>
                            <TableCell>{vnd(row.amount)}</TableCell>
                            <TableCell align="right">{row.payment_type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
})