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
import Checkbox from "@mui/material/Checkbox"
// import Button from "@mui/material/Button"
// Generate Order Data
export const PaymentStatusPaging = memo(() => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [itemsSelected, setItemsSelected] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    let rows = useSelector(state => state.payments.data.status)
    let params = useSelector(state => state.payments.statusParams)
    let startParams = useSelector(state => state.payments.statusStartParams)
    let pageTotal = Math.ceil((params && params.total ? params.total : (rows ? rows.length : 0)) / rowsPerPage)
    const [selected, setSelected] = React.useState([]);
    const columns = [
        {
            name: "ID"
        }, {
            name: "Tên",
            sort: "name"
        }, {
            name: "Code",
            sort: "code"
        }
    ]

    useEffect(() => {
        if (startParams) {
            let par = {...params, loading:true}
            dispatch(allActions.payments.paymentStatus(par))
        }
    }, [params, dispatch, startParams])

    const handleChangePage = (event, newPage) => {
        let currentPage = parseInt(newPage) + 1
        // setPage(currentPage)
        if (params.page !== currentPage) {
            dispatch(allActions.payments.setStatusParams({...params, page: currentPage}, history))
        }
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        dispatch(allActions.payments.setStatusParams({...params, page: 1, item_per_page: event.target.value}, history))
    }

    const handPageLoad = (currentPage) => {
        if (params.page !== currentPage) {
            dispatch(allActions.payments.setStatusParams({...params, page: currentPage}, history))
        }
    }

    const handleSort = (sort_by) => {
        let sort_order = params.sort && params.sort[sort_by] && params.sort[sort_by]!=="-1" ? "-1" : "1"
        let par = {...params, page:1}
        par.sort = {[`${sort_by}`] : sort_order}
        dispatch(allActions.payments.setStatusParams({...par}, history))
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n._id);
            setItemsSelected(newSelecteds);
            return;
        }
        setItemsSelected([]);
    };

    const handleCheckClick = (vl) => {
        if(itemsSelected?.includes(vl)){
            let tam = itemsSelected.filter(i => i!==vl);
            setItemsSelected(tam);
        }else{
            let data = itemsSelected
            data.push(vl)
            setItemsSelected(itemsSelected);
        }

    }


    return (
        <React.Fragment>

            <Table size="small" aria-label="table">
                {columns && Array.isArray(columns) ?
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={itemsSelected?.length > 0 && itemsSelected?.length < rows?.length}
                                    checked={rows?.length > 0 && itemsSelected?.length === rows?.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell>
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
                        <TableRow key={row._id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={itemsSelected?.includes(row._id)}
                                    inputProps={{
                                        'aria-labelledby': 'item-' + row._id,
                                    }}
                                    onChange={() => handleCheckClick(row._id)}
                                />
                            </TableCell>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.code}</TableCell>
                        </TableRow>
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