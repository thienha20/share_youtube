import ReactSelectMaterialUi from "react-select-material-ui"
import * as React from "react"

export const SelectTwo = (props) => {
    let {isMulti, label, options, onChange, selected, sx} = {...props}
    let defaultValueObj = () => {
        if(isMulti) return {defaultValues:selected}
        return {defaultValue: selected}
    }
    return (
        <ReactSelectMaterialUi style={{marginTop: 0}} sx={{
            '& > label': {marginBottom: "-13px !important"}, ...sx
        }} label={label} SelectProps={{
            isClearable: true,
            isMulti: !!isMulti
        }} variant="outlined" {...defaultValueObj()} options={options} onChange={(value) => onChange(value)}/>
    )
}
