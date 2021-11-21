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

export const SearchRequestLogs = memo(() => {
    const parsed = getParamsAsObject(window.location.search)
    const [params, setParams] = useState({
        type: "1,4",
        page: 1,
        sort: {
            timestamp: -1
        },
        ...parsed
    })
    const [search, setSearch] = useState({})
    const [options, setOptions] = useState(null)
    const [expanded, setExpanded] = useState('panel1')
    const optionsAccount = useSelector(state => state.payments.data.account)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        setSearch({...params})
        dispatch(allActions.payments.setRequestLogParams(params))
    }, [dispatch, params])

    useEffect(() => {
        dispatch(allActions.payments.paymentAccount({
            limit: 1000
        }))
        return () => dispatch(allActions.payments.setRequestStartLogs(false))
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
        dispatch(allActions.payments.setRequestLogParams(par, history))
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
                            <MenuItem value={'1,4'}>Tất cả</MenuItem>
                            <MenuItem value={'1'}>Client Request</MenuItem>
                            <MenuItem value={'4'}>Gateway Response</MenuItem>
                        </Select>

                    </FormControl>

                    <SelectTwo selected={search.partnerCode} label={"Tài khoản website"}
                               options={options} onChange={handleChangeSelect2} />

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