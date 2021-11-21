import * as React from 'react'
import {useEffect, useState, memo} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import {BasicDateRangePicker} from "../timePicker/rangePicker"
import Button from "@mui/material/Button"
import {useDispatch, useSelector} from "react-redux"
import allActions from "../../../store/actions"
import {useHistory} from "react-router-dom"
import {getParamsAsObject} from "../../../utils/url"
import {SelectTwo} from "../select/SelectTwo"

export const SearchResponseLogs = memo(() => {
    const parsed = getParamsAsObject(window.location.search)
    const [params, setParams] = useState({
        type: "2,3",
        page: 1,
        sort: {
            timestamp: -1
        },
        ...parsed
    })
    const [search, setSearch] = useState({})
    const [options, setOptions] = useState(null)
    const [statusOptions, setStatusOptions] = useState(null)
    const [expanded, setExpanded] = useState('panel1')
    const optionsAccount = useSelector(state => state.payments.data.account)
    const optionsStatus = useSelector(state => state.payments.data.status)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        setSearch({...params})
        dispatch(allActions.payments.setResponseLogParams(params))
    }, [dispatch, params])

    useEffect(() => {
        dispatch(allActions.payments.paymentAccount({
            limit: 1000
        }))
        dispatch(allActions.payments.paymentStatus({
            limit: 100
        }))
        return () => dispatch(allActions.payments.setResponseStartLogs(false))
    }, [dispatch])

    useEffect(() => {
        let os = optionsAccount ? optionsAccount.map(item => {
            return {
                label: item.website_name ,
                value: item._id
            }
        }) : null
        setOptions(os)
    }, [optionsAccount, setOptions])

    useEffect(() => {
        let os = optionsStatus ? optionsStatus.map(item => {
            return {
                label: item.name ,
                value: item.code
            }
        }) : null
        setStatusOptions(os)
    }, [optionsStatus, setStatusOptions])

    // useEffect(() => {
    //     console.log(search)
    // }, [search])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleSearch = () => {
        //to do
        let par = {...params, ...search, page:1}
        setParams(par);
        dispatch(allActions.payments.setResponseLogParams(par, history))
    }

    const handleChangeData = (e, paramsName, cb = null) => {
        let par = {...search}
        par[`${paramsName}`] = e && typeof e === "object" ? e.target.value : e
        setSearch(par);
        if(cb && typeof cb === "function"){
            cb()
        }
    }

    const setObjectSearch = (obj) => {
        let par = {...search, ...obj}
        setSearch(par)
    }

    const handleChangeSelect2 = (value) => {
        setObjectSearch({partnerCode:value});
    };

    const handleStatusChangeSelect2 = (value) => {
        setObjectSearch({status:value});
    };

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="h2" variant="h6" color="primary">Search Payment Logs (client - gateway)</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '26ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl>
                        <TextField id="phone" onChange={(e) => handleChangeData(e, "phone")}
                               defaultValue={params.phone ?? ""} label="Điện thoại" variant="outlined"
                               size={'small'}/>
                    </FormControl>
                    <FormControl>
                        <TextField id="email" onChange={(e) => handleChangeData(e, "email")}
                               defaultValue={params.email ?? ""} label="Email" variant="outlined"
                               size={'small'}/>
                    </FormControl>
                    <FormControl>
                        <TextField id="firstname" onChange={(e) => handleChangeData(e, "firstname")}
                                   defaultValue={params.firstname ?? ""} label="Họ" variant="outlined"
                                   size={'small'}/>
                    </FormControl>
                    <FormControl>
                        <TextField id="lastname" onChange={(e) => handleChangeData(e, "lastname")}
                                   defaultValue={params.lastname ?? ""} label="Tên" variant="outlined"
                                   size={'small'}/>
                    </FormControl>

                    <FormControl>
                        <TextField id="address" onChange={(e) => handleChangeData(e, "address")}
                                   defaultValue={params.address ?? ""} label="Địa chỉ" variant="outlined"
                                   size={'small'}/>
                    </FormControl>

                    <FormControl>
                        <TextField id="order_nr" onChange={(e) => handleChangeData(e, "order_nr")}
                                   defaultValue={params.order_nr ?? ""} label="Order ID" variant="outlined"
                                   size={'small'}/>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="type-select-label" size={'small'}>Loại</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type"
                            label="Loại"
                            onChange={(e) => handleChangeData(e, "type")}
                            value={search.type ?? ""}
                            size={'small'}
                        >
                            <MenuItem value={'2,3'}>Tất cả</MenuItem>
                            <MenuItem value={'2'}>Gateway Request</MenuItem>
                            <MenuItem value={'3'}>Partner Response</MenuItem>
                        </Select>

                    </FormControl>

                    <SelectTwo selected={search.partnerCode} label={"Tài khoản website"}
                               options={options} onChange={handleChangeSelect2} />

                    <SelectTwo sx={{width:"52ch"}} isMulti={true} selected={search.status} label={"Trang thái"}
                               options={statusOptions} onChange={handleStatusChangeSelect2} />

                    <FormControl>
                        <BasicDateRangePicker onChange={setObjectSearch} data={params}/>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" onClick={() => handleSearch()}>
                            Search
                        </Button>
                    </FormControl>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
})