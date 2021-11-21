import * as React from 'react'
import {useEffect, useState, memo} from 'react'
// import {Link} from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from "@mui/material/Typography"
import {useDispatch, useSelector} from "react-redux"
import allActions from '../../../store/actions'
import TablePagination from '@mui/material/TablePagination'
import {GoToPage} from "../buttons/GoToPage"
import Grid from "@mui/material/Grid"
import {useHistory} from "react-router-dom"
import TableSortLabel from '@mui/material/TableSortLabel';
import SortIcon from '@mui/icons-material/Sort';
import {PaymentRequestRowShowMore} from "./rows/PaymentRequestRowShowMore"
// Generate Order Data
export const PaymentRequestLogsPaging = memo(() => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const dispatch = useDispatch()
    const history = useHistory()
    let rows = useSelector(state => state.payments.data.request)
    let params = useSelector(state => state.payments.requestParams)
    let startParams = useSelector(state => state.payments.requestStartParams)
    let pageTotal = Math.ceil((params && params.total ? params.total : (rows ? rows.length : 0)) / rowsPerPage)
    const columns = [{
            name: "Ngày",
            sort: "createdAt"
        }, {
            name: "Order ID",
            sort: "order_id"
        }, {
            name: "Website client"
        }, {
            name: "Loại",
            sort: "type"
        }, {
            name: "Tổng tiền"
        }, {
            name: "Thanh toán",
            align: "right"
        }
    ]

    useEffect(() => {
        if (startParams) {
            let par = {...params, loading:true}
            dispatch(allActions.payments.paymentRequestLogs(par))
        }
    }, [params, dispatch, startParams])

    const handleChangePage = (event, newPage) => {
        let currentPage = parseInt(newPage) + 1
        // setPage(currentPage)
        if (params.page !== currentPage) {
            dispatch(allActions.payments.setRequestLogParams({...params, page: currentPage}, history))
        }
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        dispatch(allActions.payments.setRequestLogParams({...params, page: 1, item_per_page: event.target.value}, history))
    }

    const handPageLoad = (currentPage) => {
        if (params.page !== currentPage) {
            dispatch(allActions.payments.setRequestLogParams({...params, page: currentPage}, history))
        }
    }

    const handleSort = (sort_by) => {
        let sort_order = params.sort && params.sort[sort_by] && params.sort[sort_by]!=="-1" ? "-1" : "1"
        let par = {...params, page:1}
        par.sort = {[`${sort_by}`] : sort_order}
        dispatch(allActions.payments.setRequestLogParams({...par}, history))
    }

    return (
        <React.Fragment>
            <Table size="small" aria-label="table" sx={{tableLayout:"fixed"}}>
                {columns && Array.isArray(columns) ?
                    <TableHead>
                        <TableRow>
                            {columns.map((item, i) => (<TableCell {...item} key={`h${i}`}>{item.sort ? <TableSortLabel
                                active={!!(params.sort && params.sort[item.sort])}
                                direction={params.sort && params.sort[item.sort] && params.sort[item.sort]==="-1" ? 'asc' : 'desc'}
                                onClick={() => handleSort(item.sort)}
                            >{item.name}<SortIcon/></TableSortLabel> : item.name}</TableCell>))}
                        </TableRow>
                    </TableHead> : null
                }
                <TableBody>
                    {rows && Array.isArray(rows) && rows.length > 0 ? rows.map((row) => (
                        <PaymentRequestRowShowMore row={row} key={row._id}/>
                        )) : <TableRow>
                            <TableCell colSpan={6} align={'center'}>
                                <Typography color={'#ccc'} sx={{mt:2, mb:2}} style={{fontStyle:"italic"}}>
                                    Không có data
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        showFirstButton={true}
                        showLastButton={true}
                        count={params && params.total ? params.total : (rows ? rows.length : 0)}
                        rowsPerPage={rowsPerPage}
                        page={params.page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"Phần tử"}
                        labelDisplayedRows={() => {
                            return `Trang ${params.page} trên ${pageTotal} (${params && params.total ? params.total : (rows ? rows.length : 0)} items)`
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <GoToPage page={params.page} goSubmit={handPageLoad} maxPage={pageTotal}/>
                </Grid>
            </Grid>


        </React.Fragment>
    )
})