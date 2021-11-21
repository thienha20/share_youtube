import * as React from 'react'
import {useEffect, useState, memo} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button"
import {useDispatch} from "react-redux"
import allActions from "../../../store/actions"
import {useHistory} from "react-router-dom"
import {getParamsAsObject} from "../../../utils/url"

export const SearchPaymentStatus = memo(() => {
    const parsed = getParamsAsObject(window.location.search)
    const [params, setParams] = useState({
        page: 1,
        ...parsed
    })
    const [search, setSearch] = useState({})
    const [expanded, setExpanded] = useState('panel1')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setSearch({...params})
        dispatch(allActions.payments.setStatusParams(params))
    }, [dispatch, params])

    useEffect(() => {
        return () => dispatch(allActions.payments.setStatusStart(false))
    }, [dispatch])


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleSearch = () => {
        //to do
        let par = {...params, ...search, page:1}
        setParams(par);
        dispatch(allActions.payments.setStatusParams(par, history))
    }

    const handleChangeData = (e, paramsName, cb = null) => {
        let par = {...search}
        par[`${paramsName}`] = e && typeof e === "object" ? e.target.value : e
        setSearch(par);
        if(cb && typeof cb === "function"){
            cb()
        }
    }

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="h2" variant="h6" color="primary">Search Payment Status</Typography>
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
                        <TextField id="phone" onChange={(e) => handleChangeData(e, "name")}
                               defaultValue={params.phone ?? ""} label="Tên" variant="outlined"
                               size={'small'}/>
                    </FormControl>
                    <FormControl>
                        <TextField id="content" onChange={(e) => handleChangeData(e, "code")}
                               defaultValue={params.content ?? ""} label="code" variant="outlined"
                               size={'small'}/>
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