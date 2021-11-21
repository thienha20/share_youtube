import * as React from 'react'
import {memo, useState} from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export const RotateExpandIcon = memo((props) => {
    const {onClick} = {...props}
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show)
        onClick()
    }
    const rotate = show ? "rotate(180deg)" : "rotate(0)"
    return (
        <ExpandMoreIcon onClick={()=>handleClick()} sx={{transform: rotate, transition: "all 0.2s linear", borderRadius:3, border:"1px solid #1976D2", color: '#1976D2', verticalAlign: "inherit"}} />
    )
})