import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_TEXT } from 'tg_constants/StepTypes/AssertPrompt.types'

AssertPromptForm.propTypes = {
}

export default function AssertPromptForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	let text = ss.form.text

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_TEXT, params: {text: e.target.value}})
	}

	return (
        <TextInput name="" label="Text" placeholder="Text to write into element"
			handleChange={handleChange} value={text}
		/>
	)
}

