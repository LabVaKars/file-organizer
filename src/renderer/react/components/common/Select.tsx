import React from 'react'

import selectOptionType from 'tg_types/selectOptionType'


interface Props {
	options: Array<selectOptionType>,
	handleChange?: () => void,
	selectedIdx?: number,
	disabled?: boolean
}

const Select = (props : Props) => {
	let {
		options, handleChange, selectedIdx, disabled
    } = props

    let defaultValue = (selectedIdx != null && selectedIdx > -1 && selectedIdx < options.length)
        ? options[selectedIdx].value
        : "empty"


	return (
        <>
            <select onChange={handleChange} defaultValue={defaultValue} disabled={disabled} className="custom-select" id="">
                {options.map((o, i) => {
                    return <option value={o.value} key={i}>{o.name}</option>
                })}
                <option hidden disabled value="empty">Choose...</option>
            </select>
        </>
	)
}

export default Select
