import * as React from 'react'
import {memo, useState} from 'react'
// import {Link} from 'react-router-dom'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import moment from "../../../../utils/datetime"
import {vnd} from "../../../../utils/currency"
import Box from "@mui/material/Box"
import ReactJson from "react-json-view"
import {RotateExpandIcon} from "../../buttons/RotateExpandIcon"

// Generate Order Data
export const PaymentRequestRowShowMore = memo((props) => {
    const {row} = {...props}
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(!show);
    }
    return (
        <>
            <TableRow>
                <TableCell>
                    <RotateExpandIcon onClick={() => handleShow()}/> {moment(row.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                    {row.order_info?.order_nr ?? ""}
                </TableCell>
                <TableCell>{row.website_name ? row.website_name : row.domain}</TableCell>
                <TableCell>{row.type === "1" ? "Request" : "Response"}</TableCell>
                <TableCell>{vnd(row.amount)}</TableCell>
                <TableCell align="right">{row.payment_type}</TableCell>
            </TableRow>
            {show ?
            <TableRow sx={{backgroundColor: "#eeeeee"}} key={`info-${row._id}`}>
                <TableCell colSpan={6}>
                    <Box sx={{overflow: "auto", width: "100%"}}>
                        <ReactJson src={row.order_info} collapsed={true}/>
                    </Box>
                </TableCell>
            </TableRow>: null}
        </>)
})