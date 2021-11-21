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
import {useDispatch} from "react-redux"
import allActions from "../../../store/actions"
import {useHistory} from "react-router-dom"
import {getParamsAsObject} from "../../../utils/url"

export const SearchLogs = memo(() => {
    const parsed = getParamsAsObject(window.location.search)
    const [params, setParams] = useState({
        page: 1,
        sort: {
            timestamp: -1
        },
        ...parsed
    })
    const [search, setSearch] = useState({})
    const [expanded, setExpanded] = useState('panel1')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setSearch({...params})
        dispatch(allActions.sms.setLogParams(params))
    }, [dispatch, params])

    useEffect(() => {
        return () => dispatch(allActions.sms.setStartLogs(false))
    }, [dispatch])

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
        dispatch(allActions.sms.setLogParams(par, history))
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

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="h2" variant="h6" color="primary">Search SMS Logs</Typography>
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
                        <TextField id="content" onChange={(e) => handleChangeData(e, "content")}
                               defaultValue={params.content ?? ""} label="Nội dung" variant="outlined"
                               size={'small'}/>
                    </FormControl>
                    <FormControl>
                    <TextField id="ipAddress" onChange={(e) => handleChangeData(e, "ipAddress")}
                               defaultValue={params.ipAddress ?? ""} label="IP Address"
                               variant="outlined" size={'small'}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="system-select-label" size={'small'}>Hệ thống</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="system"
                            label="Hệ thống"
                            onChange={(e) => handleChangeData(e, "system")}
                            value={search.system ?? ""}
                            size={'small'}
                        >
                            <MenuItem value={''}>Tất cả</MenuItem>
                            <MenuItem value={'mrtho'}>Mrtho</MenuItem>
                            <MenuItem value={'tatmart'}>Tatmart</MenuItem>
                        </Select>
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
                            <MenuItem value={''}>Tất cả</MenuItem>
                            <MenuItem value={'register'}>register</MenuItem>
                            <MenuItem value={'reset'}>reset</MenuItem>
                            <MenuItem value={'order_processed'}>order_processed</MenuItem>
                            <MenuItem value={'otp'}>otp</MenuItem>
                            <MenuItem value={'download'}>download</MenuItem>
                            <MenuItem value={'order_cancel'}>order_cancel</MenuItem>
                        </Select>

                    </FormControl>
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