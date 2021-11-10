import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'

ElementSetValueForm.propTypes = {
}

export default function ElementSetValueForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	let value = ss.form.value

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_VALUE, params: {value:e.target.value}})
	}

	return (
        <TextInput name="" label="Text" placeholder="Text to write into element"
			handleChange={handleChange} value={value}
		/>
	)
}

