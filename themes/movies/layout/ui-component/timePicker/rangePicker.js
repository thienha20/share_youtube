import * as React from 'react'
import {useEffect} from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import moment, {formatDate} from "../../../utils/datetime"
// import Box from '@mui/material/Box';

export const BasicDateRangePicker = (props) => {
    let {data, onChange} = {...props}
    const [value, setValue] = React.useState([null, null])

    useEffect(() => {
        let date = []
        date[0] = data["date_from"] ? moment(data["date_from"]) : null
        date[1] = data["date_to"] ? moment(data["date_to"]) : null
        setValue(date)
    }, [data])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
                startText="Từ ngày"
                endText="Đến ngày"
                value={value}
                onChange={(newValue) => {
                    onChange({
                        date_to: newValue[1] ? newValue[1].format(formatDate) : null,
                        date_from: newValue[0] ? newValue[0].format(formatDate) : null
                    })
                    setValue(newValue)
                }}
                renderInput={(startProps, endProps) => (
                    <>
                        <TextField {...startProps} id="date_from" sx={{fontSize:10}} size={'small'}/> - <TextField {...endProps} sx={{fontSize:"10px"}} size={'small'} id="date_to" />
                    </>
                )}
                inputFormat={formatDate}
                disableMaskedInput={true}
            />
        </LocalizationProvider>
    )
}
