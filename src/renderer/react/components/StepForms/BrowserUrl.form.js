import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_URL } from 'tg_constants/StepTypes/BrowserUrlForm.types'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import TextInput from 'tg_common/TextInput'

BrowserUrlForm.propTypes = {
}

export default function BrowserUrlForm(props) {

	const {reducer, selectedStep} = props

	console.log(selectedStep)

	let ss = selectedStep[0]

	let url = ss.form.link

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_URL, params: {url:e.target.value}})
	}

	return (
		<TextInput name="" label="Url" placeholder="Url..."
			handleChange={handleChange} value={url}
		/>
	)
}

