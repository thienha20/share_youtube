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
import allActions from '../../../store/actions'
import {convertToDate} from "../../../utils/datetime"

// Generate Order Data
export const SmsLogsSmall = () => {

    let rows = useSelector(state => state.sms.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allActions.sms.smsLogs({
            page: 1,
            limit: 10,
            sort: {
                timestamp: -1
            }
        }));
    }, [dispatch])

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Recent SMS Logs</Typography>
            <Table size="small" aria-label="caption table">
                <caption>
                    <Link to="/sms/logs">
                        <Typography color="primary" gutterBottom>
                            Xem tất cả
                        </Typography>
                    </Link>
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Hệ thống</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Nội dung</TableCell>
                        <TableCell align="right">IP address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{convertToDate(row.timestamp)}</TableCell>
                            <TableCell>{row.system}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.content}</TableCell>
                            <TableCell align="right">{`${row.ipAddress}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}