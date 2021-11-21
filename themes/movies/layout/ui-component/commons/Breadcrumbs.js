import React, {useEffect, memo, useState} from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import {Link, useHistory} from 'react-router-dom'
import {menuItems} from '../../menu-items'
// import allActions from "../../../store/actions"

export const IconBreadcrumbs = memo((props) => {
    const [arr, setArr] = useState([])
    const history = useHistory()
    useEffect(()=>{
        let bol = false
        for (let parent of menuItems) {
            for (let c in parent.children) {
                if (parent.children[c].url === history.location.pathname) {
                    setArr([
                        {
                            name: parent.name,
                            url: parent.url ? parent.url : null,
                            icon: parent.icon ? parent.icon : null
                        },
                        {
                            name: parent.children[c].name
                        }
                    ])
                    bol = true
                    break
                }
            }
            if (bol) {
                break
            }
        }
    },[history])

    const len = arr.length - 1

    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    to="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Dashboard
                </Link>
                {arr.map((item,i) => {
                    if(i<len){
                        if(item.url){
                            return (
                                <Link
                                    key = {i}
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="inherit"
                                    to={item.url}
                                >
                                    {item.icon ? <item.icon sx={{ mr: 0.5 }} fontSize="inherit" /> :null}
                                    {item.name}
                                </Link>
                            );
                        }
                    }
                    return (<Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                        key = {i}
                    >
                        {item.icon ? <item.icon sx={{ mr: 0.5 }} fontSize="inherit" /> :null}
                        {item.name}
                    </Typography>)
                })}

            </Breadcrumbs>
        </div>
    );
})