import React from 'react'
import PropTypes from 'prop-types'
import TreeItem, {treeItemClasses} from '@mui/lab/TreeItem'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {styled} from '@mui/material/styles'

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontSize: "12px",
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    }
}))

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        open,
        root,
        ...other
    } = props

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0, pl:0}}>
                    <Box component={LabelIcon} color="inherit" sx={{fontSize: root ? "18px" : "16px",mr:1}}/>
                    {open ? <><Typography variant="body2" sx={{fontWeight: root ? 700 : 'inherit', flexGrow: 1}}>
                        {labelText}
                    </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography></> : null}

                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    )
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType,
    labelInfo: PropTypes.string,
    labelText: PropTypes.object,
}

export default StyledTreeItem