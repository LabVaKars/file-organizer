import React from 'react'

// const Button = require('tg_common/Button')
// const SelectInput = require('tg_common/SelectInput')
import Button from 'tg_common/Button'
import SelectInput from 'tg_common/SelectInput'

import selectOptionType from 'tg_types/selectOptionType'

interface Props {
    name: string,
    icon: string,
    handleClick: () => void,
    disabled: boolean,
    options: Array<selectOptionType>,
    handleChange: () => void
}

const SelectButton = (props : Props) => {

    const {
        name,
        icon,
        handleClick,
        disabled,
        options,
        handleChange} = props

	return (
        <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
            {/* <button className="btn btn-outline-secondary" type="button">Button</button> */}
            <Button name={name} icon={icon} disabled={disabled} handleClick={handleClick}/>
        </div>
        <SelectInput options={options} handleChange={handleChange}/>
        </div>
	)
}

export default SelectButton
