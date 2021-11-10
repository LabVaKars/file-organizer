import React from 'react'
import Select from './Select'

import selectOptionType from 'tg_types/selectOptionType'

interface Props {
    label?: string,
    options: Array<selectOptionType>,
    handleChange?: () => void,
    selectedIdx?: number,
    disabled?: boolean
}

const SelectInput = (props : Props) => {
	let {
        label, options, handleChange, selectedIdx, disabled
	} = props
	return (
        <>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>
                <Select options={options} handleChange={handleChange} selectedIdx={selectedIdx} disabled={disabled}/>
            </div>
        </>
	)
}

export default SelectInput
