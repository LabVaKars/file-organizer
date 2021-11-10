import React from 'react'
import PropTypes from 'prop-types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_VALUE, CHANGE_COOKIE } from 'tg_constants/StepTypes/CookieUpdate.types'

CookieUpdateForm.propTypes = {
}

export default function CookieUpdateForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	let cookie = ss.form.cookie
	let value = ss.form.value

	function handleChangeCookie(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_COOKIE, params: {cookie: e.target.value}})
	}

	function handleChangeValue(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_VALUE, params: {value: e.target.value}})
	}

	return (
		<>
			<TextInput name="" label="Cookie" placeholder="Cookie..."
				handleChange={handleChangeCookie} value={cookie}
			/>
			<TextInput name="" label="Value" placeholder="Value..."
				handleChange={handleChangeValue} value={value}
			/>
		</>
	)
}

