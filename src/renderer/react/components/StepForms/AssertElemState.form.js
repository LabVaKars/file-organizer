import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { IS_PRESENT, IS_VISIBLE, IS_ENABLED, IS_FOCUSED, IS_SELECTED, CHANGE_STATE_SIGN, CHANGE_STATE_TYPE } from 'tg_constants/StepTypes/AssertElemState.types'
import SelectInput from 'tg_common/SelectInput'
import Select from 'tg_common/Select'
import { signOptions, elemStateOptions } from 'tg_constants/Selects'

AssertElemStateForm.propTypes = {
}


export default function AssertElemStateForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

    let value = ss.form.sign
    let type = ss.form.estype

    function handleChangeType(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_STATE_TYPE, params: {estype: e.target.value}})
	}

	function handleChangeValue(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_STATE_SIGN, params: {sign: e.target.value}})
	}

    console.log(value, " ", type);


    let selectedValueIdx = signOptions.findIndex((o) => {
        return o.value == value
    })

    let selectedTypeIdx = elemStateOptions.findIndex((o) => {
        return o.value == type
    })

	return (
        <>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Element </span>
                </div>
                <Select options={signOptions} handleChange={handleChangeValue} selectedIdx={selectedValueIdx}/>
                <Select options={elemStateOptions} handleChange={handleChangeType} selectedIdx={selectedTypeIdx}/>
                <div className="input-group-append">
                    <span className="input-group-text">&nbsp;</span>
                </div>
            </div>
        </>
	)
}

