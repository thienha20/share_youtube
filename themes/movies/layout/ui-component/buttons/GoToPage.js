import React, {useEffect, useState} from 'react'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

export const GoToPage = (props) => {
    const {page, maxPage, goSubmit} = {...props}
    const [pageGo, setPageGo] = useState(page ?? 1)
    useEffect(() => {
        setPageGo(page)
    }, [page, setPageGo])

    const handleChange = (e) => {
        let p = parseInt(e.target.value)
        if (p > maxPage) {
            p = maxPage
            e.target.value = p
        }else{
            if (p <= 0) {
                p = 1
                e.target.value = p
            }
        }

        setPageGo(p)
    }

    return (
        <div style={{marginTop: "10px"}}>
            <TextField id="go-page" onChange={e => handleChange(e)} inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                       label="Đến Trang" value={pageGo} variant="outlined" style={{width: "90px"}}
                       size={'small'}/> <Button variant="contained" onClick={() => goSubmit(pageGo)}>Go</Button>
        </div>
    )
}
