import * as React from 'react'
import {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import dashboard from './dashboard'
import sap from './sap'
import payments from './payments'
import sms from './sms'
import users from './users'
import client from './client'

import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import StyledTreeItem from "../ui-component/commons/StyledTreeItem"
import {useDispatch, useSelector} from "react-redux"
import allActions from '../../store/actions'

// ===========================|| MENU ITEMS ||=========================== //

export const menuItems = [dashboard, sap, payments, sms, client, users]


export const MenuListItems = React.memo((props) => {
    let tree_view = useSelector(state => state.commons.tree_view)
    const [selected, setSelected] = useState(tree_view.selected ?? [])
    let dispatch = useDispatch()
    const history = useHistory()

    const color = [
        { color:"#1a73e8", bgColor:"#e8f0fe"},
        { color:"#e3742f", bgColor:"#fcefe3"},
        { color:"#a250f5", bgColor:"#f3e8fd"},
        { color:"#3c8039", bgColor:"#e6f4ea"}
    ]

    useEffect(() => {
        if (tree_view.expanded.length === 0 && tree_view.selected.length === 0) {
            let bol = false
            for (let parent of menuItems) {
                for (let c in parent.children) {
                    if (parent.children[c].url === history.location.pathname) {
                        dispatch(allActions.commons.treeView([parent.id, parent.children[c].id]))
                        setSelected([parent.children[c].id])
                        bol = true
                        break
                    }
                }
                if (bol) {
                    break
                }
            }
        }
    }, [tree_view, history, dispatch, setSelected])

    const renderTree = (nodes) => (
        <>{Array.isArray(nodes) ? nodes.map((item,i) => {
            return (
                <StyledTreeItem key={item.id} nodeId={item.id}
                                labelText={item.url ? <Link to={item.url} onClick={() => handleClick(item.id)} style={{color:'inherit'}}>{item.name}</Link> : item.name}
                                labelIcon={item.icon} open={props.open}
                                onClick={() => handleClick(item.id)}
                                {...color[i%color.length]}
                >
                    {item.children ? renderTree(item.children) : null}
                </StyledTreeItem>
            )
        }) : ''}
        </>)

    const handleClick = (id) => {
        dispatch(allActions.commons.treeView(id))
    }

    return (
        <TreeView
            id={"tree_menu"}
            aria-label="rich object"
            defaultExpanded={tree_view.expanded ?? ''}
            defaultSelected={tree_view.selected ?? []}
            selected={selected}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{height: 400, flexGrow: 1, maxWidth: 240, overflowY: 'auto', mt: "10px"}}
        >
            {
                menuItems.map(item => (
                    <StyledTreeItem
                        key={item.id}
                        nodeId={item.id}
                        labelText={item.url ? <Link to={item.url}>{item.name}</Link> : <>{item.name}</>}
                        labelIcon={item.icon}
                        open={props.open}
                        root={true}
                        onClick={() => handleClick(item.id)}
                    >
                        {renderTree(item.children)}
                    </StyledTreeItem>
                ))
            }
        </TreeView>
    )
})